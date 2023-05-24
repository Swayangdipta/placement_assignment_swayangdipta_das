import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate,Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import TaskDashboard from './TaskDashboard';
import './App.css';

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
    <Navigate to="/dashboard" />
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} tokenn={token} />} />
        <Route path="/dashboard" element={<TaskDashboard token={token} />} />
      </Routes>

    </Router>
  );
};

export default App;
