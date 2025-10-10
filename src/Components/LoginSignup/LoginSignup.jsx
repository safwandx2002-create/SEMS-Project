import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function isValidEmail(email) {
  return /^[\w.-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/i.test(email);
}

const LoginSignup = () => {
  const navigate = useNavigate();
  
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (action === "signup" && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email (gmail, hotmail, yahoo)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (action === "signup" && !formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (
      action === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (action === "signup" && !agreeToTerms) {
      newErrors.terms = "You must agree to the Terms & Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (action === "login") {
        
        navigate("/dashboard");
      } else {
        setAction("login");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setAgreeToTerms(false);
        alert("Account created successfully! Please login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAction = () => {
    setAction(action === "login" ? "signup" : "login");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setAgreeToTerms(false);
  };

  const handleForgotClick = () => {
    setShowForgot(true);
    setForgotStep(1);
    setForgotEmail("");
    setInputCode(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmNewPassword("");
    setSuccessMsg("");
    setForgotError("");
  };

  const handleForgotEmail = (e) => {
    e.preventDefault();
    setForgotError("");
    setSuccessMsg("");

    if (!forgotEmail.trim()) {
      setForgotError("Please enter your email address");
      return;
    }

    if (!isValidEmail(forgotEmail)) {
      setForgotError("Please enter a valid email (gmail, hotmail, yahoo)");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    
    setSuccessMsg(`Verification code sent to ${forgotEmail}`);
    console.log("Verification Code:", code);
    
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      setForgotStep(2);
      setSuccessMsg("");
    }, 2000);
  };

  const handleCodeInput = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...inputCode];
    newCode[index] = value;
    setInputCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !inputCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setForgotError("");
    setSuccessMsg("");

    const enteredCode = inputCode.join("");
    
    if (enteredCode.length !== 6) {
      setForgotError("Please enter the complete 6-digit code");
      return;
    }

    if (enteredCode !== verificationCode) {
      setForgotError("Invalid verification code. Please try again.");
      setInputCode(["", "", "", "", "", ""]);
      document.getElementById("code-0")?.focus();
      return;
    }

    setSuccessMsg("Code verified successfully!");
    setTimeout(() => {
      setForgotStep(3);
      setSuccessMsg("");
    }, 1500);
  };

  const handleResendCode = () => {
    if (resendTimer > 0) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    console.log("New Verification Code:", code);
    
    setSuccessMsg("New code sent to your email!");
    setInputCode(["", "", "", "", "", ""]);
    
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setForgotError("");
    setSuccessMsg("");

    if (newPassword.length < 6) {
      setForgotError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setForgotError("Passwords do not match");
      return;
    }

    setSuccessMsg("Password reset successfully!");
    
    setTimeout(() => {
      setShowForgot(false);
      setForgotStep(1);
      setForgotEmail("");
      setInputCode(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmNewPassword("");
      setSuccessMsg("");
      alert("Password reset successful! Please login with your new password.");
    }, 2000);
  };

  const closeForgotModal = () => {
    setShowForgot(false);
    setForgotStep(1);
    setForgotEmail("");
    setInputCode(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmNewPassword("");
    setSuccessMsg("");
    setForgotError("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px auto",
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          padding: "48px 40px",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #0077ffff 0%, #01a365ff 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              S
            </span>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1f2937",
              margin: "0 0 8px 0",
            }}
          >
            {action === "login" ? "Smart Expense Management" : "Create Account"}
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: 0,
            }}
          >
            {action === "login"
              ? "Sign in to your SEMS account"
              : "Join SEMS to manage your expenses"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {action === "signup" && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  marginBottom: "6px",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  height: "48px",
                  background: "#f9fafb",
                  border: `1px solid ${errors.name ? "#ef4444" : "#d1d5db"}`,
                  borderRadius: "8px",
                  color: "#111827",
                  fontSize: "14px",
                  padding: "0 16px",
                  transition: "all 0.2s ease",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {errors.name && (
                <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                  {errors.name}
                </span>
              )}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Example@email.com"
              style={{
                width: "100%",
                height: "48px",
                background: "#f9fafb",
                border: `1px solid ${errors.email ? "#ef4444" : "#d1d5db"}`,
                borderRadius: "8px",
                color: "#111827",
                fontSize: "14px",
                padding: "0 16px",
                transition: "all 0.2s ease",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {errors.email && (
              <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                {errors.email}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  height: "48px",
                  background: "#f9fafb",
                  border: `1px solid ${errors.password ? "#ef4444" : "#d1d5db"}`,
                  borderRadius: "8px",
                  color: "#111827",
                  fontSize: "14px",
                  padding: "0 16px",
                  transition: "all 0.2s ease",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                {errors.password}
              </span>
            )}
          </div>

          {action === "signup" && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  marginBottom: "6px",
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  style={{
                    width: "100%",
                    height: "48px",
                    background: "#f9fafb",
                    border: `1px solid ${
                      errors.confirmPassword ? "#ef4444" : "#d1d5db"
                    }`,
                    borderRadius: "8px",
                    color: "#111827",
                    fontSize: "14px",
                    padding: "0 16px",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6b7280",
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {action === "signup" && (
            <div style={{ marginTop: "8px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: "" }));
                    }
                  }}
                  style={{
                    marginRight: "8px",
                    accentColor: "#6366f1",
                  }}
                />
                I agree to the{" "}
                <span style={{ color: "#6366f1", textDecoration: "underline", marginLeft: "4px" }}>
                  Terms & Privacy Policy
                </span>
              </label>
              {errors.terms && (
                <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                  {errors.terms}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "48px",
              background: loading ? "#9ca3af" : "#6366f1",
              border: "none",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              marginTop: "8px",
            }}
          >
            {loading ? "Processing..." : action === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          {action === "login" && (
            <button
              onClick={handleForgotClick}
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                fontSize: "14px",
                cursor: "pointer",
                marginBottom: "16px",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </button>
          )}
          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            {action === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleAction}
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                fontWeight: "500",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              {action === "login" ? "Create Account" : "Login"}
            </button>
          </div>
        </div>
      </div>

      {showForgot && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={closeForgotModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              maxWidth: "450px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                padding: "24px",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                position: "relative",
              }}
            >
              <button
                onClick={closeForgotModal}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                ×
              </button>
              <h3 style={{ color: "#fff", margin: 0, fontSize: "20px", fontWeight: "600" }}>
                {forgotStep === 1 && "Reset Your Password"}
                {forgotStep === 2 && "Verify Your Email"}
                {forgotStep === 3 && "Create New Password"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.9)", margin: "8px 0 0 0", fontSize: "14px" }}>
                {forgotStep === 1 && "Enter your email to receive a verification code"}
                {forgotStep === 2 && "Enter the 6-digit code sent to your email"}
                {forgotStep === 3 && "Enter your new password"}
              </p>
            </div>

            <div style={{ padding: "32px 24px" }}>
              {successMsg && (
                <div
                  style={{
                    background: "#d4edda",
                    border: "1px solid #c3e6cb",
                    color: "#155724",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                  }}
                >
                  <CheckCircle size={18} />
                  {successMsg}
                </div>
              )}

              {forgotError && (
                <div
                  style={{
                    background: "#f8d7da",
                    border: "1px solid #f5c6cb",
                    color: "#721c24",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                  }}
                >
                  <AlertCircle size={18} />
                  {forgotError}
                </div>
              )}

              {forgotStep === 1 && (
                <form onSubmit={handleForgotEmail}>
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        color: "#374151",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Email Address
                    </label>
                    <div style={{ position: "relative" }}>
                      <Mail
                        size={20}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#6b7280",
                        }}
                      />
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        style={{
                          width: "100%",
                          height: "48px",
                          paddingLeft: "44px",
                          paddingRight: "16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          outline: "none",
                          transition: "all 0.2s",
                          boxSizing: "border-box",
                        }}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      height: "48px",
                      background: "#6366f1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Send Verification Code
                  </button>
                </form>
              )}

              {forgotStep === 2 && (
                <form onSubmit={handleVerifyCode}>
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "16px",
                        color: "#374151",
                        fontWeight: "500",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      Enter Verification Code
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      {inputCode.map((digit, index) => (
                        <input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleCodeInput(index, e.target.value)}
                          onKeyDown={(e) => handleCodeKeyDown(index, e)}
                          style={{
                            width: "48px",
                            height: "56px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                            border: "2px solid #d1d5db",
                            borderRadius: "8px",
                            outline: "none",
                            transition: "all 0.2s",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      height: "48px",
                      background: "#6366f1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      marginBottom: "16px",
                    }}
                  >
                    Verify Code
                  </button>

                  <div style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={resendTimer > 0}
                      style={{
                        background: "none",
                        border: "none",
                        color: resendTimer > 0 ? "#9ca3af" : "#6366f1",
                        fontWeight: "600",
                        cursor: resendTimer > 0 ? "not-allowed" : "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                    </button>
                  </div>
                </form>
              )}

              {forgotStep === 3 && (
                <form onSubmit={handleResetPassword}>
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        color: "#374151",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      New Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock
                        size={20}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#6b7280",
                        }}
                      />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          width: "100%",
                          height: "48px",
                          paddingLeft: "44px",
                          paddingRight: "44px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          outline: "none",
                          transition: "all 0.2s",
                          boxSizing: "border-box",
                        }}
                        required
                      />
                      <span
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#6b7280",
                        }}
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        color: "#374151",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Confirm New Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock
                        size={20}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#6b7280",
                        }}
                      />
                      <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        style={{
                          width: "100%",
                          height: "48px",
                          paddingLeft: "44px",
                          paddingRight: "44px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          outline: "none",
                          transition: "all 0.2s",
                          boxSizing: "border-box",
                        }}
                        required
                      />
                      <span
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#6b7280",
                        }}
                      >
                        {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      height: "48px",
                      background: "#6366f1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Reset Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;