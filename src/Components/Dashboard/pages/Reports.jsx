import React, { useState, useEffect } from 'react';
import { Download, Filter, TrendingUp, TrendingDown, RefreshCw, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StackedAreaChart from '../components/charts/StackedAreaChart'; // ✅ المسار الصحيح
import { cardStyle, h3Style, pMuted } from '../styles/styles';

const Reports = ({ expensesList, handleExport }) => {
  // Temporary filter states (before clicking Update)
  const [tempDateRange, setTempDateRange] = useState('Last 6 Months');
  const [tempDepartment, setTempDepartment] = useState('All Departments');
  const [tempCategory, setTempCategory] = useState('All Categories');

  // Active filter states (after clicking Update)
  const [dateRange, setDateRange] = useState('Last 6 Months');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Loading state
  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ Reset filters when component mounts or expensesList changes
  useEffect(() => {
    setTempDateRange('Last Year');
    setTempDepartment('All Departments');
    setTempCategory('All Categories');
    setDateRange('Last Year');
    setSelectedDepartment('All Departments');
    setSelectedCategory('All Categories');
  }, [expensesList.length]); // يتم التحديث عند إضافة expense جديد

  // Handle Update Report button click
  const handleUpdateReport = () => {
    setIsUpdating(true);
    
    setTimeout(() => {
      setDateRange(tempDateRange);
      setSelectedDepartment(tempDepartment);
      setSelectedCategory(tempCategory);
      setIsUpdating(false);
    }, 300);
  };

  // Parse date helper
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-").map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    return new Date(year, month - 1, day);
  };

  // Filter expenses based on active selections
  const getFilteredExpenses = () => {
    const now = new Date();
    let filtered = [...expensesList];

    // Filter by date range
    if (dateRange !== 'All Time') {
      let monthsBack = 6;
      
      if (dateRange === 'Last 30 Days') {
        // لتتوافق مع calculateMonthlyTrend (آخر شهرين)
        monthsBack = 2;
        const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);
        filtered = filtered.filter(exp => {
          const expDate = parseDate(exp.date);
          return expDate && expDate >= cutoffDate;
        });
      } else {
        // For Last 3 Months, Last 6 Months, Last Year
        if (dateRange === 'Last 3 Months') monthsBack = 3;
        else if (dateRange === 'Last 6 Months') monthsBack = 6;
        else if (dateRange === 'Last Year') monthsBack = 12;

        const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);
        filtered = filtered.filter(exp => {
          const expDate = parseDate(exp.date);
          return expDate && expDate >= cutoffDate;
        });
      }
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(exp => exp.cat === selectedCategory);
    }

    // Filter by department
    if (selectedDepartment !== 'All Departments') {
      filtered = filtered.filter(exp => exp.department === selectedDepartment);
    }

    return filtered;
  };

  // Calculate Monthly Expense Trend
  const calculateMonthlyTrend = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const filtered = getFilteredExpenses();
    
    const months = [];
    let monthCount = 6;
    
    // تحديد عدد الشهور بناءً على الـ filter
    if (dateRange === 'Last 30 Days') {
      monthCount = 2; // عرض الشهر الحالي + السابق
    } else if (dateRange === 'Last 3 Months') {
      monthCount = 3;
    } else if (dateRange === 'Last 6 Months') {
      monthCount = 6;
    } else if (dateRange === 'Last Year') {
      monthCount = 12;
    }

    // Generate all months in range (even empty ones)
    for (let i = monthCount - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        Rent: 0,
        Utilities: 0,
        'Office Supplies': 0,
        Equipment: 0,
        Travel: 0,
        Meals: 0
      });
    }

    // Add expenses to corresponding months
    filtered.forEach(exp => {
      const expDate = parseDate(exp.date);
      if (expDate) {
        const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
        
        months.forEach(monthData => {
          if (expDate.getMonth() === monthData.monthIndex && expDate.getFullYear() === monthData.year) {
            if (monthData[exp.cat] !== undefined) {
              monthData[exp.cat] += amount;
            } else {
              monthData[exp.cat] = amount;
            }
          }
        });
      }
    });

    // Return months with formatted data
    return months.map(m => ({
      month: m.month,
      Rent: Math.round(m.Rent || 0),
      Utilities: Math.round(m.Utilities || 0),
      'Office Supplies': Math.round(m['Office Supplies'] || 0),
      Equipment: Math.round(m.Equipment || 0),
      Travel: Math.round(m.Travel || 0),
      Meals: Math.round(m.Meals || 0)
    }));
  };

  // Calculate Category Comparison (This Month vs Last Month)
  const calculateCategoryComparison = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const categories = ['Rent', 'Utilities', 'Office Supplies', 'Equipment', 'Travel', 'Meals'];
    const comparison = [];

    categories.forEach(cat => {
      // Skip if category filter is active and doesn't match
      if (selectedCategory !== 'All Categories' && cat !== selectedCategory) {
        return;
      }

      let currentTotal = 0;
      let previousTotal = 0;

      const filtered = getFilteredExpenses();
      
      filtered.forEach(exp => {
        const expDate = parseDate(exp.date);
        if (expDate && exp.cat === cat) {
          const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
          const expMonth = expDate.getMonth();
          const expYear = expDate.getFullYear();
          
          if (expMonth === currentMonth && expYear === currentYear) {
            currentTotal += amount;
          }
          
          if (expMonth === previousMonth && expYear === previousYear) {
            previousTotal += amount;
          }
        }
      });

      let change = 0;
      if (previousTotal > 0) {
        change = ((currentTotal - previousTotal) / previousTotal) * 100;
      } else if (currentTotal > 0) {
        change = 100;
      }

      if (currentTotal > 0 || previousTotal > 0) {
        comparison.push({
          category: cat,
          current: Math.round(currentTotal),
          previous: Math.round(previousTotal),
          change: parseFloat(change.toFixed(1))
        });
      }
    });

    return comparison;
  };

  // Calculate Expense Distribution (Based on filtered period)
  const calculateExpenseDistribution = () => {
    const filtered = getFilteredExpenses();
    const categoryTotals = {};

    filtered.forEach(exp => {
      const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
      if (!categoryTotals[exp.cat]) {
        categoryTotals[exp.cat] = 0;
      }
      categoryTotals[exp.cat] += amount;
    });

    const colors = {
      'Rent': '#6366f1',
      'Utilities': '#10b981',
      'Office Supplies': '#f59e0b',
      'Equipment': '#8b5cf6',
      'Travel': '#ef4444',
      'Meals': '#636363'
    };

    return Object.entries(categoryTotals)
      .filter(([name, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value: Math.round(value),
        color: colors[name] || '#6b7280'
      }));
  };

  // Calculate Expense Alerts
  const calculateExpenseAlerts = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const alerts = [];
    const alertsMap = new Set(); // لتجنب التكرار
    
    // Budget thresholds
    const budgets = {
      'Utilities': 4500,
      'Equipment': 3100,
      'Travel': 1500,
      'Meals': 2000,
      'Office Supplies': 3000,
      'Rent': 15000
    };

    const currentSpending = {};
    const lastMonthSpending = {};

    // استخدم الـ expenses كلها (بدون filters) لحساب الـ alerts
    expensesList.forEach(exp => {
      const expDate = parseDate(exp.date);
      if (expDate) {
        const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
        
        if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
          if (!currentSpending[exp.cat]) currentSpending[exp.cat] = 0;
          currentSpending[exp.cat] += amount;
        }
        
        if (expDate.getMonth() === lastMonth && expDate.getFullYear() === lastMonthYear) {
          if (!lastMonthSpending[exp.cat]) lastMonthSpending[exp.cat] = 0;
          lastMonthSpending[exp.cat] += amount;
        }
      }
    });

    // Budget Alerts (Critical & Warning)
    Object.entries(budgets).forEach(([category, budget]) => {
      const spent = currentSpending[category] || 0;
      const percentage = (spent / budget) * 100;

      const alertKey = `budget-${category}`;
      
      if (percentage >= 100 && !alertsMap.has(alertKey)) {
        alertsMap.add(alertKey);
        alerts.push({
          type: 'critical',
          category: category,
          message: `${category} expenses exceeded budget by $${Math.round(spent - budget).toLocaleString()} (${percentage.toFixed(0)}% of budget)`,
          badge: 'Budget Exceeded',
          priority: 1
        });
      } else if (percentage >= 85 && percentage < 100 && !alertsMap.has(alertKey)) {
        alertsMap.add(alertKey);
        alerts.push({
          type: 'warning',
          category: category,
          message: `${category} expenses are ${percentage.toFixed(0)}% of monthly budget ($${spent.toLocaleString()} of $${budget.toLocaleString()})`,
          badge: 'Nearing Limit',
          priority: 2
        });
      }
    });

    // Trend Alerts (Significant Increase)
    Object.entries(currentSpending).forEach(([category, current]) => {
      const last = lastMonthSpending[category] || 0;
      const alertKey = `trend-${category}`;
      
      if (last > 0) {
        const increase = ((current - last) / last) * 100;
        if (increase >= 40 && !alertsMap.has(alertKey)) {
          alertsMap.add(alertKey);
          alerts.push({
            type: 'info',
            category: category,
            message: `${category} expenses increased by ${increase.toFixed(0)}% this month ($${last.toLocaleString()} → $${current.toLocaleString()})`,
            badge: 'High Trend',
            priority: 3
          });
        }
      } else if (current > 1000 && !alertsMap.has(alertKey)) {
        alertsMap.add(alertKey);
        alerts.push({
          type: 'info',
          category: category,
          message: `New ${category} expenses detected: $${current.toLocaleString()} this month`,
            badge: 'New Expense',
            priority: 3
        });
      }
    });

    // Sort alerts by priority
    return alerts.sort((a, b) => a.priority - b.priority);
  };

  // Calculate Expense Summary - Detailed breakdown by category
  const calculateExpenseSummary = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const categories = ['Rent', 'Utilities', 'Office Supplies', 'Equipment', 'Travel', 'Meals'];
    const summary = [];

    categories.forEach(cat => {
      // Skip if category filter is active and doesn't match
      if (selectedCategory !== 'All Categories' && cat !== selectedCategory) {
        return;
      }

      let thisMonth = 0;
      let lastMonthTotal = 0;

      expensesList.forEach(exp => {
        const expDate = parseDate(exp.date);
        if (expDate && exp.cat === cat) {
          // طبق filter Department فقط
          if (selectedDepartment !== 'All Departments' && exp.department !== selectedDepartment) {
            return;
          }

          const amount = typeof exp.amount === 'number' ? exp.amount : parseFloat(exp.amount) || 0;
          const expMonth = expDate.getMonth();
          const expYear = expDate.getFullYear();
          
          if (expMonth === currentMonth && expYear === currentYear) {
            thisMonth += amount;
          }
          
          if (expMonth === lastMonth && expYear === lastMonthYear) {
            lastMonthTotal += amount;
          }
        }
      });

      let change = 0;
      let changePercent = 0;
      if (lastMonthTotal > 0) {
        change = thisMonth - lastMonthTotal;
        changePercent = (change / lastMonthTotal) * 100;
      } else if (thisMonth > 0) {
        change = thisMonth;
        changePercent = 100;
      }

      if (thisMonth > 0 || lastMonthTotal > 0) {
        summary.push({
          category: cat,
          thisMonth: Math.round(thisMonth),
          lastMonth: Math.round(lastMonthTotal),
          change: Math.round(change),
          changePercent: parseFloat(changePercent.toFixed(1))
        });
      }
    });

    // Calculate percentage of total
    const totalThisMonth = summary.reduce((sum, item) => sum + item.thisMonth, 0);
    summary.forEach(item => {
      item.percentOfTotal = totalThisMonth > 0 ? parseFloat(((item.thisMonth / totalThisMonth) * 100).toFixed(1)) : 0;
    });

    return summary;
  };

  const monthlyTrend = calculateMonthlyTrend();
  const categoryComparison = calculateCategoryComparison();
  const expenseDistribution = calculateExpenseDistribution();
  const expenseAlerts = calculateExpenseAlerts();
  const expenseSummary = calculateExpenseSummary();
  const filteredCount = getFilteredExpenses().length;

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#000", marginBottom: "8px" }}>
          Reports & Analytics
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px" }}>
          Comprehensive expense analysis and insights
          {filteredCount < expensesList.length && (
            <span style={{ 
              marginLeft: "12px", 
              padding: "4px 12px", 
              background: "#f3f4f6", 
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151"
            }}>
              Showing {filteredCount} of {expensesList.length} expenses
            </span>
          )}
        </p>
      </div>

      {/* Filters Card */}
      <div style={{ ...cardStyle, marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          <Filter size={18} style={{ marginRight: "8px", color: "#6b7280" }} />
          <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#1f2937" }}>
            Filters
          </h4>
        </div>
        <p style={{ color: "#6b7280", marginTop: "0", marginBottom: "20px", fontSize: "14px" }}>
          Customize your report view
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: "16px",
          alignItems: "end"
        }}>
          <div>
            <label style={{
              fontSize: "14px",
              color: "#374151",
              fontWeight: "500",
              marginBottom: "8px",
              display: "block"
            }}>
              Date Range
            </label>
            <select 
              value={tempDateRange}
              onChange={(e) => setTempDateRange(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                background: "#fff",
                cursor: "pointer",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6366f1"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            >
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          <div>
            <label style={{
              fontSize: "14px",
              color: "#374151",
              fontWeight: "500",
              marginBottom: "8px",
              display: "block"
            }}>
              Department
            </label>
            <select 
              value={tempDepartment}
              onChange={(e) => setTempDepartment(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                background: "#fff",
                cursor: "pointer",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6366f1"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            >
              <option>All Departments</option>
              <option>Human Resources</option>
              <option>IT Department</option>
              <option>Finance</option>
              <option>Operations</option>
            </select>
          </div>

          <div>
            <label style={{
              fontSize: "14px",
              color: "#374151",
              fontWeight: "500",
              marginBottom: "8px",
              display: "block"
            }}>
              Category
            </label>
            <select 
              value={tempCategory}
              onChange={(e) => setTempCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                background: "#fff",
                cursor: "pointer",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#6366f1"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            >
              <option>All Categories</option>
              <option>Rent</option>
              <option>Utilities</option>
              <option>Office Supplies</option>
              <option>Equipment</option>
              <option>Travel</option>
              <option>Meals</option>
            </select>
          </div>

          <button 
            onClick={handleUpdateReport}
            disabled={isUpdating}
            style={{
              background: isUpdating ? "#9ca3af" : "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              cursor: isUpdating ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s",
              boxShadow: "0 4px 6px rgba(99, 102, 241, 0.2)"
            }}
            onMouseEnter={(e) => {
              if (!isUpdating) {
                e.target.style.background = "#4f46e5";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 12px rgba(99, 102, 241, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isUpdating) {
                e.target.style.background = "#6366f1";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(99, 102, 241, 0.2)";
              }
            }}
          >
            <RefreshCw size={16} style={{ 
              animation: isUpdating ? "spin 1s linear infinite" : "none"
            }} />
            {isUpdating ? "Updating..." : "Update Report"}
          </button>
        </div>
      </div>

      {/* Active Filters Badge */}
      {(dateRange !== 'Last 6 Months' || selectedCategory !== 'All Categories' || selectedDepartment !== 'All Departments') && (
        <div style={{ 
          marginBottom: "24px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center"
        }}>
          <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>
            Active Filters:
          </span>
          {dateRange !== 'Last 6 Months' && (
            <span style={{
              padding: "6px 14px",
              background: "#ede9fe",
              color: "#6366f1",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: "600"
            }}>
              📅 {dateRange}
            </span>
          )}
          {selectedCategory !== 'All Categories' && (
            <span style={{
              padding: "6px 14px",
              background: "#dbeafe",
              color: "#3b82f6",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: "600"
            }}>
              🏷️ {selectedCategory}
            </span>
          )}
          {selectedDepartment !== 'All Departments' && (
            <span style={{
              padding: "6px 14px",
              background: "#dcfce7",
              color: "#10b981",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: "600"
            }}>
              🏢 {selectedDepartment}
            </span>
          )}
        </div>
      )}

      {/* Monthly Expense Trend */}
      <div style={{ ...cardStyle, marginBottom: "24px" }}>
        <h3 style={h3Style}>Monthly Expense Trend</h3>
        <p style={pMuted}>Expense breakdown by category over time</p>
        <div style={{ height: "400px", marginTop: "20px" }}>
          {monthlyTrend.length > 0 && monthlyTrend.some(m => 
            m.Rent > 0 || m.Utilities > 0 || m['Office Supplies'] > 0 || 
            m.Equipment > 0 || m.Travel > 0 || m.Meals > 0
          ) ? (
            <StackedAreaChart data={monthlyTrend} height={400} />
          ) : (
            <div style={{ 
              height: "100%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "#9ca3af",
              fontSize: "14px",
              flexDirection: "column",
              gap: "12px"
            }}>
              <Download size={48} color="#d1d5db" />
              <p style={{ margin: 0 }}>No expense data available for the selected period</p>
            </div>
          )}
        </div>
      </div>

      {/* Category Comparison & Distribution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* Category Comparison */}
        <div style={cardStyle}>
          <h3 style={h3Style}>Category Comparison</h3>
          <p style={pMuted}>This month vs last month</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
            {categoryComparison.length > 0 ? (
              categoryComparison.map((item, index) => (
                <div key={index} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: index < categoryComparison.length - 1 ? "1px solid #f1f5f9" : "none"
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937", marginBottom: "4px" }}>
                      {item.category}
                    </div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>
                      ${item.current.toLocaleString()} <span style={{ color: "#9ca3af" }}>(was ${item.previous.toLocaleString()})</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {item.change !== 0 && (
                      <span style={{ color: item.change > 0 ? "#ef4444" : "#10b981" }}>
                        {item.change > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                      </span>
                    )}
                    <span style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: item.change === 0 ? "#6b7280" : item.change > 0 ? "#ef4444" : "#10b981",
                      minWidth: "60px",
                      textAlign: "right"
                    }}>
                      {item.change === 0 ? "0%" : item.change > 0 ? `↑${item.change}%` : `↓${Math.abs(item.change)}%`}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: "14px" }}>
                <TrendingUp size={40} color="#d1d5db" style={{ marginBottom: "12px" }} />
                <p style={{ margin: 0 }}>No comparison data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Expense Distribution */}
        <div style={cardStyle}>
          <h3 style={h3Style}>Expense Distribution</h3>
          <p style={pMuted}>Selected period breakdown</p>
          {expenseDistribution.length > 0 ? (
            <>
              <div style={{ height: "280px", marginTop: "20px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                    >
                      {expenseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "16px" }}>
                {expenseDistribution.map((item, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      borderRadius: "3px", 
                      background: item.color,
                      flexShrink: 0
                    }} />
                    <span style={{ fontSize: "13px", color: "#374151" }}>
                      {item.name}: <strong>${item.value.toLocaleString()}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af", fontSize: "14px" }}>
              <Download size={40} color="#d1d5db" style={{ marginBottom: "12px" }} />
              <p style={{ margin: 0 }}>No expense data for selected period</p>
            </div>
          )}
        </div>
      </div>

      {/* Expense Alerts */}
      <div style={{ ...cardStyle, marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <AlertTriangle size={20} style={{ marginRight: "8px", color: "#f59e0b" }} />
          <h3 style={{ ...h3Style, margin: 0 }}>Expense Alerts</h3>
        </div>
        <p style={pMuted}>Notable changes and trends in your expenses</p>
        
        {expenseAlerts.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
            {expenseAlerts.map((alert, index) => (
              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "10px",
                border: `1px solid ${
                  alert.type === 'critical' ? '#fee2e2' : 
                  alert.type === 'warning' ? '#fef3c7' : 
                  '#dbeafe'
                }`,
                background: alert.type === 'critical' ? '#fef2f2' : 
                           alert.type === 'warning' ? '#fffbeb' : 
                           '#eff6ff'
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: alert.type === 'critical' ? '#ef4444' : 
                               alert.type === 'warning' ? '#f59e0b' : 
                               '#3b82f6',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: "600", 
                      color: "#1f2937",
                      marginBottom: "2px"
                    }}>
                      {alert.category}
                    </div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>
                      {alert.message}
                    </div>
                  </div>
                </div>
                <span style={{
                  padding: "6px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "700",
                  background: alert.type === 'critical' ? '#ef4444' : 
                             alert.type === 'warning' ? '#000' : 
                             '#3b82f6',
                  color: "#fff",
                  whiteSpace: "nowrap"
                }}>
                  {alert.badge}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px", 
            color: "#10b981",
            fontSize: "14px",
            background: "#f0fdf4",
            borderRadius: "10px",
            marginTop: "20px"
          }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>✓</div>
            <p style={{ margin: 0, fontWeight: "600" }}>All expenses are within normal ranges</p>
          </div>
        )}
      </div>

      {/* Expense Summary */}
      <div style={cardStyle}>
        <h3 style={h3Style}>Expense Summary</h3>
        <p style={pMuted}>Detailed breakdown by category</p>
        
        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            minWidth: "700px"
          }}>
            <thead>
              <tr style={{ 
                borderBottom: "2px solid #e5e7eb",
                background: "#f9fafb"
              }}>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "left", 
                  fontSize: "12px", 
                  fontWeight: "700", 
                  color: "#6b7280", 
                  textTransform: "uppercase"
                }}>
                  Category
                </th>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "right", 
                  fontSize: "12px", 
                  fontWeight: "700", 
                  color: "#6b7280", 
                  textTransform: "uppercase"
                }}>
                  This Month
                </th>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "right", 
                  fontSize: "12px", 
                  fontWeight: "700", 
                  color: "#6b7280", 
                  textTransform: "uppercase"
                }}>
                  Last Month
                </th>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "right", 
                  fontSize: "12px", 
                  fontWeight: "700", 
                  color: "#6b7280", 
                  textTransform: "uppercase"
                }}>
                  Change
                </th>
                <th style={{ 
                  padding: "12px 16px", 
                  textAlign: "right", 
                  fontSize: "12px", 
                  fontWeight: "700", 
                  color: "#6b7280", 
                  textTransform: "uppercase"
                }}>
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody>
              {expenseSummary.length > 0 ? (
                expenseSummary.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ 
                      padding: "14px 16px", 
                      fontSize: "14px", 
                      fontWeight: "600",
                      color: "#1f2937"
                    }}>
                      {item.category}
                    </td>
                    <td style={{ 
                      padding: "14px 16px", 
                      fontSize: "14px", 
                      fontWeight: "600",
                      color: "#1f2937",
                      textAlign: "right"
                    }}>
                      ${item.thisMonth.toLocaleString()}
                    </td>
                    <td style={{ 
                      padding: "14px 16px", 
                      fontSize: "14px",
                      color: "#6b7280",
                      textAlign: "right"
                    }}>
                      ${item.lastMonth.toLocaleString()}
                    </td>
                    <td style={{ 
                      padding: "14px 16px", 
                      fontSize: "14px",
                      fontWeight: "600",
                      color: item.changePercent === 0 ? "#6b7280" : item.changePercent > 0 ? "#ef4444" : "#10b981",
                      textAlign: "right"
                    }}>
                      {item.changePercent === 0 ? (
                        <span>0%</span>
                      ) : item.changePercent > 0 ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                          <TrendingUp size={14} />
                          +{item.changePercent}%
                        </span>
                      ) : (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                          <TrendingDown size={14} />
                          {item.changePercent}%
                        </span>
                      )}
                    </td>
                    <td style={{ 
                      padding: "14px 16px", 
                      fontSize: "14px",
                      color: "#6b7280",
                      textAlign: "right"
                    }}>
                      {item.percentOfTotal.toFixed(1)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan="5" 
                    style={{ 
                      padding: "40px 20px", 
                      textAlign: "center",
                      color: "#9ca3af",
                      fontSize: "14px"
                    }}
                  >
                    No expense data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {expenseSummary.length > 0 && (
          <div style={{
            marginTop: "20px",
            padding: "16px",
            background: "#f9fafb",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "600" }}>
              Total This Month
            </span>
            <span style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937" }}>
              ${expenseSummary.reduce((sum, item) => sum + item.thisMonth, 0).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Add CSS animation for spinning icon */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Reports;