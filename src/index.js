import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional CSS file if you want global styles
import App from './App'; // Make sure this path points to your App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This ensures React renders inside the div with id="root"
);
