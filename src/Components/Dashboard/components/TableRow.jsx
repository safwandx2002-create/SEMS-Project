import React from 'react';
import { CheckCircle, CircleX } from 'lucide-react';
import { statusStyles } from '../styles/styles';

const TableRow = ({ date, desc, cat, amount, status, receipt, statusIcon, onApprove, onReject }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr 1fr 1.5fr 1fr",
      padding: "12px 0",
      borderBottom: "1px solid #f1f5f9",
      alignItems: "center",
    }}
  >
    <span style={{ fontSize: "14px", color: "#374151" }}>{date}</span>
    <span style={{ fontSize: "14px", color: "#374151" }}>{desc}</span>
    <span style={{ fontSize: "14px", color: "#6b7280" }}>{cat}</span>
    <span style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>
      ${typeof amount === 'number' ? amount.toFixed(2) : parseFloat(amount || 0).toFixed(2)}
    </span>
    
    {/* Status with Action Buttons */}
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {status === "pending" ? (
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={() => onApprove(receipt)}
            style={{
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              background: "#10b981",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#059669"}
            onMouseLeave={(e) => e.target.style.background = "#10b981"}
          >
            <CheckCircle size={14} />
            Approve
          </button>
          <button
            onClick={() => onReject(receipt)}
            style={{
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              background: "#ef4444",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#dc2626"}
            onMouseLeave={(e) => e.target.style.background = "#ef4444"}
          >
            <CircleX size={14} />
            Reject
          </button>
        </div>
      ) : (
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "12px",
            ...statusStyles[status]
          }}
        >
          {statusIcon}
          <span style={{ 
            fontSize: "13px", 
            fontWeight: "600",
            textTransform: "capitalize"
          }}>
            {status}
          </span>
        </div>
      )}
    </div>
    
    <span style={{ fontSize: "14px", color: "#6b7280", fontFamily: "monospace" }}>
      {receipt}
    </span>
  </div>
);

export default TableRow;