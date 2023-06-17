import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate(); //throwing an error in test?

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event: React.MouseEvent, username: string, password: string) {
    event.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.status === 200) {
        // TODO: change this to response.ok?
        navigate('/dashboard'); // TODO: change this to ':username/dashboard' later
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <form>
        <label htmlFor="loginUsername">Username:</label>
        <input id="loginUsername" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="loginPassword">Password:</label>
        <input id="loginPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="submitButton" onClick={(e) => loginUser(e, username, password)}>
          Log In
        </button>
      </form>
      <Link to="/register">Don&apos;t have an account? Register here</Link>
    </div>
  );
};

export default LoginPage;
