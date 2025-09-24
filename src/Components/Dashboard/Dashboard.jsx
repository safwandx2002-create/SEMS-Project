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
  Area,
  Pie,
  Cell,
  PieChart
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
  FileDown,
  ChartColumn,
  Circle,
  Receipt,
  Bot,
  Database,
  MessageSquare,
  Icon,
  Info,
  Zap,
  CheckCircle2,
  Package,
  Calendar,
  AlertCircle,
  CircleX,
  Clock4,
  User,
  CircleCheckBig
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


const expenseDistributionData = [
  { name: "Rent", value: 12000, color: "#6366f1" },      // أزرق
  { name: "Utilities", value: 4500, color: "#10b981" },  // أخضر
  { name: "Supplies", value: 2800, color: "#f59e0b" },   // أصفر
  { name: "Equipment", value: 3100, color: "#8b5cf6" },  // بنفسجي
  { name: "Travel", value: 1200, color: "#ef4444" },     // أحمر
  { name: "Meals", value: 800, color: "#6b7280" }        // رمادي
];



const percentAreaData = [
  { month: "Jan", Travel: 12000, Meals: 3200, Equipment: 1800, Office: 2400 },
  { month: "Feb", Travel: 12000, Meals: 3500, Equipment: 2100, Office: 1800 },
  { month: "Mar", Travel: 12000, Meals: 3800, Equipment: 2400, Office: 3200 },
  { month: "Apr", Travel: 12000, Meals: 3200, Equipment: 1900, Office: 2100 },
  { month: "May", Travel: 12000, Meals: 4100, Equipment: 2200, Office: 2800 },
  { month: "Jun", Travel: 12000, Meals: 4500, Equipment: 2800, Office: 3100 }
];

