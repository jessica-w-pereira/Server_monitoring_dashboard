import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const NetworkTrafficChart = ({ data }) => {
  return (
    <div>
      <h2>Network Traffic</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value.toFixed(2)} MBps`, 'Network Traffic']} />
          <Legend />
          <Line type="monotone" dataKey="traffic" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetworkTrafficChart;
