import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Navigate } from 'react-router-dom';

const LoginForm = ({ onLogin,tokenn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        onLogin(token);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Error occurred during login');
    }
  };

  return (
    <div className='container'>
        {
            tokenn !== '' && <Navigate to="/dashboard" />
        }
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
    </div>
  );
};

export default LoginForm;