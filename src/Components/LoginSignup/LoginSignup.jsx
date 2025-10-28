import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle, XCircle, X, Mail } from "lucide-react";
import "./LoginSignup.css";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    terms: ""
  });
  const [showRequirements, setShowRequirements] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  // Validation rules for password
  const passwordRules = [
    {
      id: "length",
      test: (pwd) => pwd.length >= 8,
      message: "At least 8 characters",
    },
    {
      id: "uppercase",
      test: (pwd) => /[A-Z]/.test(pwd),
      message: "At least 1 uppercase letter (A-Z)",
    },
    {
      id: "lowercase",
      test: (pwd) => /[a-z]/.test(pwd),
      message: "At least 1 lowercase letter (a-z)",
    },
    {
      id: "number",
      test: (pwd) => /\d/.test(pwd),
      message: "At least 1 number (0-9)",
    },
    {
      id: "special",
      test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(pwd),
      message: "At least 1 special character (!@#$%...)",
    },
    {
      id: "noArabic",
      test: (pwd) => !/[\u0600-\u06FF]/.test(pwd),
      message: "No Arabic characters allowed",
    },
    {
      id: "noSpaces",
      test: (pwd) => !/\s/.test(pwd),
      message: "No spaces allowed",
    },
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (pwd) => {
    return passwordRules.every((rule) => rule.test(pwd));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: "", email: "", password: "", confirmPassword: "", terms: "" };

    if (action === "Sign Up") {
      // Validate Name
      if (!name.trim()) {
        newErrors.name = "Full name is required";
        valid = false;
      }

      // Validate Confirm Password
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        valid = false;
      }

      // Validate Terms
      if (!agreeTerms) {
        newErrors.terms = "You must agree to the terms";
        valid = false;
      }
    }

    // Validate Email
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Validate Password
    if (!validatePassword(password)) {
      newErrors.password = "Password does not meet all requirements";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log(action + " successful!");
      navigate("/dashboard");
    }
  };

  // Generate random 6-digit code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = (e) => {
    e.preventDefault();

    if (!validateEmail(resetEmail)) {
      setResetMessage("Please enter a valid email address");
      return;
    }

    const code = generateVerificationCode();
    setGeneratedCode(code);
    setShowVerification(true);
    setResetMessage(`Verification code sent to ${resetEmail}`);
    console.log("Verification Code:", code);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();

    if (verificationCode === generatedCode) {
      setResetMessage(" Email verified successfully! You can now reset your password.");

      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail("");
        setResetMessage("");
        setVerificationCode("");
        setGeneratedCode("");
        setShowVerification(false);
      }, 3000);
    } else {
      setResetMessage(" Invalid verification code. Please try again.");
    }
  };

  const handleResendCode = () => {
    const code = generateVerificationCode();
    setGeneratedCode(code);
    setVerificationCode("");
    setResetMessage(`New verification code sent to ${resetEmail}`);
    console.log("New Verification Code:", code);

    setTimeout(() => {
      setResetMessage("");
    }, 3000);
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logoContainer}>
            <div style={styles.logo}>S</div>
          </div>

          {/* Title */}
          <h1 style={styles.title}>
            {action === "Login" ? " Smart Expense Management" : "Create Account"}
          </h1>
          <p style={styles.subtitle}>
            {action === "Login" 
              ? "Sign in to your SEMS account" 
              : "Join SEMS to manage your expenses"}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {action === "Sign Up" && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  style={{
                    ...styles.input,
                    borderColor: errors.name ? "#dc2626" : "#e5e7eb",
                  }}
                />
                {errors.name && <span style={styles.errorText}>{errors.name}</span>}
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                placeholder="Example@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                style={{
                  ...styles.input,
                  borderColor: errors.email ? "#dc2626" : "#e5e7eb",
                }}
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  onFocus={() => setShowRequirements(true)}
                  onBlur={() => setTimeout(() => setShowRequirements(false), 200)}
                  style={{
                    ...styles.input,
                    borderColor: errors.password ? "#dc2626" : "#e5e7eb",
                    paddingRight: "45px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#6b7280" />
                  ) : (
                    <Eye size={20} color="#6b7280" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {showRequirements && action === "Sign Up" && (
                <div style={styles.requirementsBox}>
                  <div style={styles.requirementsTitle}>Password Requirements:</div>
                  {passwordRules.map((rule) => {
                    const passed = rule.test(password);
                    return (
                      <div key={rule.id} style={styles.requirement}>
                        {passed ? (
                          <CheckCircle size={14} color="#10b981" />
                        ) : (
                          <XCircle size={14} color="#ef4444" />
                        )}
                        <span style={{ color: passed ? "#10b981" : "#6b7280", fontSize: "11px" }}>
                          {rule.message}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </div>

            {action === "Sign Up" && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }}
                    style={{
                      ...styles.input,
                      borderColor: errors.confirmPassword ? "#dc2626" : "#e5e7eb",
                      paddingRight: "45px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#6b7280" />
                    ) : (
                      <Eye size={20} color="#6b7280" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span style={styles.errorText}>{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {action === "Sign Up" && (
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, terms: "" }));
                  }}
                  style={styles.checkbox}
                />
                <label htmlFor="terms" style={styles.checkboxLabel}>
                  I agree to the{" "}
                  <span style={{ color: "#5b3cff", cursor: "pointer" }}>
                    Terms & Privacy Policy
                  </span>
                </label>
              </div>
            )}
            {errors.terms && <span style={styles.errorText}>{errors.terms}</span>}

            <button type="submit" style={styles.submitButton}>
              {action === "Login" ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            {action === "Login" ? (
              <>
                <span style={styles.footerText}>
                  Already have an account?{" "}
                  <span
                    onClick={() => setShowForgotPassword(true)}
                    style={styles.footerLink}
                  >
                    Lost Password?
                  </span>
                </span>
                <span style={styles.footerText}>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setAction("Sign Up")}
                    style={styles.footerLink}
                  >
                    Sign Up
                  </span>
                </span>
              </>
            ) : (
              <span style={styles.footerText}>
                Already have an account?{" "}
                <span
                  onClick={() => setAction("Login")}
                  style={styles.footerLink}
                >
                  Login
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.header}>
              <h2 style={modalStyles.title}>
                {showVerification ? "Verify Email" : "Reset Password"}
              </h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail("");
                  setResetMessage("");
                  setVerificationCode("");
                  setGeneratedCode("");
                  setShowVerification(false);
                }}
                style={modalStyles.closeButton}
              >
                <X size={24} />
              </button>
            </div>

            {!showVerification ? (
              <>
                <p style={modalStyles.description}>
                  Enter your email address and we'll send you a verification code.
                </p>

                <form onSubmit={handleSendCode} style={modalStyles.form}>
                  <div style={{ position: "relative"}}>
                    <Mail
                      size={18}
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
                      placeholder="Example@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      style={{ ...modalStyles.input, paddingLeft: "40px" }}
                      required
                    />
                  </div>

                  <button type="submit" style={modalStyles.submitButton}>
                    Send Verification Code
                  </button>
                </form>
              </>
            ) : (
              <>
                <p style={modalStyles.description}>
                  We've sent a 6-digit verification code to <strong>{resetEmail}</strong>
                </p>

                <form onSubmit={handleVerifyCode} style={modalStyles.form}>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 6) {
                        setVerificationCode(value);
                      }
                    }}
                    style={{
                      ...modalStyles.input,
                      textAlign: "center",
                      fontSize: "24px",
                      letterSpacing: "8px",
                      fontWeight: "600",
                    }}
                    maxLength={6}
                    required
                  />

                  <button
                    type="submit"
                    style={modalStyles.submitButton}
                    disabled={verificationCode.length !== 6}
                  >
                    Verify Code
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    style={modalStyles.resendButton}
                  >
                    Resend Code
                  </button>
                </form>
              </>
            )}

            {resetMessage && (
              <div
                style={{
                  ...modalStyles.message,
                  color: resetMessage.includes("verified") || resetMessage.includes("sent")
                    ? "#10b981"
                    : "#dc2626",
                  background: resetMessage.includes("verified") || resetMessage.includes("sent")
                    ? "#d1fae5"
                    : "#fee2e2",
                  padding: "10px",
                  borderRadius: "6px",
                  marginTop: "15px",
                }}
              >
                {resetMessage}
              </div>
            )}

            {generatedCode && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  background: "#fef3c7",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#92400e",
                  textAlign: "center",
                }}
              >
                <strong>Demo Mode:</strong> Code is <strong>{generatedCode}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #ffffffff 100%)",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #5b3cff 0%, #01d4a3 100%)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    color: "#1f2937",
    margin: "0 0 8px 0",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center",
  },
  requirementsBox: {
    marginTop: "8px",
    padding: "10px",
    background: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },
  requirementsTitle: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  },
  requirement: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "4px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  checkboxLabel: {
    fontSize: "13px",
    color: "#374151",
    cursor: "pointer",
  },
  submitButton: {
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    background: "#5b3cff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    marginTop: "10px",
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  footerText: {
    fontSize: "14px",
    color: "#6b7280",
  },
  footerLink: {
    color: "#5b3cff",
    fontWeight: "600",
    cursor: "pointer",
  },
  errorText: {
    fontSize: "12px",
    color: "#dc2626",
    marginTop: "4px",
  },
};

const modalStyles = {
  overlay: {
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
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    width: "90%",
    maxWidth: "450px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
  },
  description: {
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
  },
  submitButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#5b3cff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  resendButton: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#5b3cff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  message: {
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "center",
  },
};

export default LoginSignup;
