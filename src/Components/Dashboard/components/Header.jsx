import React from 'react';
import { User, LogOut } from 'lucide-react';

const Header = ({ showProfile, setShowProfile }) => {
  const handleLogout = () => {
    window.location.href = '/';
  };

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
    width: "44px",
    height: "44px",
    background: "linear-gradient(135deg, #5b3cff 0%, #01d4a3 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(91, 159, 216, 0.3)",
  };

  const profileBtn = {
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

  const avatar = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#45ce95ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
  };

  const profileDropdown = {
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

  const profileItem = {
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

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={logoBox}>
          <span style={{ fontSize: "24px", fontWeight: "700", color: "#fff" }}>S</span>
        </div>
        <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937", margin: 0 }}>SEMS</h1>
      </div>

      <div style={{ position: "relative" }}>
        <button
          style={profileBtn}
          onClick={() => setShowProfile(!showProfile)}
          onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <div style={avatar}>
            <User size={20} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>Safwan ALKhazaleh</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Admin</div>
          </div>
        </button>

        {showProfile && (
          <div style={profileDropdown}>
            <button
              style={{ ...profileItem, color: "#dc2626" }}
              onClick={handleLogout}
              onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;