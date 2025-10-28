import React from 'react';

const BudgetBar = ({ name, used, total, color }) => {
  const percentage = ((used / total) * 100).toFixed(1);
  
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
          {name}
        </span>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>
          ${used.toFixed(2)} / ${total}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "8px",
          background: "#f3f4f6",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: color,
            borderRadius: "4px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
        {percentage}% used
      </p>
    </div>
  );
};

export default BudgetBar;