const categoryComparison = [
  { category: "Rent", current: 12000, previous: 12000, change: 0.0 },
  { category: "Utilities", current: 4500, previous: 3200, change: 40.6 },
  { category: "Supplies", current: 2800, previous: 2200, change: 27.3 },
  { category: "Equipment", current: 3100, previous: 2800, change: 10.7 },
  { category: "Travel", current: 1200, previous: 1500, change: -20.0 },
  { category: "Meals", current: 800, previous: 950, change: -15.8 }
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

const icons = {
  "My Expenses": <Receipt size={16} />,
  "Data Overview": <Database size={16} />,
  "Upload": <Upload size={16} />,
  "Camera": <Camera size={16} />,
  "Reports": <ChartColumn size={16} />,
  "Alerts": <AlertTriangle size={16} />,
  "AI Assistant": <MessageSquare size={16} />,
};

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

const statusIcon = {
  approved: <CheckCircle size={14} color="#16a34a" />,
  pending: <Clock size={14} color="#f59e0b" />,
  rejected: <CircleX size={14} color="#dc2626" />,
};

const statusStyles = {
  approved: {
    backgroundColor: "#d1fae5", 
    color: "#065f46"           
  },
  pending: {
    backgroundColor: "#fef3c7", 
    color: "#92400e"           
  },
  rejected: {
    backgroundColor: "#fee2e2", 
    color: "#991b1b"           
  }
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
  const [toastMessage, setToastMessage] = useState(""); 
  const videoRef = useRef(null);
  const successTimeoutRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState({Travel: true,Meals: true,Equipment: true,Office: true,Training: true});
  const [activeAlertFilter, setActiveAlertFilter] = useState("All");
  

{/* ------------------  ALERTS DATA  ------------------ */}
const alertsData = [
  {
    id: 1,
    type: "Critical", 
    title: "Rent Payment Overdue",
    description: "Monthly rent payment is 3 days overdue. Immediate action required.",
    date: "2024-08-20",
    amount: "$12,000",
    status: "Unread",
    tags: ["New", "Overdue"],
    icon: "AlertCircle",
    iconColor: "#dc2626",
    iconBg: "#fef2f2",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    tagColor: "#dc2626"
  },
  {
    id: 2,
    type: "Warning",
    title: "Electricity Expenses Spike",
    description: "Electricity expenses increased by 40% compared to last month.",
    date: "2024-08-22",
    amount: "$4,500",
    change: "+40%",
    status: "Unread",
    tags: ["New", "Spike"],
    icon: "Zap",
    iconColor: "#d97706",
    iconBg: "#fef3c7",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    tagColor: "#d97706"
  },
  {
    id: 3,
    type: "Warning",
    title: "Equipment Budget Alert",
    description: "Equipment expenses have reached 85% of the monthly budget.",
    date: "2024-08-21",
    amount: "$3,100",
    percentage: "85%",
    status: "Warning",
    tags: ["Budget"],
    icon: "Package",
    iconColor: "#d97706",
    iconBg: "#fef3c7",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    tagColor: "#d97706"
  },
  {
    id: 4,
    type: "Info",
    title: "New Expense Policy",
    description: "Updated expense reporting policy requires receipts for all expenses over $50.",
    date: "2024-08-19",
    
    tags: ["Policy"],
    icon: "Info",
    iconColor: "#2563eb",
    iconBg: "#dbeafe",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    tagColor: "#2563eb"
  },
  {
    id: 5,
    type: "Success",
    title: "Travel Expenses Reduced",
    description: "Travel expenses decreased by 20% this month, saving $300.",
    date: "2024-08-18",
    amount: "$1,200",
    change: "-20%",
    status: "Read",
    tags: ["Savings"],
    icon: "CheckCircle",
    iconColor: "#059669",
    iconBg: "#d1fae5",
    bgColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    tagColor: "#059669"
  },
  {
    id: 6,
    type: "Warning",
    title: "Office Supplies Increase",
    description: "Office supplies expenses are 35% higher than average.",
    date: "2024-08-17",
    amount: "$2,800",
    change: "+35%",
    status: "Unread",
    tags: ["New", "Spike"],
    icon: "Package",
    iconColor: "#d97706",
    iconBg: "#fef3c7",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    tagColor: "#d97706"
  },
  {
    id: 7,
    type: "Info",
    title: "Monthly Budget Summary",
    description: "You have used 78% of your total monthly budget.",
    date: "2024-08-16",
    percentage: "78%",
    status: "Read",
    tags: ["Budget"],
    icon: "BarChart3",
    iconColor: "#2563eb",
    iconBg: "#dbeafe",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    tagColor: "#2563eb"
  }
];



const handleCategoryToggle = (category) => {
  setSelectedCategories(prev => ({
    ...prev,
    [category]: !prev[category]
  }));
};

  const categoryData = [
    { name: "Travel", amount: 28000, percentage: 41.2, color: "#6366f1" },
    { name: "Meals", amount: 15000, percentage: 22.1, color: "#10b981" },
    { name: "Equipment", amount: 12000, percentage: 17.6, color: "#8b5cf6" },
    { name: "Office Supplies", amount: 8000, percentage: 11.8, color: "#f59e0b" },
    { name: "Training", amount: 5000, percentage: 7.4, color: "#ef4444" }
  ];

const pieData = categoryData.map(item => ({
    name: item.name,
    value: item.amount,
    percentage: item.percentage,
    color: item.color
  }));  


   // Custom label function for percentage display
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="14"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Handle pie chart click
  const onPieClick = (data, index) => {
    setSelectedCategory(selectedCategory === data.name ? null : data.name);
  };

  // Handle export functions
  const handleExport = (format) => {
    setToastMessage(`Exporting data as ${format}...`);
    setTimeout(() => setToastMessage(""), 3000);
  };

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
        <StatCard label="Budget Usage" value="68%" Icon={Receipt} iconColor="#8b5cf6">
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
            statusIcon :statusIcon.approved
          },
          {
            date: "2024-08-22",
            desc: "Client lunch meeting",
            cat: "Meals",
            amount: 85.75,
            status: "pending",
            receipt: "RCP-2024-002",
            statusIcon :statusIcon.pending
          },
          {
            date: "2024-08-21",
            desc: "Uber to client office",
            cat: "Transportation",
            amount: 28.5,
            status: "approved",
            receipt: "RCP-2024-003",
            statusIcon :statusIcon.approved
          },
          {
            date: "2024-08-20",
            desc: "Conference registration fee",
            cat: "Training",
            amount: 299.0,
            status: "rejected",
            receipt: "RCP-2024-004",
            statusIcon :statusIcon.rejected
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
          <QuickAction label="Upload Receipt" Icon={Upload}  onClick={() => setActiveItem("Upload")}/>
          <QuickAction label="Quick Capture" Icon={Camera}  onClick={() => setActiveItem("Camera")}/>
          <QuickAction label="View Reports" Icon={Receipt}  onClick={() => setActiveItem("Reports")}/>
          <QuickAction label="Schedule Reminder" Icon={Calendar}  onClick={() => setActiveItem("Alerts")}/>
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
        height: "350px",
        position: "relative"
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              onClick={onPieClick}
              stroke="white"
              strokeWidth={3}
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedCategory === entry.name ? entry.color : entry.color}
                  style={{
                    cursor: "pointer",
                    filter: selectedCategory === entry.name ? "brightness(0.9)" : "brightness(1)",
                    transform: selectedCategory === entry.name ? "scale(1.02)" : "scale(1)"
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Selected Category Tooltip */}
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
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px" }}>
        {categoryData.map((category) => (
          <div
            key={category.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
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
  <div style={{ width: "100%" }}>
    {/* Header */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px"
    }}>
      <div>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          style={{
            padding: "10px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151"
          }}
          onClick={() => handleExport("PDF")}
        >
          <Download size={16} style={{ marginRight: "6px" }} />
          Export PDF
        </button>
        <button
          style={{
            padding: "10px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151"
          }}
          onClick={() => handleExport("Excel")}
        >
          <Download size={16} style={{ marginRight: "6px" }} />
          Export Excel
        </button>
      </div>
    </div>

    {/* Filters Section */}
    <div style={{
      ...cardStyle,
      marginBottom: "24px"
    }}>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        marginBottom: "12px" 
      }}>
        <Filter size={18} style={{ marginRight: "8px", color: "#6b7280" }} />
        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#1f2937" }}>
          Filters
        </h4>
      </div>
      <p style={{ 
        color: "#6b7280", 
        marginTop: "0", 
        marginBottom: "20px",
        fontSize: "14px"
      }}>
        Customize your report view
      </p>

      <div style={{ 
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr auto",
        gap: "16px",
        alignItems: "end",
        marginBottom: "16px"
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
          <select style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            background: "#fff"
          }}>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>Custom Range</option>
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
          <select style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            background: "#fff"
          }}>
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
          <select style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            background: "#fff"
          }}>
            <option>All Categories</option>
            <option>Rent</option>
            <option>Utilities</option>
            <option>Office Supplies</option>
            <option>Equipment</option>
            <option>Travel</option>
          </select>
        </div>

        <button style={{
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500"
        }}>
          <ChartColumn size={16} style={{ marginRight: "6px" }} /> 
          Update Report
        </button>
      </div>

     
    </div>

    {/* Monthly Expense Trend Chart */}
    <div style={{
      ...cardStyle,
      marginBottom: "24px"
    }}>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "#1f2937",
        margin: "0 0 8px 0"
      }}>
        Monthly Expense Trend
      </h3>
      <p style={{
        color: "#6b7280",
        fontSize: "14px",
        margin: "0 0 24px 0"
      }}>
        Expense breakdown by category over time
      </p>

      <div style={{ height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={percentAreaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#a3acb6ff" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value, name) => [`$${value.toLocaleString()}`, ]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
            
            <Area
              type="monotone"
              dataKey="Travel"
              stackId="1"
              stroke="#6366f1"
              fill="#6366f1"
            />
            <Area
              type="monotone"
              dataKey="Meals"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
            />
            <Area
              type="monotone"
              dataKey="Equipment"
              stackId="1"
              stroke="#f59e0b"
              fill="#f59e0b"
            />
            <Area
              type="monotone"
              dataKey="Office"
              stackId="1"
              stroke="#8b5cf6"
              fill="#8b5cf6"
            />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Bottom Row - Category Comparison & Expense Distribution */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px"
    }}>
      {/* Category Comparison */}
      <div style={cardStyle}>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#1f2937",
          margin: "0 0 8px 0"
        }}>
          Category Comparison
        </h3>
        <p style={{
          color: "#6b7280",
          fontSize: "14px",
          margin: "0 0 24px 0"
        }}>
          This month vs last month
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {categoryComparison.map((item, index) => (
            <div key={index} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: index < categoryComparison.length - 1 ? "1px solid #f1f5f9" : "none"
            }}>
              <div>
                <div style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "4px"
                }}>
                  {item.category}
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "#6b7280"
                }}>
                  ${item.current.toLocaleString()} (was ${item.previous.toLocaleString()})
                </div>
              </div>
              
          <div style={{
           display: "flex",
           alignItems: "center",
           gap: "8px"
      }}>
          {item.change !== 0 && (
          <span style={{
          fontSize: "16px",
          color: item.change > 0 ? "#ef4444" : "#10b981"
      }}>
          {item.change > 0 ? <TrendingUp/> : <TrendingDown/>}
          </span>
      )}
      <span style={{
        fontSize: "14px",
        fontWeight: "600",
        color: item.change === 0 ? "#6b7280" : 
          item.change > 0 ? "#ef4444" : "#10b981"
  }}>
    {item.change === 0 ? "0%" : 
      item.change > 0 ? `+${item.change}%` : `${item.change}%`}
  </span>
