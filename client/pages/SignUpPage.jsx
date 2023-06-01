import React from 'react';
import GithubOAuth from '../components/githubOAuth';
import { useDispatch, useSelector } from 'react-redux'; // react redux hooks
import { Link, useNavigate } from 'react-router-dom'; // specifically for rerouting you
import {
  setCurrentUser,
  setErrorMessage,
} from '../store/userReducer';

function SignUpPage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => {
    state.userReducer.errorMessage;
  });

  const navigate = useNavigate();

  async function signUpUser(username, password) {
    if (!username || !password) {
      dispatch(
        setErrorMessage(
          <p>You have some incomplete fields, please complete form</p>
        )
      );
    } else {
      try {
        const response = await fetch('/login/signupRequest', {
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
          // Handle error response here
          console.log('Sign up request failed:', response);
        }
      } catch (error) {
        // Handle network or other errors here
        console.log('Error occurred while making sign up request:', error);
      }
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="username">username</label>
        <br />
        <input type="text" id="username" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" id="password" />
      </div> 
      {errorMessage}

      <div>
        <button
          onClick={() => {
            signUpUser(
              document.querySelector('#username').value,
              document.querySelector('#password').value
            );
            // mockGet(mockData);
          }}
        >
          Sign Up
        </button>
      </div>

      <GithubOAuth />

      <div>
        <p>Already a member?</p>
        <Link to="/loginpage">
          <button>Login</button>
        </Link>
      </div>

    </div>
  );
}

export default SignUpPage;