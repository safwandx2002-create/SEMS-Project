import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StackedAreaChart = ({ data, height = 400 }) => {
  // Colors for each category
  const colors = {
    Rent: '#6366f1',
    Utilities: '#10b981',
    'Office Supplies': '#f59e0b',
    Equipment: '#8b5cf6',
    Travel: '#ef4444',
    Meals: '#64748b'
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + entry.value, 0);
      
      return (
        <div style={{
          background: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ 
            fontWeight: '600', 
            marginBottom: '8px',
            color: '#1f2937',
            fontSize: '14px'
          }}>
            {label}
          </p>
          <p style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#6366f1',
            marginBottom: '8px',
            paddingBottom: '6px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            Total: ${total.toLocaleString()}
          </p>
          {payload.reverse().map((entry, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: entry.color
                }} />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {entry.name}:
                </span>
              </div>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: '#1f2937'
              }}>
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          {Object.entries(colors).map(([key, color]) => (
            <linearGradient key={key} id={`color${key.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          ))}
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        
        <XAxis 
          dataKey="month" 
          stroke="#6b7280"
          style={{ fontSize: '13px', fontWeight: '500' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        
        <YAxis 
          stroke="#6b7280"
          style={{ fontSize: '13px', fontWeight: '500' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          width={70}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        <Legend 
          wrapperStyle={{
            paddingTop: '20px',
            fontSize: '13px',
            fontWeight: '500'
          }}
          iconType="circle"
        />
        
        {/* Stacked Areas */}
        <Area
          type="monotone"
          dataKey="Rent"
          stackId="1"
          stroke={colors.Rent}
          fill={`url(#colorRent)`}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Utilities"
          stackId="1"
          stroke={colors.Utilities}
          fill={`url(#colorUtilities)`}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Office Supplies"
          stackId="1"
          stroke={colors['Office Supplies']}
          fill={`url(#colorOfficeSupplies)`}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Equipment"
          stackId="1"
          stroke={colors.Equipment}
          fill={`url(#colorEquipment)`}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Travel"
          stackId="1"
          stroke={colors.Travel}
          fill={`url(#colorTravel)`}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Meals"
          stackId="1"
          stroke={colors.Meals}
          fill={`url(#colorMeals)`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaChart;