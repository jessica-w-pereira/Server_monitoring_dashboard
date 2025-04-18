import React, { useState } from 'react';
import AlertSummary from './AlertSummary';
import CPUUsageChart from './CPUUsageChart';
import RAMUsageChart from './RAMUsageChart';
import DiskUsageChart from './DiskUsageChart';
import NetworkTrafficChart from './NetworkTrafficChart';
import ServerList from './ServerList';
import { useServerData } from '../hooks/useServerData';
import { initializeMockData } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { 
    servers, 
    alertSummary, 
    loading, 
    error,
    getCPUChartData,
    getRAMChartData,
    getDiskChartData,
    getAppUsageChartData,
    getFormattedNetworkData
  } = useServerData();
  
  const [initializingData, setInitializingData] = useState(false);
  const [initMessage, setInitMessage] = useState('');
  
  const handleInitMockData = async () => {
    try {
      setInitializingData(true);
      setInitMessage('');
      const response = await initializeMockData();
      setInitMessage(response.message);
      // Reload page after 2 seconds to refresh data
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      setInitMessage(`Error: ${err.message || 'Failed to initialize mock data'}`);
    } finally {
      setInitializingData(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <button onClick={handleInitMockData} disabled={initializingData}>
          {initializingData ? 'Initializing...' : 'Initialize Mock Data'}
        </button>
        {initMessage && <p className="init-message">{initMessage}</p>}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Server Monitoring Dashboard</h1>
        <button onClick={handleInitMockData} disabled={initializingData}>
          {initializingData ? 'Initializing...' : 'Reset Mock Data'}
        </button>
        {initMessage && <p className="init-message">{initMessage}</p>}
      </header>
      
      <div className="dashboard-grid">
        <div className="alert-section">
          <AlertSummary alertSummary={alertSummary} />
        </div>
        
        <div className="usage-charts">
          <div className="chart-row">
            <CPUUsageChart data={getCPUChartData()} />
            <RAMUsageChart data={getRAMChartData()} />
          </div>
          <div className="chart-row">
            <DiskUsageChart data={getDiskChartData()} />
            <div className="chart-container">
              <h2>Application Usage</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={getAppUsageChartData()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Usage %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'App Usage']} />
                  <Legend />
                  <Bar dataKey="usage" fill="#FF8042" name="App Usage %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="network-section">
          <NetworkTrafficChart data={getFormattedNetworkData()} />
        </div>
        
        <div className="server-list-section">
          <ServerList servers={servers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;