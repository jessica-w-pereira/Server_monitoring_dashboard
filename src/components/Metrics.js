// src/components/Metrics.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const data = [
    { name: '1', cpu: 40, memory: 24 },
    { name: '2', cpu: 30, memory: 13 },
    { name: '3', cpu: 20, memory: 98 },
    { name: '4', cpu: 27, memory: 39 },
    { name: '5', cpu: 18, memory: 48 },
];

const Metrics = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Server Metrics</Typography>
                <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
                    <Line type="monotone" dataKey="memory" stroke="#82ca9d" />
                </LineChart>
            </CardContent>
        </Card>
    );
};

export default Metrics;