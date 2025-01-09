import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', { username, password });
      setMessage('User registered successfully!');
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setToken(response.data.token);
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  const accessFeature1 = async () => {
    try {
      const response = await axios.get('http://localhost:4000/feature1', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(`Feature 1: ${response.data.message}`);
    } catch (error) {
      setMessage('Access to Feature 1 failed.');
    }
  };

  const accessFeature2 = async () => {
    try {
      const response = await axios.get('http://localhost:4000/feature2', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(`Feature 2: ${response.data.message}`);
    } catch (error) {
      setMessage('Access to Feature 2 failed.');
    }
  };

  return (
    <div className="App">
      <h1>Microservices Demo</h1>

      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>

      <div>
        <h2>Features</h2>
        <button onClick={accessFeature1}>Access Feature 1</button>
        <button onClick={accessFeature2}>Access Feature 2</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
