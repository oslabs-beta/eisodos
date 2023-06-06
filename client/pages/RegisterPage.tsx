import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  setCurrentUser,
  setErrorMessage,
} from '../store/userReducer';

interface RootState {
  userReducer: {
    errorMessage: React.ReactNode;
  };
}

function SignUpPage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.userReducer.errorMessage);
  const navigate = useNavigate();

  async function signUpUser(username: string, password: string) {
    if (!username || !password) {
      dispatch(
        setErrorMessage(
          <p>You have some incomplete fields, please complete form</p>
        )
      );
    } else {
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
          dispatch(setCurrentUser(username));
          navigate('/');
        } else {
          console.log('Sign up request failed:', response);
        }
      } catch (error) {
        console.log('Error occurred while making sign up request:', error);
      }
    }
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage}

      <div>
        <button
          onClick={() => signUpUser(username, password)}
        >
          Sign Up
        </button>
      </div>

      {/* <GithubOAuth /> */}

      <div>
        <p>Already a member?</p>
        <Link to="/api/users/login">
          <button>Login</button>
        </Link>
      </div>

    </div>
  );
}

export default SignUpPage;
