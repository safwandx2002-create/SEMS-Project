/* ==================== STYLES ==================== */

export const headerStyle = {
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

export const logoBox = {
  width: "44px",
  height: "44px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
};

export const profileBtn = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "8px 16px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  borderRadius: "12px",
  transition: "all 0.2s",
};

export const avatar = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "600",
  fontSize: "14px",
};

export const profileDropdown = {
  position: "absolute",
  top: "60px",
  right: 0,
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  padding: "8px",
  minWidth: "200px",
  zIndex: 1001,
};

export const profileItem = {
  width: "100%",
  padding: "12px 16px",
  border: "none",
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
  transition: "all 0.2s",
};

export const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

export const h3Style = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "8px",
};

export const pMuted = {
  fontSize: "14px",
  color: "#6b7280",
  marginBottom: "24px",
};

export const buttonPrimary = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.2s",
  fontSize: "14px",
};

export const buttonSecondary = {
  padding: "10px 20px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  background: "#fff",
  color: "#374151",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.2s",
  fontSize: "14px",
};

export const statusStyles = {
  approved: {
    background: "#d1fae5",
    color: "#065f46",
  },
  pending: {
    background: "#fef3c7",
    color: "#92400e",
  },
  rejected: {
    background: "#fee2e2",
    color: "#991b1b",
  },
};

// إضافة دالة iconBox
export const iconBox = (bgColor, iconColor) => ({
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  background: bgColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});