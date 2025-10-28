import React from 'react';
import { Upload, Camera, DollarSign, Clock, CheckCircle, Receipt, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import BudgetBar from '../components/BudgetBar';
import { cardStyle, h3Style, pMuted, buttonPrimary, buttonSecondary } from '../styles/styles';
import { formatCardNumber, formatCurrency } from '../../../utils/formatters';
import '../../../styles/responsive.css';

const MyExpenses = ({ 
  expensesList, 
  setActiveItem,
  handleApproveExpense,
  handleRejectExpense 
}) => {
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-").map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    return new Date(year, month - 1, day);
  };

  const calculateStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let thisMonthTotal = 0;
    let pendingCount = 0;
    let approvedCount = 0;

    expensesList.forEach((exp) => {
      const expDate = parseDate(exp.date);
      
      if (exp.status === "pending") pendingCount++;
      if (exp.status === "approved") approvedCount++;
      
      if (expDate) {
        const expMonth = expDate.getMonth();
        const expYear = expDate.getFullYear();
        
        if (expMonth === currentMonth && expYear === currentYear) {
          const amount = typeof exp.amount === "number" ? exp.amount : parseFloat(exp.amount) || 0;
          if (amount > 0) {
            thisMonthTotal += amount;
          }
        }
      }
    });

    const budgetLimit = 2000;
    const budgetUsage = budgetLimit > 0 ? Math.min(100, Math.round((thisMonthTotal / budgetLimit) * 100)) : 0;

    return {
      thisMonth: thisMonthTotal,
      pending: pendingCount,
      approved: approvedCount,
      budgetUsage: budgetUsage
    };
  };

  const calculateBudgetStats = () => {
    const categories = {
      "Rent": { used: 0, total: 15000 },
      "Utilities": { used: 0, total: 4500 },
      "Office Supplies": { used: 0, total: 3000 },
      "Equipment": { used: 0, total: 3100 },
      "Travel": { used: 0, total: 1500 },
      "Meals": { used: 0, total: 2000 }
    };

    // ✅ حذف فلتر الشهر - يجمع كل المصاريف من كل الأشهر
    expensesList.forEach((exp) => {
      const amount = typeof exp.amount === "number" ? exp.amount : parseFloat(exp.amount) || 0;
      
      if (amount > 0 && categories[exp.cat]) {
        categories[exp.cat].used += amount;
      }
    });

    console.log("Budget Stats (All Time):", categories);
    
    return categories;
  };

  const calculateExpenseTrend = () => {
    const now = new Date();
    const months = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        amount: 0
      });
    }
    
    expensesList.forEach((exp) => {
      const expDate = parseDate(exp.date);
      if (expDate) {
        const amount = typeof exp.amount === "number" ? exp.amount : parseFloat(exp.amount) || 0;
        
        if (amount > 0) {
          months.forEach((monthData) => {
            if (
              expDate.getMonth() === monthData.monthIndex &&
              expDate.getFullYear() === monthData.year
            ) {
              monthData.amount += amount;
            }
          });
        }
      }
    });
    
    return months.map(m => ({ month: m.month, amount: Math.round(m.amount) }));
  };

  const stats = calculateStats();
  const budgetStats = calculateBudgetStats();
  const expenseTrendData = calculateExpenseTrend();
  const maxAmount = Math.max(...expenseTrendData.map(d => d.amount), 1600);
  const yAxisTicks = [0, Math.round(maxAmount * 0.25), Math.round(maxAmount * 0.5), Math.round(maxAmount * 0.75), maxAmount];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#000", marginBottom: "8px" }}>
            My Expenses
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Track and submit your personal expenses
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={buttonPrimary} onClick={() => setActiveItem("Upload")}>
            <Upload size={16} />
            Upload Receipt
          </button>
          <button style={buttonSecondary} onClick={() => setActiveItem("Camera")}>
            <Camera size={16} />
            Quick Capture
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" }}>
        <StatCard label="This Month" value={formatCardNumber(stats.thisMonth)} Icon={DollarSign} iconColor="#3b82f6">
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingUp color="green" size={15} />
            <p style={{ color: "green", margin: 0 }}>
              {formatCardNumber(Math.max(0, 2000 - stats.thisMonth))} remaining
            </p>
          </span>
        </StatCard>
        <StatCard label="Pending Review" value={`${stats.pending}`} Icon={Clock} iconColor="#f59e0b">
          <p style={{ margin: 0 }}>Awaiting approval</p>
        </StatCard>
        <StatCard label="Approved" value={`${stats.approved}`} Icon={CheckCircle} iconColor="#10b981">
          <p style={{ margin: 0 }}>This month</p>
        </StatCard>
        <StatCard label="Budget Usage" value={`${stats.budgetUsage}%`} Icon={Receipt} iconColor="#8b5cf6">
          <p style={{ margin: 0 }}>Of monthly limit</p>
        </StatCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "32px" }}>
        <div style={cardStyle}>
          <h3 style={h3Style}>Expense Trend</h3>
          <p style={pMuted}>Your spending pattern over the last 6 months</p>
          <div style={{ height: "250px", marginTop: "16px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expenseTrendData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5c5eff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5c5eff" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} />
                <YAxis ticks={yAxisTicks} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px' }} labelStyle={{ fontWeight: '600', marginBottom: '4px' }} />
                <Area type="monotone" dataKey="amount" stroke="#5c5eff" strokeWidth={2} fill="url(#colorAmount)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {expensesList.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#9ca3af', fontSize: '14px' }}>
              No expense data yet. Start adding expenses to see your trend!
            </div>
          )}
        </div>
        
        <div style={cardStyle}>
          <h3 style={h3Style}>Budget Status</h3>
          <p style={pMuted}>Category-wise budget usage</p>
          {Object.entries(budgetStats).map(([category, data]) => (
            <BudgetBar key={category} name={category} used={data.used} total={data.total} color="#6366f1" />
          ))}
        </div>
      </div>

      <div style={{ ...cardStyle, marginBottom: "32px" }}>
        <h3 style={h3Style}>Recent Submissions</h3>
        <p style={pMuted}>Your latest expense submissions and their status</p>
        
        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb", background: "#f9fafb" }}>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", width: "110px", whiteSpace: "nowrap" }}>Date</th>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", minWidth: "200px", maxWidth: "300px" }}>Description</th>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", width: "140px", whiteSpace: "nowrap" }}>Category</th>
                <th style={{ padding: "14px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", width: "100px", whiteSpace: "nowrap" }}>Amount</th>
                <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", width: "110px", whiteSpace: "nowrap" }}>Status</th>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", width: "130px", whiteSpace: "nowrap" }}>Receipt</th>
                <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase", width: "180px", whiteSpace: "nowrap" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expensesList.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: "48px 20px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
                    No expenses submitted yet. Click "Upload Receipt" or "Quick Capture" to add your first expense.
                  </td>
                </tr>
              ) : (
                expensesList.map((exp, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#1f2937", whiteSpace: "nowrap", fontWeight: "500" }}>
                      {exp.date}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#1f2937", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span title={exp.desc}>{exp.desc}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#1f2937", whiteSpace: "nowrap" }}>
                      {exp.cat}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "600", color: "#1f2937", textAlign: "right", whiteSpace: "nowrap" }}>
                      {formatCurrency(typeof exp.amount === "number" ? exp.amount : parseFloat(exp.amount) || 0)}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "16px", fontSize: "12px", fontWeight: "600", background: exp.status === "approved" ? "#d1fae5" : exp.status === "pending" ? "#fef3c7" : "#fee2e2", color: exp.status === "approved" ? "#059669" : exp.status === "pending" ? "#d97706" : "#dc2626", whiteSpace: "nowrap" }}>
                        {exp.statusIcon}
                        {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280", whiteSpace: "nowrap", fontFamily: "monospace" }}>
                      {exp.receipt}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      {exp.status === "pending" ? (
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "nowrap" }}>
                          <button onClick={() => handleApproveExpense(exp.receipt)} style={{ padding: "8px 14px", border: "none", borderRadius: "6px", background: "#10b981", color: "#fff", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")} onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}>
                            Approve
                          </button>
                          <button onClick={() => handleRejectExpense(exp.receipt)} style={{ padding: "8px 14px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", color: "#6b7280", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.borderColor = "#fca5a5"; e.currentTarget.style.color = "#dc2626"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280"; }}>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "#9ca3af", fontStyle: "italic" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyExpenses;