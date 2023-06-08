import React, { useState } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event: React.MouseEvent, username: string, password: string) {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      
      if (response.ok) {
        navigate('/dashboard'); // TODO: change this to ':username/:my-cluster' once ConnectClusterPage is done
        setUsername('');
        setPassword('');
      }
      else {
        console.log('Sign up request failed:', response);
      }
    }
    catch (error) {
      console.log('Error occurred while making sign up request:', error);
    }
  }

  return (
    <div>
      <Link to='/'>Home</Link>
      <form>
        <label>Username:</label>
        <input 
          id='loginUsername'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input 
          id='loginPassword'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button 
          type='submit'
          className='submitButton'
          onClick={(e) => registerUser(e, username, password)}
        >Register</button>
      </form>
      <Link to='/login'>Already have an account? Login here</Link>
    </div>
  );
};

export default RegisterPage;