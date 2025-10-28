import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Upload, 
  Camera, 
  BarChart3, 
  Bell, 
  MessageSquare 
} from 'lucide-react';

const Sidebar = ({ activeItem, setActiveItem, navItems }) => {
  const icons = {
    "My Expenses": <Receipt size={20} />,
    "Data Overview": <LayoutDashboard size={20} />,
    "Upload": <Upload size={20} />,
    "Camera": <Camera size={20} />,
    "Reports": <BarChart3 size={20} />,
    "Alerts": <Bell size={20} />,
    "AI Assistant": <MessageSquare size={20} />,
  };

  return (
    <aside
      style={{
        width: "280px",
        background: "#fff",
        borderRadius: "16px",
        padding: "16px",
        height: "fit-content",
        position: "sticky",
        top: "94px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ fontSize: "12px", fontWeight: "600", color: "#9ca3af", marginBottom: "12px" }}>
        MAIN MENU
      </div>
      {navItems.map((item) => (
        <button
          key={item}
          onClick={() => setActiveItem(item)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "none",
            background: activeItem === item ? "#6366f1" : "transparent",
            color: activeItem === item ? "#fff" : "#6b7280",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "4px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: "500",
            fontSize: "14px",
            transition: "all 0.2s",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            if (activeItem !== item) e.currentTarget.style.background = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            if (activeItem !== item) e.currentTarget.style.background = "transparent";
          }}
        >
          {icons[item]}
          {item}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;