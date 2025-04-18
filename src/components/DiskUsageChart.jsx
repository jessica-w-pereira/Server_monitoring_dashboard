import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const DiskUsageChart = ({ data }) => {
  const formatData = data.map(item => ({
    name: item.name,
    value: item.usage,
  }));

  return (
    <div>
      <h2>Disk Usage</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formatData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
          >
            {formatData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'Disk Usage']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiskUsageChart;
