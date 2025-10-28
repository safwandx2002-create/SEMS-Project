import React, { useState, useEffect } from 'react';
import { Upload as UploadIcon, FileText, X, PlusCircle } from 'lucide-react';
import { cardStyle, h3Style, pMuted, buttonPrimary, buttonSecondary } from '../styles/styles';

const Upload = ({ 
  selectedFile,
  showProcessedModal,
  expenseFormData,
  capturedImage,
  setSelectedFile,
  setCapturedImage,
  setShowProcessedModal,
  setExpenseFormData,
  handleFileChange,
  handleSaveExpense
}) => {
  const handleManualEntry = () => {
    setExpenseFormData({
      date: "",
      amount: "",
      category: "",
      department: "",
      description: "",
    });
    setShowProcessedModal(true);
  };

  // ✅ Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle Enter key when modal is open
      if (showProcessedModal && e.key === 'Enter' && !e.shiftKey) {
        // Don't submit if in textarea (allow new lines with Shift+Enter)
        if (e.target.tagName === 'TEXTAREA') {
          return;
        }
        
        e.preventDefault();
        
        // Check if form is valid
        const isValid = expenseFormData.date && 
                       expenseFormData.amount && 
                       parseFloat(expenseFormData.amount) > 0 && 
                       expenseFormData.category;
        
        if (isValid) {
          handleSaveExpense();
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showProcessedModal, expenseFormData, handleSaveExpense]);

  // ✅ Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSaveExpense();
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#000", marginBottom: "8px" }}>
          Add Expense
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px" }}>
          Upload receipt or enter expense details manually
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Upload Receipt Card */}
        <div style={cardStyle}>
          <h3 style={h3Style}>Upload Receipt</h3>
          <p style={pMuted}>Drag and drop or click to upload</p>

          <div
            style={{
              border: "2px dashed #d1d5db",
              borderRadius: "12px",
              padding: "48px",
              textAlign: "center",
              background: "#f9fafb",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.background = "#eff6ff";
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.background = "#f9fafb";
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.background = "#f9fafb";
              const file = e.dataTransfer.files[0];
              if (file) handleFileChange({ target: { files: [file] } });
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <UploadIcon size={48} color="#9ca3af" style={{ marginBottom: "16px" }} />
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Drop your file here, or click to browse
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Supports: JPG, PNG, PDF (Max 5MB)
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Show captured image or uploaded file */}
          {(selectedFile || capturedImage) && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "#eff6ff",
                borderRadius: "12px",
              }}
            >
              {capturedImage ? (
                <div>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "12px"
                  }}>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: 0 }}>
                      Captured Photo
                    </p>
                    <button
                      onClick={() => {
                        setCapturedImage(null);
                      }}
                      style={{
                        padding: "8px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        borderRadius: "6px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#dbeafe")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <X size={20} color="#6b7280" />
                    </button>
                  </div>
                  <img 
                    src={capturedImage} 
                    alt="Captured receipt" 
                    style={{ 
                      width: "100%", 
                      borderRadius: "8px",
                      maxHeight: "300px",
                      objectFit: "contain"
                    }} 
                  />
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <FileText size={24} color="#3b82f6" />
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: 0 }}>
                        {selectedFile.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    style={{
                      padding: "8px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      borderRadius: "6px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#dbeafe")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <X size={20} color="#6b7280" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Manual Entry Card */}
        <div style={cardStyle}>
          <h3 style={h3Style}>Manual Entry</h3>
          <p style={pMuted}>Add expense without uploading a receipt</p>

          <div
            style={{
              border: "2px dashed #d1d5db",
              borderRadius: "12px",
              padding: "48px",
              textAlign: "center",
              background: "#f9fafb",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px"
            }}
          >
            <PlusCircle size={48} color="#10b981" style={{ marginBottom: "16px" }} />
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>
              Enter expense details manually
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
              No receipt required
            </p>
            <button
              onClick={handleManualEntry}
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                background: "#10b981",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
            >
              <PlusCircle size={18} />
              Add New Expense
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Expense Form Modal with Form Tag */}
      {showProcessedModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={(e) => {
            // Close modal when clicking outside
            if (e.target === e.currentTarget) {
              setShowProcessedModal(false);
              setSelectedFile(null);
              setCapturedImage(null);
            }
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "24px" 
            }}>
              <h3 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
                {capturedImage ? 'Add Details for Captured Photo' : selectedFile ? 'Review Expense Details' : 'Add Expense Details'}
              </h3>
              <button
                onClick={() => {
                  setShowProcessedModal(false);
                  setSelectedFile(null);
                  setCapturedImage(null);
                }}
                style={{
                  padding: "6px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <X size={24} color="#6b7280" />
              </button>
            </div>

            {/* Show captured image preview in modal */}
            {capturedImage && (
              <div style={{ marginBottom: "20px" }}>
                <img 
                  src={capturedImage} 
                  alt="Captured receipt" 
                  style={{ 
                    width: "100%", 
                    borderRadius: "8px",
                    maxHeight: "200px",
                    objectFit: "contain",
                    border: "2px solid #e5e7eb"
                  }} 
                />
              </div>
            )}

            {/* ✅ Form with onSubmit */}
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "14px", 
                  fontWeight: "500", 
                  marginBottom: "8px",
                  color: "#374151"
                }}>
                  Date <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="date"
                  value={expenseFormData.date}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    const date = new Date(selectedDate);
                    const today = new Date();
                    const minDate = new Date('1900-01-01');
                    
                    today.setHours(0, 0, 0, 0);
                    date.setHours(0, 0, 0, 0);
                    
                    if (date >= minDate && date <= today) {
                      setExpenseFormData({ ...expenseFormData, date: selectedDate });
                    }
                  }}
                  min="1900-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: !expenseFormData.date ? "1px solid #ef4444" : "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                  required
                />
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#6b7280"
                }}>
                  <span>Must be between 1900 and today</span>
                  {!expenseFormData.date && (
                    <span style={{ color: "#ef4444", fontWeight: "500" }}>
                      Required field
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "14px", 
                  fontWeight: "500", 
                  marginBottom: "8px",
                  color: "#374151"
                }}>
                  Amount <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={expenseFormData.amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || parseFloat(value) > 0) {
                      setExpenseFormData({ ...expenseFormData, amount: value });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                      e.preventDefault();
                    }
                  }}
                  placeholder="0.00"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: !expenseFormData.amount || parseFloat(expenseFormData.amount) <= 0 ? "1px solid #ef4444" : "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                  required
                />
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#6b7280"
                }}>
                  <span>Must be greater than 0</span>
                  {(!expenseFormData.amount || parseFloat(expenseFormData.amount) <= 0) && (
                    <span style={{ color: "#ef4444", fontWeight: "500" }}>
                      Required field
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "14px", 
                  fontWeight: "500", 
                  marginBottom: "8px",
                  color: "#374151"
                }}>
                  Category <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select
                  value={expenseFormData.category}
                  onChange={(e) => setExpenseFormData({ ...expenseFormData, category: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: expenseFormData.category === "" ? "1px solid #ef4444" : "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                  required
                >
                  <option value="">-- Select category --</option>
                  <option value="Meals">Meals</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Training">Training</option>
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Travel">Travel</option>
                </select>
                {expenseFormData.category === "" && (
                  <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", margin: 0 }}>
                    Please select a category
                  </p>
                )}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "14px", 
                  fontWeight: "500", 
                  marginBottom: "8px",
                  color: "#374151"
                }}>
                  Department (Optional)
                </label>
                <select
                  value={expenseFormData.department || ''}
                  onChange={(e) => setExpenseFormData({ ...expenseFormData, department: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                >
                  <option value="">-- Select Department (optional) --</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="IT Department">IT Department</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
                <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", margin: 0 }}>
                  Optional field - leave empty if not applicable
                </p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Description (Optional)
                </label>
                <textarea
                  value={expenseFormData.description}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 200) {
                      setExpenseFormData({ ...expenseFormData, description: value });
                    }
                  }}
                  placeholder="Add notes about this expense (max 200 characters)"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    resize: "vertical",
                    minHeight: "80px",
                    maxHeight: "150px"
                  }}
                />
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "6px",
                  fontSize: "12px",
                  color: "#6b7280"
                }}>
                  <span>Optional - Use Shift+Enter for new lines</span>
                  <span style={{
                    color: expenseFormData.description.length >= 200 ? "#ef4444" : "#6b7280",
                    fontWeight: expenseFormData.description.length >= 200 ? "600" : "400"
                  }}>
                    {expenseFormData.description.length}/200
                  </span>
                </div>
              </div>

              {/* ✅ Buttons with type attributes */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="submit"
                  disabled={
                    !expenseFormData.date || 
                    !expenseFormData.amount || 
                    parseFloat(expenseFormData.amount) <= 0 ||
                    !expenseFormData.category
                  }
                  style={{
                    flex: 1,
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#6366f1",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: (!expenseFormData.date || !expenseFormData.amount || parseFloat(expenseFormData.amount) <= 0 || !expenseFormData.category) ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    opacity: (!expenseFormData.date || !expenseFormData.amount || parseFloat(expenseFormData.amount) <= 0 || !expenseFormData.category) ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (expenseFormData.date && expenseFormData.amount && parseFloat(expenseFormData.amount) > 0 && expenseFormData.category) {
                      e.currentTarget.style.background = "#4f46e5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#6366f1";
                  }}
                >
                  💾 Save Expense (Enter ↵)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProcessedModal(false);
                    setSelectedFile(null);
                    setCapturedImage(null);
                  }}
                  style={{
                    flex: 1,
                    padding: "10px 20px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "#374151",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  Cancel (Esc)
                </button>
              </div>
            </form>

            {/* Helper Text */}
            <div style={{
              marginTop: "16px",
              padding: "12px",
              background: "#eff6ff",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#1e40af",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ fontSize: "16px" }}>💡</span>
              <span>
                <strong>Tip:</strong> Press <kbd style={{ 
                  padding: "2px 6px", 
                  background: "#fff", 
                  border: "1px solid #cbd5e1",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}>Enter</kbd> to save or <kbd style={{ 
                  padding: "2px 6px", 
                  background: "#fff", 
                  border: "1px solid #cbd5e1",
                  borderRadius: "4px",
                  fontFamily: "monospace"
                }}>Esc</kbd> to cancel
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;