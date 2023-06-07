import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate,  } from 'react-router-dom';
import { setErrorMessage } from '../features/slices/errorSlice';


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signUpUser(username: string, password: string) {
    if (!username || !password) {
      dispatch(
        setErrorMessage(
          'You have some incomplete fields, please complete form'
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
          navigate('/:username/onBoarding');
          setUsername('');
          setPassword('');
        } else {
          console.log('Sign up request failed:', response);
        }
      } catch (error) {
        console.log('Error occurred while making sign up request:', error);
      }
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
          onClick={()=> {signUpUser}}
        >Signup </button>
        {/* <p> {setErrorMessage} </p> */}
        <Link to='/register'>Already a member? Login Here</Link>
      </form>
    </div>
  );
};

export default RegisterPage;