import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, ChartColumn, FileText } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { cardStyle, h3Style, pMuted } from '../styles/styles';
import { formatCardNumber } from '../../../utils/formatters'; // ✅ استيراد

const DataOverview = ({ expensesList }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  // Calculate statistics from expensesList
  const calculateStats = () => {
    const totalExpenses = expensesList.reduce((sum, exp) => {
      const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
      return sum + amount;
    }, 0);

    const totalTransactions = expensesList.length;
    const avgTransaction = totalTransactions > 0 ? totalExpenses / totalTransactions : 0;
    const approvedCount = expensesList.filter(exp => exp.status === 'approved').length;

    return {
      totalExpenses,
      totalTransactions,
      avgTransaction,
      activeUsers: approvedCount
    };
  };

  const stats = calculateStats();

  // Calculate monthly trend data
  const calculateMonthlyTrend = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyData = [];
    
    for (let i = 5; i >= 0; i--) {
      const targetMonth = (currentMonth - i + 12) % 12;
      const targetYear = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      
      const monthExpenses = expensesList.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === targetMonth && expDate.getFullYear() === targetYear;
      });

      const total = monthExpenses.reduce((sum, exp) => {
        const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
        return sum + amount;
      }, 0);

      monthlyData.push({
        month: monthNames[targetMonth],
        amount: Math.round(total)
      });
    }

    return monthlyData;
  };

  // Calculate transaction volume
  const calculateTransactionVolume = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const volumeData = [];

    for (let i = 5; i >= 0; i--) {
      const targetMonth = (currentMonth - i + 12) % 12;
      const targetYear = currentMonth - i < 0 ? currentYear - 1 : currentYear;

      const count = expensesList.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === targetMonth && expDate.getFullYear() === targetYear;
      }).length;

      volumeData.push({
        month: monthNames[targetMonth],
        count: count
      });
    }

    return volumeData;
  };

  // ✅ Calculate Category Breakdown (للـ PieChart)
  const calculateCategoryData = () => {
    const categoryColors = {
      "Travel": "#6366f1",
      "Meals": "#10b981",
      "Office Supplies": "#f59e0b",
      "Equipment": "#8b5cf6",
      "Training": "#ef4444"
    };

    const categoryTotals = {};

    expensesList.forEach(exp => {
      let category = exp.cat || "Other";
      
      // ✅ تحويل Transportation إلى Travel
      if (category === "Transportation") {
        category = "Travel";
      }
      
      const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
      
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += amount;
    });

    const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

    // ✅ ترتيب الفئات بالترتيب المطلوب
    const orderedCategories = ["Travel", "Meals", "Office Supplies", "Equipment", "Training"];
    
    return orderedCategories
      .map(name => {
        const value = categoryTotals[name] || 0;
        return {
          name,
          value: Math.round(value),
          color: categoryColors[name] || "#6b7280",
          percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0
        };
      })
      .filter(item => item.value > 0); // ✅ فقط الفئات التي لها قيمة
  };

  // Calculate approval rate
  const calculateApprovalRate = () => {
    if (expensesList.length === 0) return 0;
    const approvedCount = expensesList.filter(exp => exp.status === 'approved').length;
    return ((approvedCount / expensesList.length) * 100).toFixed(1);
  };

  // Calculate flagged expenses
  const calculateFlaggedRate = () => {
    if (expensesList.length === 0) return 0;
    const flaggedCount = expensesList.filter(exp => exp.status === 'rejected' || exp.status === 'pending').length;
    return ((flaggedCount / expensesList.length) * 100).toFixed(1);
  };

  const monthlyTrend = calculateMonthlyTrend();
  const transactionVolume = calculateTransactionVolume();
  const categoryData = calculateCategoryData();
  const approvalRate = calculateApprovalRate();
  const flaggedRate = calculateFlaggedRate();

  // Calculate change from last month
  const calculateChange = () => {
    if (monthlyTrend.length < 2) return 0;
    const current = monthlyTrend[monthlyTrend.length - 1].amount;
    const previous = monthlyTrend[monthlyTrend.length - 2].amount;
    if (previous === 0) return current > 0 ? 100 : 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const change = calculateChange();

  // Custom tooltip for area chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}>
          <p style={{ margin: 0, fontWeight: "600", color: "#1f2937", marginBottom: "6px", fontSize: "13px" }}>
            {payload[0].payload.month}
          </p>
          <p style={{ margin: 0, color: "#667eea", fontWeight: "700", fontSize: "16px" }}>
            Expenses: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
  const BarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <p style={{ margin: 0, fontWeight: "600", color: "#1f2937", marginBottom: "4px", fontSize: "13px" }}>
            {payload[0].payload.month}
          </p>
          <p style={{ margin: 0, color: "#10b981", fontWeight: "700", fontSize: "15px" }}>
            Transactions: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#000", marginBottom: "8px" }}>
            Data Overview
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Comprehensive expense analytics and insights
          </p>
        </div>
        
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
            <div>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Expenses</p>
              <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                {formatCardNumber(stats.totalExpenses)} {/* ✅ */}
              </h3>
              <p style={{ 
                fontSize: "12px", 
                color: parseFloat(change) >= 0 ? "#10b981" : "#ef4444", 
                marginTop: "8px", 
                display: "flex", 
                alignItems: "center", 
                gap: "4px" 
              }}>
                <TrendingUp size={14} />
                {parseFloat(change) >= 0 ? '+' : ''}{change}% from last month
              </p>
            </div>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <DollarSign size={24} color="#3b82f6" />
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
            <div>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Transactions</p>
              <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                {stats.totalTransactions.toLocaleString()}
              </h3>
              <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>This month</p>
            </div>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#d1fae5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FileText size={24} color="#10b981" />
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
            <div>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Avg Transaction</p>
              <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                ${stats.avgTransaction.toFixed(0)}
              </h3>
              <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>Per expense</p>
            </div>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#fef3c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <ChartColumn size={24} color="#f59e0b" />
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
            <div>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Active Users</p>
              <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                {stats.activeUsers}
              </h3>
              <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>Submitted expenses</p>
            </div>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#ede9fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Users size={24} color="#8b5cf6" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "24px",
        borderBottom: "2px solid #f1f5f9",
        paddingBottom: "0"
      }}>
        {["Overview", "Trends", "Categories"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 24px",
              border: "none",
              background: activeTab === tab ? "#fff" : "transparent",
              color: activeTab === tab ? "#1f2937" : "#6b7280",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              borderBottom: activeTab === tab ? "2px solid #667eea" : "2px solid transparent",
              marginBottom: "-2px",
              transition: "all 0.2s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Charts - Overview Tab */}
      {activeTab === 'Overview' && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            {/* Area Chart */}
            <div style={cardStyle}>
              <h3 style={h3Style}>Monthly Expense Trend</h3>
              <p style={pMuted}>Expense patterns over the last 6 months</p>
              <div style={{ height: "300px", marginTop: "20px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#667eea" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9ca3af" 
                      style={{ fontSize: "13px" }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      style={{ fontSize: "13px" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#667eea"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorAmount)"
                      dot={{ fill: "#667eea", r: 5, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 7, strokeWidth: 2, stroke: "#fff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div style={cardStyle}>
              <h3 style={h3Style}>Transaction Volume</h3>
              <p style={pMuted}>Number of transactions per month</p>
              <div style={{ height: "300px", marginTop: "20px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionVolume}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280" 
                      style={{ fontSize: "12px" }}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      style={{ fontSize: "12px" }}
                      tickLine={false}
                    />
                    <Tooltip content={<BarTooltip />} />
                    <Bar 
                      dataKey="count" 
                      fill="#10b981" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Summary */}
          <div style={cardStyle}>
            <h3 style={h3Style}>Data Summary</h3>
            <p style={pMuted}>Key insights from your expense data</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "24px" }}>
              <div style={{
                padding: "24px",
                borderRadius: "12px",
                background: "#eff6ff",
                textAlign: "center"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Avg Processing Time</div>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>2.3 days</div>
              </div>

              <div style={{
                padding: "24px",
                borderRadius: "12px",
                background: "#f0fdf4",
                textAlign: "center"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#d1fae5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Approval Rate</div>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>{approvalRate}%</div>
              </div>

              <div style={{
                padding: "24px",
                borderRadius: "12px",
                background: "#fffbeb",
                textAlign: "center"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#fef3c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Flagged Expenses</div>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>{flaggedRate}%</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Trends Tab */}
      {activeTab === 'Trends' && (
        <div style={cardStyle}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937", marginBottom: "8px" }}>
            Expense Trends Analysis
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
            Detailed trend analysis with growth indicators
          </p>
          <div style={{ height: "450px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="colorAmount2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  style={{ fontSize: "13px" }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: "13px" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#667eea"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorAmount2)"
                  dot={{ fill: "#667eea", r: 6, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8, strokeWidth: 3, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ✅ Categories Tab - PieChart + Details */}
      {activeTab === 'Categories' && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* PieChart */}
          <div style={cardStyle}>
            <h3 style={h3Style}>Expense by Category</h3>
            <p style={pMuted}>Distribution of expenses across categories</p>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Details */}
          <div style={cardStyle}>
            <h3 style={h3Style}>Category Details</h3>
            <p style={pMuted}>Breakdown by expense category</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
              {categoryData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #f1f5f9",
                    background: "#fff"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: item.color
                      }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                      {item.name}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#1f2937" }}>
                      ${item.value.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
              {categoryData.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
                  No category data available
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      
      
    </div>
  );
};

export default DataOverview;