import { useState, useEffect } from 'react';
import { 
  fetchServers, 
  fetchAlertSummary, 
  fetchNetworkData, 
  fetchServerMetrics 
} from '../services/api';

export const useServerData = () => {
  const [servers, setServers] = useState([]);
  const [alertSummary, setAlertSummary] = useState({ critical: 0, medium: 0, low: 0 });
  const [networkData, setNetworkData] = useState([]);
  const [serverMetrics, setServerMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [serversData, alertSummaryData, networkTrafficData] = await Promise.all([
          fetchServers(),
          fetchAlertSummary(),
          fetchNetworkData(24)
        ]);
        
        setServers(serversData);
        setAlertSummary(alertSummaryData);
        setNetworkData(networkTrafficData);
        
        // Fetch metrics for each server
        const metricsPromises = serversData.map(server => fetchServerMetrics(server.id));
        const allMetrics = await Promise.all(metricsPromises);
        
        // Create a map of server ID to its metrics
        const metricsMap = {};
        serversData.forEach((server, index) => {
          metricsMap[server.id] = allMetrics[index];
        });
        
        setServerMetrics(metricsMap);
        
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
        console.error('Error fetching server data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up polling to refresh data every 60 seconds
    const intervalId = setInterval(fetchData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Process metrics to get the latest values
  const getLatestMetrics = (serverId) => {
    if (!serverMetrics[serverId] || serverMetrics[serverId].length === 0) {
      return null;
    }
    
    // Return the most recent metric (should be first if sorted by timestamp desc)
    return serverMetrics[serverId][0];
  };
  
  // Prepare data for charts
  const getCPUChartData = () => {
    return servers.map(server => {
      const latestMetric = getLatestMetrics(server.id);
      return {
        name: server.hostname,
        usage: latestMetric ? latestMetric.cpu_usage : 0
      };
    });
  };
  
  const getRAMChartData = () => {
    return servers.map(server => {
      const latestMetric = getLatestMetrics(server.id);
      return {
        name: server.hostname,
        usage: latestMetric ? latestMetric.ram_usage : 0
      };
    });
  };
  
  const getDiskChartData = () => {
    return servers.map(server => {
      const latestMetric = getLatestMetrics(server.id);
      return {
        name: server.hostname,
        usage: latestMetric ? latestMetric.disk_usage : 0
      };
    });
  };
  
  const getAppUsageChartData = () => {
    return servers.map(server => {
      const latestMetric = getLatestMetrics(server.id);
      return {
        name: server.hostname,
        usage: latestMetric ? latestMetric.app_usage : 0
      };
    });
  };
  
  // Format network data for the chart
  const getFormattedNetworkData = () => {
    // Group by hour and combine traffic from all servers
    const hourlyData = {};
    
    networkData.forEach(item => {
      const hour = new Date(item.timestamp).getHours();
      if (!hourlyData[hour]) {
        hourlyData[hour] = {
          hour: `${hour}:00`,
          traffic: 0
        };
      }
      hourlyData[hour].traffic += item.traffic;
    });
    
    // Convert to array and sort by hour
    return Object.values(hourlyData).sort((a, b) => {
      const hourA = parseInt(a.hour);
      const hourB = parseInt(b.hour);
      return hourA - hourB;
    });
  };
  
  return {
    servers,
    alertSummary,
    loading,
    error,
    getCPUChartData,
    getRAMChartData,
    getDiskChartData,
    getAppUsageChartData,
    getFormattedNetworkData
  };
};