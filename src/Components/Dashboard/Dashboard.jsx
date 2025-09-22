import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';

import {
  Upload,
  Camera,
  DollarSign,
  Clock,
  CheckCircle,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Bell,
  UserCheck,
  AlertTriangle,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  FileDown
} from "lucide-react";



const monthlyExpenseData = [
  { month: "Jan", Travel: 2800, Meals: 800, Equipment: 300, Office: 200, Training: 100 },
  { month: "Feb", Travel: 3200, Meals: 900, Equipment: 400, Office: 200, Training: 100 },
  { month: "Mar", Travel: 2600, Meals: 850, Equipment: 350, Office: 200, Training: 100 },
  { month: "Apr", Travel: 3500, Meals: 1000, Equipment: 400, Office: 200, Training: 100 },
  { month: "May", Travel: 4200, Meals: 1200, Equipment: 450, Office: 150, Training: 100 },
  { month: "Jun", Travel: 3900, Meals: 1100, Equipment: 500, Office: 200, Training: 100 },
];

const categoryBreakdownData = [
  { category: "Travel", amount: 20200, percentage: 62.4, trend: "+8.2%", color: "#6366f1" },
  { category: "Meals", amount: 5850, percentage: 18.1, trend: "+5.1%", color: "#10b981" },
  { category: "Equipment", amount: 2400, percentage: 7.4, trend: "-2.3%", color: "#8b5cf6" },
  { category: "Office Supplies", amount: 1150, percentage: 3.6, trend: "-1.2%", color: "#f59e0b" },
  { category: "Training", amount: 600, percentage: 1.9, trend: "+0.5%", color: "#ef4444" },
  { category: "Other", amount: 2200, percentage: 6.8, trend: "+1.1%", color: "#84cc16" }
];

const pieChartData = [
  { name: "Travel", value: 62.4, color: "#6366f1" },
  { name: "Meals", value: 18.1, color: "#10b981" },
  { name: "Equipment", value: 7.4, color: "#8b5cf6" },
  { name: "Office", value: 3.6, color: "#f59e0b" },
  { name: "Training", value: 1.9, color: "#ef4444" },
  { name: "Other", value: 6.8, color: "#84cc16" }
];

const recentWorkData = [
  { id: 1, title: "Expense Report", description: "Monthly expense report generated", status: "Completed", priority: "High" },
  { id: 2, title: "Reimbursement Request", description: "Travel reimbursement submitted for approval", status: "Pending", priority: "Medium" },
  { id: 3, title: "Audit Review", description: "Q2 expense audit review completed", status: "Completed", priority: "Low" }
];

const expenseSummaryData = [
  { category: "Travel", thisMonth: 4100, lastMonth: 3800, change: "+7.9%", ytd: 20200 },
  { category: "Meals", thisMonth: 1100, lastMonth: 1200, change: "-8.3%", ytd: 5850 },
  { category: "Equipment", thisMonth: 500, lastMonth: 450, change: "+11.1%", ytd: 2400 },
  { category: "Office", thisMonth: 200, lastMonth: 150, change: "+33.3%", ytd: 1150 },
  { category: "Training", thisMonth: 100, lastMonth: 100, change: "0%", ytd: 600 },
  { category: "Other", thisMonth: 800, lastMonth: 900, change: "-11.1%", ytd: 2200 }
];





const data = [
  { month: "Jan", transactions: 120 },
  { month: "Feb", transactions: 135 },
  { month: "Mar", transactions: 128 },
  { month: "Apr", transactions: 142 },
  { month: "May", transactions: 156 },
  { month: "Jun", transactions: 148 },
];

const expenseData = [
  { month: "Jan", amount: 850 },
  { month: "Feb", amount: 1200 },
  { month: "Mar", amount: 980 },
  { month: "Apr", amount: 1450 },
  { month: "May", amount: 1100 },
  { month: "Jun", amount: 1350 },
];

const monthlyData = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 55000 },
  { month: "Jun", amount: 58000 },
];

const navItems = [
  "My Expenses",
  "Data Overview",
  "Upload",
  "Camera",
  "Reports",
  "Alerts",
  "AI Assistant",
];

const sectionContent = {
  "My Expenses": {
    title: "My Expenses",
    subtitle: "Track and submit your personal expenses",
  },
  "Upload": { title: "Upload Invoice", subtitle: "Upload an invoice for automatic expense processing" },
  "Camera": { title: "Camera Capture", subtitle: "Capture invoice photos directly with your camera" },
  "Reports": { title: "Reports & Analytics", subtitle: "Comprehensive expense analysis and insights" },
  "Alerts": { title: "Alerts", subtitle: "Monitor expense anomalies and important notifications" },
  "AI Assistant": { title: "AI Assistant", subtitle: "Get insights and answers about your expenses" },
  "Data Overview": { title: "Data Overview", subtitle: "Comprehensive expense analytics and insights" },
};

function Dashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [activeItem, setActiveItem] = useState("My Expenses");
  const [activeOverviewTab, setActiveOverviewTab] = useState("Overview");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showProcessedModal, setShowProcessedModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [showCameraError, setShowCameraError] = useState(false);
  const videoRef = useRef(null);
  const successTimeoutRef = useRef(null);

  const categoryData = [
    { name: "Travel", amount: 28000, percentage: 41.2, color: "#6366f1" },
    { name: "Meals", amount: 15000, percentage: 22.1, color: "#10b981" },
    { name: "Equipment", amount: 12000, percentage: 17.6, color: "#8b5cf6" },
    { name: "Office Supplies", amount: 8000, percentage: 11.8, color: "#f59e0b" },
    { name: "Training", amount: 5000, percentage: 7.4, color: "#ef4444" }
  ];

  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowProcessedModal(true);
    }
  };

  /* ------------------ Camera functions (refactored) ------------------ */

  const startCamera = async () => {
    // Clear previous error state
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "environment"
        }
      });
      // Stop any existing stream just in case
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
      }
      setCameraStream(stream);
      setShowCamera(true);
      setShowCameraError(false);
    } catch (error) {
      let errorMessage = "Unable to access camera. ";
      if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
        errorMessage += "Please allow camera permissions in your browser settings.";
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage += "No camera found on this device.";
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        errorMessage += "Requested camera settings are not supported by this device.";
      } else {
        errorMessage += "Please check your camera settings and try again.";
      }
      setCameraError(errorMessage);
      setShowCameraError(true);
    }
  };

  const stopCamera = () => {
    setShowCamera(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Assign stream to video element and try to play
  useEffect(() => {
    const video = videoRef.current;
    if (video && cameraStream) {
      video.srcObject = cameraStream;
      // Some browsers require play() to be called from a user gesture; try/catch to avoid uncaught.
      const p = video.play();
      if (p && p.catch) {
        p.catch(() => {
          // ignore play promise errors (will still show video when allowed)
        });
      }
    }
  }, [cameraStream]);

  // Stop camera tracks on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on unmount

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) {
      setCameraError("No video element found.");
      setShowCameraError(true);
      return;
    }

    // Ensure we have dimensions
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    try {
      context.drawImage(video, 0, 0, width, height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setShowCamera(false);

      // stop stream after capture
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
    } catch (err) {
      setCameraError("Failed to capture image. Try again.");
      setShowCameraError(true);
    }
  };

  /* ------------------  MY EXPENSES  ------------------ */
  const renderMyExpenses = () => (
    <div style={{ width: "100%" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#000", marginBottom: "8px" }}>
            My Expenses
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Track and submit your personal expenses
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={buttonPrimary}
            onClick={() => setActiveItem("Upload")}
          >
            <Upload size={16} />
            Upload Receipt
          </button>
          <button style={buttonSecondary} onClick={() => setActiveItem("Camera")}>
            <Camera size={16} />
            Quick Capture
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <StatCard label="This Month" value="$1,350" Icon={DollarSign} iconColor="#3b82f6">
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingUp color="green" size={15} />
            <p style={{ color: "green", margin: 0 }}>$650 remaining</p>
          </span>
        </StatCard>
        <StatCard label="Pending Review" value="1" Icon={Clock} iconColor="#f59e0b">
          <p style={{ margin: 0 }}>Awaiting approval</p>
        </StatCard>
        <StatCard label="Approved" value="2" Icon={CheckCircle} iconColor="#10b981">
          <p style={{ margin: 0 }}>This month</p>
        </StatCard>
        <StatCard label="Budget Usage" value="68%" Icon={BarChart3} iconColor="#8b5cf6">
          <p style={{ margin: 0 }}>Of monthly limit</p>
        </StatCard>
      </div>

      {/* Expense Trend + Budget Status */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={h3Style}>Expense Trend</h3>
          <p style={pMuted}>Your spending pattern over the last 6 months</p>
          <div style={{ height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                
                <YAxis ticks={[0, 400, 800, 1200, 1600]}/>
                
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Area type="monotone" dataKey="amount" stroke="#5c5effff" strokeWidth={1} fill="#d8d8ffff"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={cardStyle}>
          <h3 style={h3Style}>Budget Status</h3>
          <p style={pMuted}>Category-wise budget usage</p>
          <BudgetBar name="Meals" used={320} total={500} color="#000000" />
          <BudgetBar name="Transportation" used={180} total={300} color="#000000" />
          <BudgetBar name="Office Supplies" used={75} total={150} color="#000000" />
          <BudgetBar name="Training" used={299} total={1000} color="#000000" />
        </div>
      </div>

      {/* Recent Submissions */}
      <div style={{ ...cardStyle, marginBottom: "32px" }}>
        <h3 style={h3Style}>Recent Submissions</h3>
        <p style={pMuted}>Your latest expense submissions and their status</p>
        <TableHeader />
        {[
          {
            date: "2024-08-23",
            desc: "Office supplies - Pens and notebooks",
            cat: "Office Supplies",
            amount: 45.5,
            status: "approved",
            receipt: "RCP-2024-001",
          },
          {
            date: "2024-08-22",
            desc: "Client lunch meeting",
            cat: "Meals",
            amount: 85.75,
            status: "pending",
            receipt: "RCP-2024-002",
          },
          {
            date: "2024-08-21",
            desc: "Uber to client office",
            cat: "Transportation",
            amount: 28.5,
            status: "approved",
            receipt: "RCP-2024-003",
          },
          {
            date: "2024-08-20",
            desc: "Conference registration fee",
            cat: "Training",
            amount: 299.0,
            status: "rejected",
            receipt: "RCP-2024-004",
          }
        ].map((item, i) => (
          <TableRow key={i} {...item} />
        ))}
      </div>

      {/* Quick Actions */}
      <div style={cardStyle}>
        <h3 style={h3Style}>Quick Actions</h3>
        <p style={pMuted}>Common tasks and shortcuts</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          <QuickAction label="Upload Receipt" Icon={Upload} color="#6366f1" onClick={() => setActiveItem("Upload")} />
          <QuickAction label="Quick Capture" Icon={Camera} color="#10b981" onClick={() => setActiveItem("Camera")} />
          <QuickAction label="View Reports" Icon={BarChart3} color="#f59e0b" onClick={() => setActiveItem("Reports")} />
          <QuickAction label="Schedule Reminder" Icon={Bell} color="#8b5cf6" onClick={() => setActiveItem("Alerts")} />
        </div>
      </div>
    </div>
  );

  /* ------------------  DATA OVERVIEW  ------------------ */
  const renderDataOverview = () => (
    <div style={{ width: "100%" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#000", marginBottom: "8px" }}>
            Data Overview
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Comprehensive expense analytics and insights
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{
            ...buttonSecondary,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Filter size={18} />
            Filter
          </button>
          <button style={{
            ...buttonSecondary,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <StatCard label="Total Expenses" value="$68,000" Icon={DollarSign} iconColor="#2600ff">
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingUp color="green" size={15} />
            <p style={{ color: "green", margin: 0 }}>+8.5% from last month</p>
          </span>
        </StatCard>
        <StatCard label="Total Transactions" value="1,429" Icon={FileText} iconColor="#009207">
          <p style={{ margin: 0 }}>This Month</p>
        </StatCard>
        <StatCard label="Avg Transaction" value="$48" Icon={BarChart3} iconColor="#d49d04">
          <p style={{ margin: 0 }}>Per expense</p>
        </StatCard>
        <StatCard label="Active Users" value="60" Icon={UserCheck} iconColor="#9500f8">
          <p style={{ margin: 0 }}>Submitted expenses</p>
        </StatCard>
      </div>

      {/* Sub-tabs */}
      <div style={{
        display: "flex",
        gap: "0px",
        marginBottom: "24px",
        background: "#f1f5f9",
        borderRadius: "12px",
        padding: "4px"
      }}>
        {["Overview", "Trends", "Categories", "Departments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveOverviewTab(tab)}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              background: activeOverviewTab === tab ? "#ffffff" : "transparent",
              color: activeOverviewTab === tab ? "#1f2937" : "#6b7280",
              boxShadow: activeOverviewTab === tab ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeOverviewTab === "Overview" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div style={cardStyle}>
            <h3 style={h3Style}>Monthly Expense Trend</h3>
            <p style={pMuted}>Expense patterns over the last 6 months</p>
            <div style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis  ticks={[0, 20000, 40000, 60000, 80000]} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Expenses']} />
                  <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Transaction Volume</h3>
            <p style={pMuted}>Number of transactions per month</p>
            <div style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transactions" fill="#00c288" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ ...cardStyle, gridColumn: "1 / span 2" }}>
            <h3 style={h3Style}>Data Summary</h3>
            <p style={pMuted}>Key insights from your expense data</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {/* Avg Processing Time */}
              <div
                style={{
                  background: "#eff6ff",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <Clock size={28} color="#3b82f6" />
                <p style={{ fontSize: "14px", color: "#374151", margin: "8px 0" }}>
                  Avg Processing Time
                </p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#000" }}>
                  2.3 days
                </p>
              </div>

              {/* Approval Rate */}
              <div
                style={{
                  background: "#ecfdf5",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <CheckCircle size={28} color="#10b981" />
                <p style={{ fontSize: "14px", color: "#374151", margin: "8px 0" }}>
                  Approval Rate
                </p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#000" }}>
                  94.2%
                </p>
              </div>

              {/* Flagged Expenses */}
              <div
                style={{
                  background: "#fffbeb",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <AlertTriangle size={28} color="#f59e0b" />
                <p style={{ fontSize: "14px", color: "#374151", margin: "8px 0" }}>
                  Flagged Expenses
                </p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#000" }}>
                  3.1%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeOverviewTab === "Trends" && (
  <div>
    <div style={cardStyle}>
      <h3 style={h3Style}>Expense Trends Analysis</h3>
      <p style={pMuted}>Detailed trend analysis with growth indicators</p>
      <div style={{ height: "420px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis ticks={[0, 20000, 40000, 60000, 80000]} />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Expenses"]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
)}


      {activeOverviewTab === "Categories" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Pie Chart Section */}
          <div style={cardStyle}>
            <h3 style={h3Style}>Expense by Category</h3>
            <p style={pMuted}>Distribution of expenses across categories</p>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              position: "relative"
            }}>
              {/* SVG Pie Chart */}
              <svg width="300" height="300" viewBox="-150 -150 300 300">
                {/* Travel - 41.2% (Largest - Purple) */}
                <path
                  d="M 0 0 L 0 -100 A 100 100 0 0 1 95 -31 Z"
                  fill={selectedCategory === "Travel" ? "#4f46e5" : "#6366f1"}
                  stroke="white"
                  strokeWidth="3"
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s",
                    transform: selectedCategory === "Travel" ? "scale(1.05)" : "scale(1)"
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === "Travel" ? null : "Travel")}
                  onMouseEnter={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'block';
                      tooltip.innerHTML = 'Travel: $28,000 (41.2%)';
                    }
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }}
                />

                {/* Meals - 22.1% */}
                <path
                  d="M 0 0 L 95 -31 A 100 100 0 0 1 95 31 Z"
                  fill={selectedCategory === "Meals" ? "#059669" : "#10b981"}
                  stroke="white"
                  strokeWidth="3"
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s",
                    transform: selectedCategory === "Meals" ? "scale(1.05)" : "scale(1)"
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === "Meals" ? null : "Meals")}
                  onMouseEnter={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'block';
                      tooltip.innerHTML = 'Meals: $15,000 (22.1%)';
                    }
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }}
                />

                {/* Equipment - 17.6% */}
                <path
                  d="M 0 0 L 95 31 A 100 100 0 0 1 0 100 Z"
                  fill={selectedCategory === "Equipment" ? "#7c3aed" : "#8b5cf6"}
                  stroke="white"
                  strokeWidth="3"
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s",
                    transform: selectedCategory === "Equipment" ? "scale(1.05)" : "scale(1)"
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === "Equipment" ? null : "Equipment")}
                  onMouseEnter={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'block';
                      tooltip.innerHTML = 'Equipment: $12,000 (17.6%)';
                    }
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }}
                />

                {/* Office Supplies - 11.8% */}
                <path
                  d="M 0 0 L 0 100 A 100 100 0 0 1 -95 31 Z"
                  fill={selectedCategory === "Office Supplies" ? "#d97706" : "#f59e0b"}
                  stroke="white"
                  strokeWidth="3"
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s",
                    transform: selectedCategory === "Office Supplies" ? "scale(1.05)" : "scale(1)"
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === "Office Supplies" ? null : "Office Supplies")}
                  onMouseEnter={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'block';
                      tooltip.innerHTML = 'Office Supplies: $8,000 (11.8%)';
                    }
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }}
                />

                {/* Training - 7.4% (Smallest) */}
                <path
                  d="M 0 0 L -95 31 A 100 100 0 0 1 0 -100 Z"
                  fill={selectedCategory === "Training" ? "#dc2626" : "#ef4444"}
                  stroke="white"
                  strokeWidth="3"
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s",
                    transform: selectedCategory === "Training" ? "scale(1.05)" : "scale(1)"
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === "Training" ? null : "Training")}
                  onMouseEnter={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'block';
                      tooltip.innerHTML = 'Training: $5,000 (7.4%)';
                    }
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('tooltip');
                    if (tooltip) {
                      tooltip.style.display = 'none';
                    }
                  }}
                />

                {/* Inner white circle for donut effect */}
                <circle cx="0" cy="0" r="45" fill="white" />

                {/* Tooltip */}
                <foreignObject x="-75" y="-75" width="150" height="150">
                  <div
                    id="tooltip"
                    style={{
                      display: 'none',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      pointerEvents: 'none'
                    }}
                  />
                </foreignObject>
              </svg>

              {/* Interactive Tooltip */}
              {selectedCategory && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textAlign: "center",
                  pointerEvents: "none",
                  zIndex: 10
                }}>
                  <div>{selectedCategory}</div>
                  <div>${categoryData.find(cat => cat.name === selectedCategory)?.amount.toLocaleString()}</div>
                  <div>{categoryData.find(cat => cat.name === selectedCategory)?.percentage}%</div>
                </div>
              )}
            </div>
          </div>

          {/* Category Details Section */}
          <div style={cardStyle}>
            <h3 style={h3Style}>Category Details</h3>
            <p style={pMuted}>Breakdown by expense category</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "32px" }}>

              {categoryData.map((category) => (
                <div
                  key={category.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: selectedCategory === category.name ? "#f8fafc" : "transparent",
                    border: selectedCategory === category.name ? "2px solid " + category.color : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: category.color
                    }}></div>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#374151" }}>{category.name}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>${category.amount.toLocaleString()}</div>
                    <div style={{ fontSize: "14px", color: "#6b7280" }}>{category.percentage}%</div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      )}

      {activeOverviewTab === "Departments" && (
        <div style={cardStyle}>
          <h3 style={h3Style}>Department Analysis</h3>
          <p style={pMuted}>Expense breakdown by department</p>

          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "16px",
            padding: "16px 0",
            borderBottom: "2px solid #e5e7eb",
            fontWeight: "600",
            fontSize: "14px",
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            <span>Department</span>
            <span>Total Expenses</span>
            <span>Active Users</span>
            <span>Avg per User</span>
          </div>

          {/* Table Rows */}
          <div style={{ marginTop: "8px" }}>
            {[
              { name: "Engineering", total: 25000, users: 24, avg: 1042 },
              { name: "Sales", total: 18000, users: 12, avg: 1500 },
              { name: "Marketing", total: 15000, users: 8, avg: 1875 },
              { name: "HR", total: 8000, users: 6, avg: 1333 },
              { name: "Operations", total: 12000, users: 10, avg: 1200 }
            ].map((dept, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  gap: "16px",
                  padding: "20px 0",
                  borderBottom: "1px solid #f1f5f9",
                  alignItems: "center",
                  transition: "background-color 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f8fafc"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <span style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#1f2937"
                }}>
                  {dept.name}
                </span>
                <span style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937"
                }}>
                  ${dept.total.toLocaleString()}
                </span>
                <span style={{
                  fontSize: "16px",
                  color: "#6b7280"
                }}>
                  {dept.users}
                </span>
                <span style={{
                  fontSize: "16px",
                  color: "#6b7280"
                }}>
                  ${dept.avg.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div style={{
            marginTop: "24px",
            padding: "16px",
            background: "#f8fafc",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "14px", color: "#6b7280" }}>
              Total across all departments
            </span>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937" }}>
              $78,000
            </span>
          </div>
        </div>
      )}
    </div>
  );

  /* ------------------  OTHER SECTIONS  ------------------ */
  const renderOtherSections = () => (
    <div style={{ width: "100%" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
        {sectionContent[activeItem]?.title || activeItem}
      </h1>
      <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "32px" }}>
        {sectionContent[activeItem]?.subtitle || `Welcome to ${activeItem} section`}
      </p>

      {activeItem === "Upload" && (
        <div style={cardStyle}>
          <h3 style={h3Style}>Upload Invoice</h3>
          <p style={pMuted}>Choose how you want to add your expense</p>

          {/* File Upload and Camera Section */}
          <div style={{
            display: "flex",
            gap: "20px",
            marginBottom: "24px"
          }}>
            {/* File Upload Button */}
            <div style={{
              ...buttonSecondary,
              flex: 1,
              padding: "24px",
              flexDirection: "column",
              justifyContent: "center",
              height: "160px",
              background: "#fff",
              position: "relative",
              overflow: "hidden"
            }}>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer"
                }}
              />
              <Upload size={32} color="#6366f1" style={{ marginBottom: "12px" }} />
              <span style={{ fontWeight: "600", marginBottom: "8px", color: "#1f2937" }}>Choose File</span>
              <span style={{ fontSize: "14px", color: "#6b7280" }}>Upload PDF, JPG, PNG</span>
            </div>

            {/* Camera Button */}
            <button
              style={{
                ...buttonSecondary,
                flex: 1,
                padding: "24px",
                flexDirection: "column",
                justifyContent: "center",
                height: "160px",
                background: "#fff",
                position: "relative"
              }}
              onClick={async () => {
                try {
                  // Quick permission test before going to Camera tab
                  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                  stream.getTracks().forEach(track => track.stop());
                  setActiveItem("Camera");
                } catch (error) {
                  setCameraError("Unable to access camera. Please check permissions.");
                  setShowCameraError(true);
                  setTimeout(() => setShowCameraError(false), 3000);
                }
              }}
            >
              <Camera size={32} color="#10b981" style={{ marginBottom: "12px" }} />
              <span style={{ fontWeight: "600", marginBottom: "8px", color: "#1f2937" }}>Use Camera</span>
              <span style={{ fontSize: "14px", color: "#6b7280" }}>Capture with device camera</span>
              {cameraError && (
                <div style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "0",
                  right: "0",
                  background: "#fee2e2",
                  color: "#dc2626",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "center"
                }}>
                  
                </div>
              )}
            </button>
          </div>

          {/* Manual Entry Section */}
          <div style={{
            marginTop: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "24px",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}>
            <FileText size={32} color="#6b7280" />
            <div style={{ flex: 1 }}>
              <h4 style={{
                margin: "0 0 4px 0",
                fontSize: "16px",
                fontWeight: "600",
                color: "#1f2937"
              }}>
                Manual Entry
              </h4>
              <p style={{
                margin: "0",
                fontSize: "14px",
                color: "#6b7280"
              }}>
                Add expense details manually if you prefer
              </p>
            </div>
            <button
              style={{
                ...buttonPrimary,
                padding: "10px 20px",
                background: "#fff",
                border: "1px solid #e5e7eb",
                color: "#374151"
              }}
              onClick={() => setShowProcessedModal(true)}
            >
              <FileText size={16} />
              Enter Expense Manually
            </button>
          </div>

          {/* Success Modal */}
          {showProcessedModal && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}>
              <div style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                width: "90%",
                maxWidth: "500px",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
              }}>
                <h3 style={{
                  fontSize: "18px",
                  marginBottom: "16px",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <CheckCircle size={24} />
                  Invoice processed successfully!
                </h3>

                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", marginBottom: "12px" }}>Expense Details</h4>
                  <div style={{ display: "grid", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "14px", color: "#6b7280" }}>Date</label>
                      <input
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          marginTop: "4px"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", color: "#6b7280" }}>Amount</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          marginTop: "4px"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", color: "#6b7280" }}>Category</label>
                      <select
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          marginTop: "4px"
                        }}
                      >
                        <option value="">Select category</option>
                        <option value="travel">Travel</option>
                        <option value="meals">Meals</option>
                        <option value="supplies">Office Supplies</option>
                        <option value="equipment">Equipment</option>
                        <option value="rent">Rent</option>
                        <option value="utilities">Utilities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", color: "#6b7280" }}>Description</label>
                      <textarea
                        placeholder="Enter description"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          marginTop: "4px",
                          minHeight: "80px"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => setShowProcessedModal(false)}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      background: "#fff",
                      color: "#374151"
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowProcessedModal(false);
                      setShowSuccessMessage(true);
                      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
                      successTimeoutRef.current = setTimeout(() => setShowSuccessMessage(false), 3000);
                    }}
                    style={{
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "6px",
                      background: "#059669",
                      color: "#fff"
                    }}
                  >
                    Save Expense
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rest of the Upload section... */}
        </div>
      )}

      {activeItem === "Camera" && (
  <div style={cardStyle}>
    

    {/* Ready to Capture Section */}
    {!showCamera && !capturedImage && (
      <div style={{
        background: "#f8fafc",
        borderRadius: "12px",
        padding: "48px",
        textAlign: "center",
        border: "2px dashed #e2e8f0",
        maxWidth: "600px",
        margin: "32px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "#e0e7ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px"
        }}>
          <Camera size={40} color="#6366f1" />
        </div>

        <h4 style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "8px"
        }}>
          Ready to Capture
        </h4>

        <p style={{
          color: "#6b7280",
          fontSize: "16px",
          marginBottom: "32px",
          maxWidth: "400px"
        }}>
          Position your invoice within the camera frame for the best results
        </p>

        {/* Tips Section */}
        <div style={{
          background: "#eff6ff",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "32px",
          maxWidth: "500px",
          width: "100%"
        }}>
          <h5 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#1e40af",
            marginBottom: "16px"
          }}>
            Tips for best results:
          </h5>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "14px",
            color: "#1e40af"
          }}>
            <div>• Ensure good lighting</div>
            <div>• Keep the invoice flat and straight</div>
            <div>• Fill the frame with the document</div>
            <div>• Avoid shadows and glare</div>
          </div>
        </div>

        <button
          style={{
            ...buttonPrimary,
            fontSize: "15px",
            padding: "16px 40px",
            background: "#3c3fffff",
            boxShadow: "0 4px 12px rgba(85, 88, 255, 0.49)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
          onClick={startCamera}
        >
          <Camera size={20} />
          Start Camera
        </button>
      </div>
    )}

  
  </div>
)}


   {activeItem === "Reports" && (
  <>
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>Reports & Analytics</h2>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Comprehensive expense analysis and insights
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleExport("PDF")}
        >
          <FileText size={16} style={{ marginRight: "6px" }} />
          Export PDF
        </button>
        <button
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleExport("Excel")}
        >
          <FileDown size={16} style={{ marginRight: "6px" }} />
          Export Excel
        </button>
      </div>
    </div>

    {/* Filters */}
    <div
      style={{
        marginTop: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
        background: "#fff",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
      >
        <Filter size={18} style={{ marginRight: "8px" }} />
        <h4 style={{ margin: 0 }}>Filters</h4>
      </div>
      <p style={{ color: "#6b7280", marginTop: "0", marginBottom: "16px" }}>
        Customize your report view
      </p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <select
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <option>Last 6 Months</option>
          <option>Last Year</option>
          <option>Custom Range</option>
        </select>

        <select
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <option>All Departments</option>
          <option>Finance</option>
          <option>HR</option>
        </select>

        <select
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <option>All Categories</option>
          <option>Travel</option>
          <option>Meals</option>
        </select>

        <button
          style={{
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          📊 Update Report
        </button>
      </div>

      {/* Checkbox */}
      <div>
        <label>
          <input type="checkbox" style={{ marginRight: "6px" }} />
          Include Archived Records
        </label>
      </div>
    </div>
  </>
)}

{/* Toast message */}
{toastMessage && (
  <div
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#111827",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "6px",
    }}
  >
    {toastMessage}
  </div>
)}

      {activeItem === "Alerts" && (
        <div style={cardStyle}>
          <h3 style={h3Style}>Alerts & Notifications</h3>
          <p style={pMuted}>Manage your expense alerts and notifications</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#fef3c7", borderRadius: "8px" }}>
              <AlertTriangle size={20} color="#f59e0b" />
              <div>
                <p style={{ margin: "0 0 4px 0", fontWeight: "500" }}>Budget Alert</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>You're approaching your monthly limit</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#dbeafe", borderRadius: "8px" }}>
              <Bell size={20} color="#3b82f6" />
              <div>
                <p style={{ margin: "0 0 4px 0", fontWeight: "500" }}>Reminder</p>
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Submit your weekly expenses</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeItem === "AI Assistant" && (
        <div style={cardStyle}>
          <h3 style={h3Style}>AI Assistant</h3>
          <p style={pMuted}>Ask questions about your expenses and get intelligent insights</p>
          <div style={{
            background: "#f8fafc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px"
          }}>
            <p style={{ margin: 0, fontStyle: "italic" }}>
              "Hi! I can help you analyze your expenses, find patterns, and answer questions about your spending habits."
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Ask me about your expenses..."
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
            <button style={buttonPrimary}>Send</button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#f8fafc" }}>
      {/* Top Header */}
      <header style={headerStyle}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={logoBox}>
            <span style={{ color: "#fff", fontSize: "22px", fontWeight: "bold" }}>S</span>
          </div>
          <span style={{ fontSize: "17px", fontWeight: "700", color: "#1f2937" }}>SEMS</span>
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", gap: "8px", flex: 1, justifyContent: "center" }}>
          {navItems.map((item) => (
            <span
              key={item}
              onClick={() => setActiveItem(item)}
              style={{
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "6px",
                color: activeItem === item ? "#6366f1" : "#4b5563",
                background: activeItem === item ? "#f0f9ff" : "transparent",
              }}
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowProfile(!showProfile)} style={profileBtn}>
            <div style={avatar}>SA</div>
            <span style={{ fontWeight: "500" }}>Safwan ALKhazaleh</span>
          </button>
          {showProfile && (
            <div style={profileDropdown}>
              <div style={{ padding: "12px", borderBottom: "1px solid #f1f5f9" }}>
                <p style={{ fontWeight: "600", margin: "0 0 4px 0" }}>Safwan ALKhazaleh</p>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 4px 0" }}>safwan@email.com</p>
                <p style={{ fontSize: "13px", color: "#6366f1", fontWeight: "500", margin: 0 }}>Administrator</p>
              </div>
              <div>
                <button style={profileItem} onClick={() => setShowProfile(false)}>
                  <FileText size={16} />
                  Profile
                </button>
                <button style={profileItem} onClick={() => setShowProfile(false)}>
                  <Settings size={16} />
                  Settings
                </button>
                <button style={profileItem} onClick={() => window.location.href = "/"}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main style={{ marginTop: "90px", padding: "24px", width: "100%" }}>
        {activeItem === "My Expenses"
          ? renderMyExpenses()
          : activeItem === "Data Overview"
            ? renderDataOverview()
            : renderOtherSections()}
      </main>

      {/* Success Message Notification */}
      {showSuccessMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "#059669",
          color: "white",
          padding: "16px 24px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          animation: "slideIn 0.3s ease-out"
        }}>
          <CheckCircle size={20} />
          <span style={{ fontWeight: "500" }}>Expense saved successfully!</span>
        </div>
      )}

      {/* Add this style tag right after your imports */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Camera Error Modal */}
      {showCameraError && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center"
          }}>
            <div style={{
              color: "#dc2626",
              marginBottom: "16px",
              fontSize: "24px"
            }}>
              ❌
            </div>
            <h3 style={{
              color: "#dc2626",
              marginBottom: "8px",
              fontSize: "18px"
            }}>
              Camera Access Denied
            </h3>
            <p style={{
              color: "#4b5563",
              marginBottom: "16px",
              fontSize: "14px"
            }}>
              {cameraError || "Please allow camera access to use this feature."}
            </p>
            <button
              onClick={() => setShowCameraError(false)}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------- Small Reusable Pieces -------------------- */
const StatCard = ({ label, value, subtitle, Icon, iconColor, children }) => (
  <div style={cardStyle}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
      <span style={{ color: "#6b7280", fontSize: "14px", fontWeight: "500" }}>{label}</span>
      {Icon && <Icon size={20} style={{ color: iconColor }} />}
    </div>
    <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", marginBottom: "4px" }}>{value}</div>
    <div style={{ color: "#6b7280", fontSize: "14px" }}>{children}</div>
  </div>
);

const BudgetBar = ({ name, used, total, color }) => (
  <div style={{ marginBottom: "16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
      <span style={{ fontSize: "14px", fontWeight: "500" }}>{name}</span>
      <span style={{ fontSize: "14px", color: "#6b7280" }}>
        ${used} / ${total}
      </span>
    </div>
    <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "8px" }}>
      <div style={{ width: `${(used / total) * 100}%`, background: color, height: "100%", borderRadius: "4px" }} />
    </div>
    <span style={{ fontSize: "12px", color: "#6b7280" }}>{Math.round((used / total) * 100)}% used</span>
  </div>
);

const TableHeader = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
      fontWeight: "600",
      fontSize: "12px",
      textTransform: "uppercase",
      color: "#6b7280",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "8px",
      marginBottom: "8px",
    }}
  >
    <span>Date</span>
    <span>Description</span>
    <span>Category</span>
    <span>Amount</span>
    <span>Status</span>
    <span>Receipt</span>
  </div>
);

