import axios from 'axios';

const API_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchServers = async () => {
  try {
    const response = await apiClient.get('/servers');
    return response.data;
  } catch (error) {
    console.error('Error fetching servers:', error);
    throw error;
  }
};

export const fetchServerMetrics = async (serverId) => {
  try {
    const response = await apiClient.get(`/metrics/${serverId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching metrics for server ${serverId}:`, error);
    throw error;
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await apiClient.get('/alerts');
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const fetchAlertSummary = async () => {
  try {
    const response = await apiClient.get('/alert-summary');
    return response.data;
  } catch (error) {
    console.error('Error fetching alert summary:', error);
    throw error;
  }
};

export const fetchNetworkData = async (hours = 24) => {
  try {
    const response = await apiClient.get(`/network-data?hours=${hours}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching network data:', error);
    throw error;
  }
};

export const initializeMockData = async () => {
  try {
    const response = await apiClient.post('/init-mock-data');
    return response.data;
  } catch (error) {
    console.error('Error initializing mock data:', error);
    throw error;
  }
};