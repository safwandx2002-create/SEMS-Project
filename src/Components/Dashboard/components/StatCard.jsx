import React from 'react';

const StatCard = ({ label, value, Icon, iconColor, children }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "16px",
      }}
    >
      <div>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
          {label}
        </p>
        <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
          {value}
        </h3>
      </div>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: `${iconColor}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={24} color={iconColor} />
      </div>
    </div>
    {children}
  </div>
);

export default StatCard;