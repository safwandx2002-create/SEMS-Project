import React, { useState, useMemo } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, XCircle, Filter, Search, Trash2, Check, X, CheckCheck } from 'lucide-react';
import { cardStyle, h3Style, pMuted, buttonPrimary, buttonSecondary } from '../styles/styles';

const Alerts = ({ alerts = [], onMarkAsRead, onMarkAllAsRead, onDeleteAlert, onClearAll }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Alert Type Configuration
  const alertConfig = {
    warning: {
      icon: AlertTriangle,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      textColor: '#d97706',
      label: 'Warning'
    },
    success: {
      icon: CheckCircle,
      color: '#10b981',
      bgColor: '#d1fae5',
      textColor: '#059669',
      label: 'Success'
    },
    error: {
      icon: XCircle,
      color: '#ef4444',
      bgColor: '#fee2e2',
      textColor: '#dc2626',
      label: 'Error'
    },
    info: {
      icon: Info,
      color: '#3b82f6',
      bgColor: '#dbeafe',
      textColor: '#2563eb',
      label: 'Info'
    }
  };

  // Calculate Alert Statistics
  const stats = useMemo(() => {
    const unreadCount = alerts.filter(alert => !alert.read).length;
    const warningCount = alerts.filter(alert => alert.type === 'warning').length;
    const errorCount = alerts.filter(alert => alert.type === 'error').length;

    return {
      total: alerts.length,
      unread: unreadCount,
      warnings: warningCount,
      errors: errorCount
    };
  }, [alerts]);

  // Filter and Search Alerts
  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(alert => {
        if (filterType === 'unread') return !alert.read;
        return alert.type === filterType;
      });
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(alert =>
        alert.message.toLowerCase().includes(query) ||
        alert.description?.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return filtered;
  }, [alerts, filterType, searchQuery]);

  // Format Date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle Mark as Read
  const handleMarkAsRead = (alertId) => {
    if (onMarkAsRead) {
      onMarkAsRead(alertId);
    }
  };

  // Handle Mark All as Read
  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  // Handle Delete
  const handleDelete = (alertId) => {
    if (onDeleteAlert) {
      onDeleteAlert(alertId);
    }
  };

  // Handle Clear All
  const handleClearAll = () => {
    if (onClearAll && window.confirm('Are you sure you want to clear all alerts?')) {
      onClearAll();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#000", marginBottom: "8px" }}>
            Alerts & Notifications
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Stay updated with important system notifications
          </p>
        </div>
        {alerts.length > 0 && (
          <div style={{ display: "flex", gap: "12px" }}>
            {stats.unread > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  ...buttonPrimary,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <CheckCheck size={16} />
                Mark All as Read
              </button>
            )}
            <button
              onClick={handleClearAll}
              style={{
                ...buttonSecondary,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" }}>
        <div style={{ ...cardStyle, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <Bell size={20} color="#6366f1" />
            <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Total Alerts</span>
          </div>
          <p style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            {stats.total}
          </p>
        </div>

        <div style={{ ...cardStyle, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <Info size={20} color="#3b82f6" />
            <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Unread</span>
          </div>
          <p style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            {stats.unread}
          </p>
        </div>

        <div style={{ ...cardStyle, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <AlertTriangle size={20} color="#f59e0b" />
            <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Warnings</span>
          </div>
          <p style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            {stats.warnings}
          </p>
        </div>

        <div style={{ ...cardStyle, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <XCircle size={20} color="#ef4444" />
            <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Errors</span>
          </div>
          <p style={{ fontSize: "32px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            {stats.errors}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "24px" }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={18} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          {/* Filter */}
          <div style={{ position: "relative" }}>
            <Filter size={18} color="#9ca3af" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                background: "#fff",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center"
              }}
            >
              <option value="all">All Alerts</option>
              <option value="unread">Unread</option>
              <option value="warning">Warnings</option>
              <option value="error">Errors</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        {filteredAlerts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <Bell size={48} color="#d1d5db" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#6b7280", marginBottom: "8px" }}>
              {alerts.length === 0 ? 'No alerts yet' : 'No alerts found'}
            </h3>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>
              {alerts.length === 0
                ? 'All system notifications will appear here'
                : 'Try adjusting your search or filter criteria'}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredAlerts.map((alert) => {
              const config = alertConfig[alert.type] || alertConfig.info;
              const Icon = config.icon;

              return (
                <div
                  key={alert.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "16px",
                    background: alert.read ? "#fff" : "#f9fafb",
                    border: `1px solid ${alert.read ? "#e5e7eb" : config.color}20`,
                    borderRadius: "12px",
                    transition: "all 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.borderColor = config.color + "40";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = alert.read ? "#fff" : "#f9fafb";
                    e.currentTarget.style.borderColor = alert.read ? "#e5e7eb" : config.color + "20";
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: config.bgColor,
                      borderRadius: "10px"
                    }}
                  >
                    <Icon size={20} color={config.textColor} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937", margin: 0 }}>
                        {alert.message}
                      </h4>
                      {!alert.read && (
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            background: "#6366f1",
                            borderRadius: "50%",
                            flexShrink: 0
                          }}
                        />
                      )}
                    </div>
                    {alert.description && (
                      <p style={{ fontSize: "14px", color: "#6b7280", margin: "4px 0 8px 0", lineHeight: "1.5" }}>
                        {alert.description}
                      </p>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: config.textColor,
                          background: config.bgColor,
                          padding: "4px 8px",
                          borderRadius: "6px"
                        }}
                      >
                        {config.label}
                      </span>
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                        {formatDate(alert.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    {!alert.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(alert.id);
                        }}
                        style={{
                          padding: "8px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          background: "#fff",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f0fdf4";
                          e.currentTarget.style.borderColor = "#10b981";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#fff";
                          e.currentTarget.style.borderColor = "#e5e7eb";
                        }}
                        title="Mark as read"
                      >
                        <Check size={16} color="#10b981" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(alert.id);
                      }}
                      style={{
                        padding: "8px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        background: "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fef2f2";
                        e.currentTarget.style.borderColor = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.borderColor = "#e5e7eb";
                      }}
                      title="Delete"
                    >
                      <X size={16} color="#ef4444" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;