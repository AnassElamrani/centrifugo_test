import React, { useEffect, useState } from 'react';
import { Centrifuge } from 'centrifuge'; // Correctly import Centrifuge

const App = () => {
  const [tableData, setTableData] = useState([{ id: 1, name: 'John Doe', age: 30 }]);

  useEffect(() => {
    // Initialize Centrifuge client and connect to WebSocket
    const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket');

    console.log('centrifuge', centrifuge);

    centrifuge.on('connect', () => {
      console.log('Connected to Centrifugo');
    });

    centrifuge.on('disconnect', (ctx) => {
      console.log('Disconnected from Centrifugo:', ctx);
    });

    // Subscribe to the 'updates' channel
    const subscription = centrifuge.newSubscription('updates');

    // Log events when receiving data from the 'updates' channel
    subscription.on('publication', (message) => {
      console.log('Received data:', message.data); // Log the data to the console
      setTableData((prevData) => [...prevData, message.data]); // Update state with new data
    });

    subscription.on('error', (ctx) => {
      console.error('Subscription error:', ctx);
    });

    subscription.subscribe();

    centrifuge.connect();

    // Clean up when component unmounts
    return () => {
      centrifuge.disconnect();
    };
  }, []);


  return (
    <div style={{ padding: '20px' }}>
      <h1>Real-time Data Table</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;