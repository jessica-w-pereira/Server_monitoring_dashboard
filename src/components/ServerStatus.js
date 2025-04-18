// src/components/ServerStatus.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';

const ServerStatus = () => {
    const [status, setStatus] = useState('Loading...');
    const [loading, setLoading] = useState(true);

    const fetchStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/servers'); // Adjust the endpoint as needed
            setStatus(response.data[0].status); // Assuming the response is an array of server objects
        } catch (error) {
            console.error('Error fetching server status:', error);
            setStatus('Error fetching status');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Server Status</Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Typography variant="h6">{status}</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default ServerStatus;