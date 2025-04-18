import React from 'react';

const AlertSummary = ({ alertSummary }) => {
  return (
    <div>
      <h2>Alert Summary</h2>
      <ul>
        <li><strong>Critical:</strong> {alertSummary.critical}</li>
        <li><strong>Medium:</strong> {alertSummary.medium}</li>
        <li><strong>Low:</strong> {alertSummary.low}</li>
      </ul>
    </div>
  );
};

export default AlertSummary;