const TableRow = ({ date, desc, cat, amount, status, receipt }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
      padding: "8px 0",
      borderBottom: "1px solid #f1f5f9",
      alignItems: "center",
    }}
  >
    <span style={{ fontSize: "14px" }}>{date}</span>
    <span style={{ fontSize: "14px" }}>{desc}</span>
    <span style={{ fontSize: "14px" }}>{cat}</span>
    <span style={{ fontSize: "14px", fontWeight: "600" }}>${amount.toFixed(2)}</span>
    <span style={{
      fontSize: "14px",
      fontWeight: "600",
      color: status === "approved" ? "#10b981" : status === "pending" ? "#f59e0b" : "#ef4444",
      textTransform: "capitalize"
    }}>
      {status}
    </span>
    <span style={{ fontSize: "14px", color: "#6b7280" }}>{receipt}</span>
  </div>
);

const QuickAction = ({ label, Icon, color, onClick }) => (
  <button
    style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px"
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <Icon size={24} style={{ color }} />
    <div style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>{label}</div>
  </button>
);

/* -------------------- Inline Style Objects -------------------- */
const headerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  height: "70px",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "0 0 16px 16px",
  zIndex: 1000,
};

const logoBox = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0077ff 0%, #01a365 100%)",
};

const avatar = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  color: "#fff",
  fontSize: "14px"
};

const profileBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "4px",
  borderRadius: "8px",
  transition: "background 0.2s"
};

const profileDropdown = {
  position: "absolute",
  top: "60px",
  right: 0,
  background: "#fff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  borderRadius: "12px",
  width: "220px",
  zIndex: 1001,
  border: "1px solid #e5e7eb"
};

const profileItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  cursor: "pointer",
  border: "none",
  background: "transparent",
  width: "100%",
  textAlign: "left",
  fontSize: "14px",
  color: "#374151",
  transition: "background 0.2s"
};

const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  border: "1px solid #f1f5f9"
};

const h3Style = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "4px",
  color: "#1f2937"
};

const pMuted = {
  color: "#6b7280",
  fontSize: "14px",
  marginBottom: "20px"
};

const buttonPrimary = {
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  color: "#fff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  transition: "all 0.2s"
};

const buttonSecondary = {
  background: "#f8fafc",
  color: "#374151",
  padding: "10px 16px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  transition: "all 0.2s"
};

export default Dashboard;
