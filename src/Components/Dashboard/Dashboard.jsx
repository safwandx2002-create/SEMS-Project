import React, { useState, useRef, useEffect } from "react";
import { CheckCircle, CircleX, AlertCircle, Clock } from "lucide-react";

// Import Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Import Pages
import MyExpenses from "./pages/MyExpenses";
import DataOverview from "./pages/DataOverview";
import Upload from "./pages/Upload";
import Camera from "./pages/Camera";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";

// Import Data
import { initialExpensesList, parseDate } from "./data/mockData";

function Dashboard() {
  /* ==================== STATE MANAGEMENT ==================== */
  const [activeItem, setActiveItem] = useState("My Expenses");
  const [showProfile, setShowProfile] = useState(false);
  
  // ✅ Load alerts from localStorage
  const [alerts, setAlerts] = useState(() => {
    const savedAlerts = localStorage.getItem('sems_alerts');
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });
  
  // Define status icons
  const statusIcon = {
    approved: <CheckCircle size={16} color="#059669" />,
    pending: <Clock size={16} color="#d97706" />,
    rejected: <CircleX size={16} color="#dc2626" />,
  };

  // ✅ Load expenses from localStorage or use initial data
  const [expensesList, setExpensesList] = useState(() => {
    const savedExpenses = localStorage.getItem('sems_expenses');
    if (savedExpenses) {
      const parsed = JSON.parse(savedExpenses);
      // Re-attach status icons after parsing
      return parsed.map(exp => ({
        ...exp,
        statusIcon: statusIcon[exp.status]
      }));
    }
    
    // If no saved data, use initial data with icons
    return initialExpensesList.map(exp => ({
      ...exp,
      statusIcon: statusIcon[exp.status]
    }));
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [showProcessedModal, setShowProcessedModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCameraError, setShowCameraError] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [expenseFormData, setExpenseFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    description: "",
  });

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timeoutRefs = useRef([]);

  const navItems = ["My Expenses", "Data Overview", "Upload", "Camera", "Reports", "Alerts"];

  /* ==================== SAVE TO LOCALSTORAGE ==================== */
  // ✅ Save expenses to localStorage whenever they change
  useEffect(() => {
    // Remove status icons before saving (they're React elements and can't be stringified)
    const expensesToSave = expensesList.map(({ statusIcon, ...rest }) => rest);
    localStorage.setItem('sems_expenses', JSON.stringify(expensesToSave));
  }, [expensesList]);

  // ✅ Save alerts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sems_alerts', JSON.stringify(alerts));
  }, [alerts]);

  /* ==================== CLEANUP ON UNMOUNT ==================== */
  useEffect(() => {
    return () => {
      // Cleanup camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      
      // Cleanup all timeouts
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, []);

  /* ==================== CALCULATE STATS ==================== */
  const calculateStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let thisMonth = 0;
    let pending = 0;
    let approved = 0;

    expensesList.forEach((exp) => {
      const expDate = parseDate(exp.date);
      if (expDate && expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
        const amount = typeof exp.amount === "number" ? exp.amount : parseFloat(exp.amount) || 0;
        thisMonth += amount;
      }
      if (exp.status === "pending") pending++;
      if (exp.status === "approved") approved++;
    });

    const budgetUsage = Math.min(100, Math.round((thisMonth / 2000) * 100));

    return { thisMonth, pending, approved, budgetUsage };
  };

  const stats = calculateStats();

  /* ==================== CALCULATE BUDGET STATS ==================== */
  const calculateBudgetStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const categories = {
      Meals: { used: 0, total: 500 },
      Transportation: { used: 0, total: 300 },
      "Office Supplies": { used: 0, total: 150 },
      Training: { used: 0, total: 1000 },
    };

    expensesList.forEach((exp) => {
      const expDate = parseDate(exp.date);
      if (expDate && expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
        const amount = typeof exp.amount === "number" ? exp.amount : parseFloat(exp.amount) || 0;

        if (categories[exp.cat]) {
          categories[exp.cat].used += amount;
        }
      }
    });

    return categories;
  };

  const budgetStats = calculateBudgetStats();

  /* ==================== FILE UPLOAD HANDLERS ==================== */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTimeout(() => {
        setExpenseFormData({
          date: "",
          amount: "",
          category: "",
          description: "",
        });
        setShowProcessedModal(true);
      }, 500);
    }
  };

  /* ==================== DATE VALIDATION HELPER ==================== */
  const isValidDate = (dateString) => {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const today = new Date();
    const minDate = new Date('1900-01-01');
    
    today.setHours(23, 59, 59, 999);
    date.setHours(0, 0, 0, 0);
    
    return date instanceof Date && 
           !isNaN(date) && 
           date >= minDate && 
           date <= today;
  };

  /* ==================== SAVE EXPENSE WITH VALIDATION ==================== */
  const handleSaveExpense = () => {
    if (!expenseFormData.date) {
      alert("❌ Please select a date.");
      return;
    }
    
    const date = new Date(expenseFormData.date);
    const today = new Date();
    const minDate = new Date('1900-01-01');
    today.setHours(23, 59, 59, 999);
    date.setHours(0, 0, 0, 0);
    
    if (!(date >= minDate && date <= today)) {
      alert("❌ Please enter a valid date between 1900 and today.");
      return;
    }
    
    const amount = parseFloat(expenseFormData.amount);
    if (!expenseFormData.amount || isNaN(amount) || amount <= 0) {
      alert("❌ Please enter a valid amount greater than 0.");
      return;
    }
    
    if (!expenseFormData.category || expenseFormData.category === "") {
      alert("❌ Please select a category.");
      return;
    }

    const newExpense = {
      date: expenseFormData.date,
      desc: expenseFormData.description || "No description provided",
      cat: expenseFormData.category,
      amount: amount,
      status: "pending",
      receipt: `RCP-${new Date().getFullYear()}-${String(expensesList.length + 1).padStart(3, "0")}`,
      statusIcon: statusIcon.pending,
      image: capturedImage || selectedFile ? (capturedImage || URL.createObjectURL(selectedFile)) : null,
    };

    setExpensesList([newExpense, ...expensesList]);
    checkBudgetAlerts(newExpense); // ✅ Check budget after adding
    setShowProcessedModal(false);
    setSelectedFile(null);
    setCapturedImage(null);
    setShowSuccessMessage(true);
    setActiveItem("My Expenses");

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  /* ==================== APPROVE/REJECT HANDLERS ==================== */
  const handleApproveExpense = (receipt) => {
    setExpensesList((prev) =>
      prev.map((exp) =>
        exp.receipt === receipt
          ? { ...exp, status: "approved", statusIcon: statusIcon.approved }
          : exp
      )
    );
    setToastMessage("Expense approved successfully");
    const timeoutId = setTimeout(() => setToastMessage(""), 3000);
    timeoutRefs.current.push(timeoutId);
  };

  const handleRejectExpense = (receipt) => {
    setExpensesList((prev) =>
      prev.map((exp) =>
        exp.receipt === receipt
          ? { ...exp, status: "rejected", statusIcon: statusIcon.rejected }
          : exp
      )
    );
    setToastMessage("Expense rejected");
    const timeoutId = setTimeout(() => setToastMessage(""), 3000);
    timeoutRefs.current.push(timeoutId);
  };

  /* ==================== CAMERA HANDLERS ==================== */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
      setCameraError("");
      setShowCameraError(false);
    } catch (err) {
      setCameraError("Camera access denied. Please enable camera permissions.");
      setShowCameraError(true);
      const timeoutId = setTimeout(() => setShowCameraError(false), 5000);
      timeoutRefs.current.push(timeoutId);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const handleSaveCaptured = (imageData) => {
    stopCamera();
    setExpenseFormData({
      date: "",
      amount: "",
      category: "",
      description: "",
    });
    setShowProcessedModal(true);
    setActiveItem("Upload");
  };

  const handleExport = (format) => {
    alert(`Exporting report as ${format}...`);
  };

  /* ==================== BUDGET ALERTS ==================== */
  const checkBudgetAlerts = (newExpense) => {
    const budgetLimits = {
      "Rent": 15000,
      "Utilities": 4500,
      "Office Supplies": 3000,
      "Equipment": 3100,
      "Travel": 1500,
      "Meals": 2000
    };

    const categoryLimit = budgetLimits[newExpense.cat];
    if (!categoryLimit) return;

    const categoryTotal = expensesList
      .filter(exp => exp.cat === newExpense.cat)
      .reduce((sum, exp) => sum + (typeof exp.amount === "number" ? exp.amount : parseFloat(exp.amount) || 0), 0);

    const newTotal = categoryTotal + (typeof newExpense.amount === "number" ? newExpense.amount : parseFloat(newExpense.amount) || 0);
    const percentage = (newTotal / categoryLimit) * 100;

    let alertType = null;
    let message = '';
    let description = '';

    if (percentage >= 100) {
      alertType = 'error';
      message = `${newExpense.cat} Budget Exceeded!`;
      description = `You've exceeded your ${newExpense.cat} budget limit of $${categoryLimit.toLocaleString()}. Current total: $${newTotal.toLocaleString()} (${Math.round(percentage)}%)`;
    } else if (percentage >= 90) {
      alertType = 'warning';
      message = `${newExpense.cat} Budget Almost Reached`;
      description = `You've used ${Math.round(percentage)}% of your ${newExpense.cat} budget ($${newTotal.toLocaleString()} of $${categoryLimit.toLocaleString()})`;
    } else if (percentage >= 75) {
      alertType = 'info';
      message = `${newExpense.cat} Budget Alert`;
      description = `You've used ${Math.round(percentage)}% of your ${newExpense.cat} budget ($${newTotal.toLocaleString()} of $${categoryLimit.toLocaleString()})`;
    }

    if (alertType) {
      const newAlert = {
        id: `alert-${Date.now()}`,
        type: alertType,
        message: message,
        description: description,
        timestamp: new Date().toISOString(),
        read: false
      };

      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  const handleAddExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      status: "pending",
      statusIcon: <Clock size={14} />
    };
    
    setExpensesList([newExpense, ...expensesList]);
    checkBudgetAlerts(newExpense);
    setToastMessage("Expense submitted successfully!");
    const timeoutId = setTimeout(() => setToastMessage(""), 3000);
    timeoutRefs.current.push(timeoutId);
  };

  /* ==================== ALERTS HANDLERS ==================== */
  const handleMarkAsRead = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleClearAll = () => {
    setAlerts([]);
  };

  /* ==================== RENDER OTHER SECTIONS ==================== */
  const renderOtherSections = () => {
    if (activeItem === "Upload") {
      return (
        <Upload
          selectedFile={selectedFile}
          showProcessedModal={showProcessedModal}
          expenseFormData={expenseFormData}
          capturedImage={capturedImage}
          setSelectedFile={setSelectedFile}
          setCapturedImage={setCapturedImage}
          setShowProcessedModal={setShowProcessedModal}
          setExpenseFormData={setExpenseFormData}
          handleFileChange={handleFileChange}
          handleSaveExpense={handleSaveExpense}
        />
      );
    }

    if (activeItem === "Camera") {
      return (
        <Camera
          showCamera={showCamera}
          capturedImage={capturedImage}
          videoRef={videoRef}
          showCameraError={showCameraError}
          cameraError={cameraError}
          startCamera={startCamera}
          stopCamera={stopCamera}
          capturePhoto={capturePhoto}
          setCapturedImage={setCapturedImage}
          handleSaveCaptured={handleSaveCaptured}
        />
      );
    }

    if (activeItem === "Reports") {
      return <Reports expensesList={expensesList} handleExport={handleExport} />;
    }

    if (activeItem === "Alerts") {
      return (
        <Alerts
          alerts={alerts}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onDeleteAlert={handleDeleteAlert}
          onClearAll={handleClearAll}
        />
      );
    }

    return null;
  };

  /* ==================== MAIN RENDER ==================== */
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", paddingTop: "70px" }}>
      <Header showProfile={showProfile} setShowProfile={setShowProfile} />

      <div className="dashboard-main" style={{ display: "flex", padding: "24px", gap: "24px" }}> {/* ✅ إضافة className */}
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} navItems={navItems} />

        <main style={{ flex: 1 }}>
          {activeItem === "My Expenses" && (
            <MyExpenses
              stats={stats}
              budgetStats={budgetStats}
              expensesList={expensesList}
              setActiveItem={setActiveItem}
              handleApproveExpense={handleApproveExpense}
              handleRejectExpense={handleRejectExpense}
            />
          )}
          {activeItem === "Data Overview" && <DataOverview expensesList={expensesList} />}
          {(activeItem === "Upload" ||
            activeItem === "Camera" ||
            activeItem === "Reports" ||
            activeItem === "Alerts") &&
            renderOtherSections()}
        </main>
      </div>

      {/* Success Toast */}
      {showSuccessMessage && (
        <div
          style={{
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
          }}
        >
          <CheckCircle size={20} />
          <span style={{ fontWeight: "500" }}>Expense saved successfully!</span>
        </div>
      )}

      {/* Approve/Reject Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: toastMessage.includes("approved") ? "#059669" : "#ef4444",
            color: "white",
            padding: "16px 24px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          {toastMessage.includes("approved") ? <CheckCircle size={20} /> : <CircleX size={20} />}
          <span style={{ fontWeight: "500" }}>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Dashboard;