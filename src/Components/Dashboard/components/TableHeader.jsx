import React from 'react';

const TableHeader = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr 1fr 1.5fr 1fr",
      padding: "12px 0",
      borderBottom: "2px solid #e5e7eb",
      fontWeight: "600",
      fontSize: "14px",
      color: "#6b7280",
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

export default TableHeader;