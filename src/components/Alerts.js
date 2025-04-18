// src/components/Alerts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, List, ListItem, CircularProgress } from '@mui/material';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAlerts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/alerts'); // Adjust the endpoint as needed
            setAlerts(response.data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Alerts</Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {alerts.map((alert) => (
                            <ListItem key={alert.id}>
                                {alert.level}: {alert.message}
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default Alerts;