import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate,  } from 'react-router-dom';
import { setErrorMessage } from '../features/slices/errorSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e: React.MouseEvent, username: string, password: string) {
    
    e.preventDefault();
    
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log(await response);
      if (response.status === 200) {
        
        // need to navigate to dashboard
        navigate('/dashboard'); // TODO: change this to ':username/dashboard' later
      } else {
        dispatch(setErrorMessage('Invalid Username or Password.'));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div>
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
          onClick={(e) => { loginUser(e, username, password); }}
        >Log in </button>
        {/* <p> {setErrorMessage} </p> */}
        <Link to='/register'>Dont have an account? Signup Here</Link>
      </form>
    </div>
  );
};

export default LoginPage;