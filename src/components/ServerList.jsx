import React from 'react';

const ServerList = ({ servers }) => {
  return (
    <div>
      <h2>Server List</h2>
      <table>
        <thead>
          <tr>
            <th>Hostname</th>
            <th>IP Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.id} className={server.status === 'offline' ? 'offline' : ''}>
              <td>{server.hostname}</td>
              <td>{server.ip_address}</td>
              <td>{server.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServerList;
