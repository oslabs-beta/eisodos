import React from 'react';
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

function LoginPage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.userReducer.errorMessage);
  const navigate = useNavigate();

  async function loginUser(username: string, password: string) {
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
      } else {
        dispatch(setErrorMessage(<p>Invalid password or username</p>));
      }
    } catch (error) {
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
              (document.querySelector('#username') as HTMLInputElement).value,
              (document.querySelector('#password') as HTMLInputElement).value
            );
          }}> 
          Login
        </button>

        <div>
          <Link to='/api/users/register'>
            <p>Not a member? Sign up here</p>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;

