import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function LoginPage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.userReducer.errorMessage);
  const navigate = useNavigate();

  function loginUser(username, password) {
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        dispatch(setErrorMessage([]));
        dispatch(setCurrentUser(username));
        navigate('/');
        // getCluster?
      } else {
        dispatch(setErrorMessage([<p>Invalid password or username</p>]));
      }
    });
  }

  return loginPage(
    <body>
      <img className='project-logo' src= />
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

        //TODO: set up button function
        <button type='submit' className='login-button'> Login</button>

        //TODO: reroute to sign up page
        <div>
          <p>Not a member? Sign up here</p>
          <Link to='/register'>

          </Link>
        </div>
      </div>
    </body>
  );
}

export default LoginPage; 