</div>

            </div>
          ))}
        </div>
      </div>

      {/* Expense Distribution - Pie Chart */}
<div style={cardStyle}>
  <h3 style={{
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 8px 0"
  }}>
    Expense Distribution
  </h3>
  <p style={{
    color: "#6b7280",
    fontSize: "14px",
    margin: "0 0 24px 0"
  }}>
    Current month breakdown
  </p>

  <div style={{ height: "300px" }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={expenseDistributionData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          paddingAngle={4}
          dataKey="value"
          stroke="white"
          strokeWidth={2}
        >
          {expenseDistributionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Legend */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "16px"
  }}>
    {expenseDistributionData.map((item, index) => (
      <div key={index} style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <div style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: item.color
        }}></div>
        <span style={{ fontSize: "14px", color: "#374151" }}>
          {item.name}: ${item.value.toLocaleString()}
        </span>
      </div>
    ))}
  </div>
  </div>


{/* Expense Alerts */}
<div style={{
  background: "#fff",
  borderRadius: "08px",
  padding: "20px",
  border: "1px solid #f1f5f9",
  marginBottom: "24px"
}}>
  <h3 style={{
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 4px 0",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  }}>
    <AlertTriangle size={18} color="#f59e0b" />
    Expense Alerts
  </h3>
  <p style={{
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 16px 0"
  }}>
    Notable changes and trends in your expenses
  </p>

  {/* Alert Items */}
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    
    {/* Utilities Spike */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: "1px solid #f1f5f9",
      borderRadius: "8px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Circle size={10} fill="#facc15" stroke="none" />
        <div>
          <div style={{ fontSize: "14px", fontWeight: "500", color: "#1f2937" }}>
            Utilities Spike
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Electricity expenses increased by 40% this month
          </div>
        </div>
      </div>
      <span style={{
        background: "#f87171",
        color: "#fff",
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "6px"
      }}>High Impact</span>
    </div>

    {/* Equipment Budget */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: "1px solid #f1f5f9",
      borderRadius: "8px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Circle size={10} fill="#3b82f6" stroke="none" />
        <div>
          <div style={{ fontSize: "14px", fontWeight: "500", color: "#1f2937" }}>
            Equipment Budget
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Equipment expenses are 85% of monthly budget
          </div>
        </div>
      </div>
      <span style={{
        background: "#1e293b",
        color: "#fff",
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "6px"
      }}>Medium Impact</span>
    </div>

    {/* Travel Savings */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: "1px solid #f1f5f9",
      borderRadius: "8px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Circle size={10} fill="#22c55e" stroke="none" />
        <div>
          <div style={{ fontSize: "14px", fontWeight: "500", color: "#1f2937" }}>
            Travel Savings
          </div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Travel expenses decreased by 20% vs last month
          </div>
        </div>
      </div>
      <span style={{
        background: "#e5e7eb",
        color: "#1f2937",
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "6px"
      }}>Low Impact</span>
    </div>

  </div>
</div>


{/* Expense Summary */}
<div style={{
  background: "#fff",
  borderRadius: "8px",
  padding: "20px",
  border: "1px solid #f1f5f9"
}}>
  <h3 style={{
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 4px 0"
  }}>
    Expense Summary
  </h3>
  <p style={{
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 16px 0"
  }}>
    Detailed breakdown by category
  </p>

  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ textAlign: "left", color: "#6b7280", fontSize: "13px" }}>
        <th style={{ padding: "8px 0" }}>Category</th>
        <th style={{ padding: "8px 0" }}>This Month</th>
        <th style={{ padding: "8px 0" }}>Last Month</th>
        <th style={{ padding: "8px 0" }}>Change</th>
        <th style={{ padding: "8px 0" }}>% of Total</th>
      </tr>
    </thead>
    <tbody style={{ fontSize: "14px", color: "#1f2937" }}>
      <tr>
        <td style={{ padding: "12px 0" }}>Rent</td>
        <td>$12,000</td>
        <td>$12,000</td>
        <td style={{ color: "#6b7280" }}>0.0%</td>
        <td>49.2%</td>
      </tr>
      <tr>
        <td style={{ padding: "12px 0" }}>Utilities</td>
        <td>$4,500</td>
        <td>$3,200</td>
        <td style={{ color: "#ef4444" }}>+40.6%</td>
        <td>18.4%</td>
      </tr>
      <tr>
        <td style={{ padding: "12px 0" }}>Supplies</td>
        <td>$2,800</td>
        <td>$2,200</td>
        <td style={{ color: "#ef4444" }}>+27.3%</td>
        <td>11.5%</td>
      </tr>
      <tr>
        <td style={{ padding: "12px 0" }}>Equipment</td>
        <td>$3,100</td>
        <td>$2,800</td>
        <td style={{ color: "#ef4444" }}>+10.7%</td>
        <td>12.7%</td>
      </tr>
      <tr>
        <td style={{ padding: "12px 0" }}>Travel</td>
        <td>$1,200</td>
        <td>$1,500</td>
        <td style={{ color: "#10b981" }}>-20.0%</td>
        <td>4.9%</td>
      </tr>
      <tr>
        <td style={{ padding: "12px 0" }}>Meals</td>
        <td>$800</td>
        <td>$950</td>
        <td style={{ color: "#10b981" }}>-15.8%</td>
        <td>3.3%</td>
      </tr>
    </tbody>
  </table>
</div>




  </div>
  </div>
  
)}

      {activeItem === "Alerts" && (
  <div style={{ width: "100%" }}>
    {/* Header */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "10px"
    }}>
      <div>
      
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "10px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "#fff",
            fontSize: "14px",
            color: "#374151",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "500"
          }}
        >
          
          Mark All Read
        </button>
        <button
          style={{
            padding: "10px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "#fff",
            fontSize: "14px",
            color: "#374151",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "500"
          }}
        >
          
          Settings
        </button>
      </div>
    </div>

    {/* Alert Stats Cards */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "24px",
      marginBottom: "32px"
    }}>
      {/* Total Alerts */}
      <div style={{
        ...cardStyle,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "#f5f5f5ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <AlertTriangle size={24} color="#4d4d4dff" />
        </div>
        <div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937" }}>
            {alertsData.length}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Total Alerts</div>
        </div>
      </div>

      {/* Unread */}
      <div style={{
        ...cardStyle,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "#dbeafe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Clock4 size={24} color="#2563eb" />
        </div>
        <div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937" }}>
            {alertsData.filter(alert => alert.status === "Unread").length}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Unread</div>
        </div>
      </div>

      {/* Critical */}
      <div style={{
        ...cardStyle,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "#fef2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <CircleX size={24} color="#dc2626" />
        </div>
        <div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937" }}>
            {alertsData.filter(alert => alert.type === "Critical").length}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Critical</div>
        </div>
      </div>

      {/* Warnings */}
      <div style={{
        ...cardStyle,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "20px"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "#fef3c7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <AlertTriangle size={24} color="#d97706" />
        </div>
        <div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937" }}>
            {alertsData.filter(alert => alert.type === "Warning").length}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Warnings</div>
        </div>
      </div>
    </div>

    {/* Recent Alerts */}
    <div style={cardStyle}>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "#1f2937",
        margin: "0 0 8px 0"
      }}>
        Recent Alerts
      </h3>
      <p style={{
        color: "#6b7280",
        fontSize: "14px",
        margin: "0 0 24px 0"
      }}>
        Latest notifications and expense anomalies
      </p>

      {/* Filter Tabs */}
      <div style={{
        display: "flex",
        gap: "32px",
        marginBottom: "24px",
        borderBottom: "1px solid #f1f5f9",
        paddingBottom: "16px"
      }}>
        {[
          { key: "All", count: alertsData.length },
          { key: "Unread", count: alertsData.filter(a => a.status === "Unread").length },
          { key: "Critical", count: alertsData.filter(a => a.type === "Critical").length },
          { key: "Warning", count: alertsData.filter(a => a.type === "Warning").length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveAlertFilter(tab.key)}
            style={{
              background: "none",
              border: "none",
              color: activeAlertFilter === tab.key ? "#1f2937" : "#6b7280",
              fontSize: "14px",
              fontWeight: activeAlertFilter === tab.key ? "600" : "500",
              cursor: "pointer",
              borderBottom: activeAlertFilter === tab.key ? "2px solid #6366f1" : "2px solid transparent",
              paddingBottom: "14px",
              transition: "all 0.2s ease"
            }}
          >
            {tab.key} ({tab.count})
          </button>
        ))}
      </div>

      {/* Alert Items - Filtered */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {alertsData
          .filter(alert => {
            if (activeAlertFilter === "All") return true;
            if (activeAlertFilter === "Unread") return alert.status === "Unread";
            if (activeAlertFilter === "Critical") return alert.type === "Critical";
            if (activeAlertFilter === "Warning") return alert.type === "Warning";
            return true;
          })
          .map(alert => {
            const IconComponent = {
              AlertCircle,
              Zap,
              Package,
              Info,
              CheckCircle,
              BarChart3
            }[alert.icon];

            return (
              <div
                key={alert.id}
                style={{
                  border: `1px solid ${alert.borderColor}`,
                  borderRadius: "12px",
                  padding: "20px",
                  background: alert.bgColor,
                  transition: "all 0.2s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: alert.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: `2px solid ${alert.iconColor}20`
                  }}>
                    <IconComponent size={20} color={alert.iconColor} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <h4 style={{ 
                        margin: 0, 
                        fontSize: "16px", 
                        fontWeight: "600", 
                        color: "#1f2937"
                      }}>
                        {alert.title}
                      </h4>
                      {alert.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: alert.tagColor,
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p style={{ 
                      margin: "0 0 12px 0", 
                      fontSize: "14px", 
                      color: "#6b7280",
                      lineHeight: "1.6"
                    }}>
                      {alert.description}
                    </p>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "20px", 
                      fontSize: "13px", 
                      color: "#9ca3af" 
                    }}>
                      <span style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "6px",
                        fontWeight: "500"
                      }}>
                        <Calendar size={14} />
                        {alert.date}
                      </span>
                      {alert.amount && (
                        <span style={{ fontWeight: "600", color: "#374151" }}>
                          {alert.amount}
                        </span>
                      )}
                      {alert.change && (
                        <span style={{ 
                          color: alert.change.startsWith('+') ? "#dc2626" : "#059669",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontWeight: "600"
                        }}>
                          {alert.change.startsWith('+') ? 
                            <TrendingUp size={14} /> : 
                            <TrendingDown size={14} />
                          }
                          {alert.change}
                        </span>
                      )}
                      {alert.percentage && (
                        <span style={{ 
                          color: "#059669", 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "4px",
                          fontWeight: "600"
                        }}>
                          <BarChart3 size={14} />
                          {alert.percentage}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Show message if no alerts match filter */}
      {alertsData.filter(alert => {
        if (activeAlertFilter === "All") return true;
        if (activeAlertFilter === "Unread") return alert.status === "Unread";
        if (activeAlertFilter === "Critical") return alert.type === "Critical";
        if (activeAlertFilter === "Warning") return alert.type === "Warning";
        return true;
      }).length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "#6b7280"
        }}>
          <Bell size={48} color="#d1d5db" style={{ marginBottom: "16px" }} />
          <p style={{ margin: 0, fontSize: "16px" }}>
            No {activeAlertFilter.toLowerCase()} alerts found
          </p>
        </div>
      )}
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
                color: activeItem === item ? "#ffffffff" : "#4b5563",
                background: activeItem === item ? "#3700ffff" : "transparent",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {icons[item]}
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

              </div>
              <div>
                <button style={profileItem} onClick={() => setShowProfile(false)}>
                  <User size={16} />
                  Profile
                </button>
                
                <button style={profileItem} onClick={() => window.location.href = "/"}>
                  <LogOut size={16} />
                  <span style={{ color: "#ff0000ff"}}>Logout</span>
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



const TableRow = ({ date, desc, cat, amount, status, receipt,statusIcon }) => (
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
    <div >
  {statusIcon}
      {status}
    </div>
    
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
    <Icon size={15} style={{ color }} />
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
  background: "linear-gradient(135deg,  #00ffaa5e )",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  color: "#7446465d",
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
