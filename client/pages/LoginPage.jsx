import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  setCurrentUser,
  setErrorMessage,
} from '../store/userReducer';

function LoginPage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.userReducer.errorMessage);
  const navigate = useNavigate();

  async function loginUser(username, password) {
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
  
      if (response.status === 200) {
        dispatch(setErrorMessage([]));
        dispatch(setCurrentUser(username));
        navigate('/');
        // getCluster?
      } else {
        dispatch(setErrorMessage(<p>Invalid password or username</p>));
      }
    } catch (error) {
      // Handle any errors during the fetch or processing
      console.error('An error occurred:', error);
    }
  }

  return (
    <div>
      <div className='loginPageDiv'>
        <h1 className='project-name'> Eisodos Log In</h1>

        <div>
          <label htmlFor='username'>Username </label>
          <input type='text' name='username' />
        </div>

        <div>
          <label htmlFor='password'>Password </label>
          <input type='password' name='password' />
        </div>

        {errorMessage}

        <button 
          type='submit' 
          className='login-button' 
          onClick={() => {
            loginUser(
              document.querySelector('#username').value,
              document.querySelector('#password').value
            );
          }}> 
          Login
        </button>

        <div>
          <Link to='/register'>
            <p>Not a member? Sign up here</p>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default LoginPage; 