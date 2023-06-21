import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        navigate('/dashboard'); // TODO: change this to ':username/:my-cluster' once ConnectClusterPage is done
        setUsername('');
        setPassword('');
      } else {
        console.log('Sign up request failed:', response);
      }
    } catch (error) {
      console.log('Error occurred while making sign up request:', error);
    }
  }

  return (
    <div>
      <Link to="/">
        <img src="./assets/logo.png" className="h-32 w-32" />
      </Link>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-36 h-2/4 w-1/4 rounded-lg bg-gradient-to-r from-green-400 via-cyan-500 to-blue-800 p-0.5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
            <form className="flex flex-col items-center">
              <title className="mb-10 block text-3xl font-bold">Sign up for an account </title>
              <div className="w-full">
                <label>Username</label>
                <input
                  id="loginUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mb-3 w-full rounded border border-black px-2 py-1"
                />
              </div>
              <div className="w-full">
                <label>Password</label>
                <input
                  id="loginPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4 w-full rounded border border-black px-2 py-1"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => registerUser(e, username, password)}
                className="mb-2 mt-6 w-full rounded bg-gradient-to-r from-green-400 via-cyan-500 to-blue-800 py-2 font-bold">
                Register
              </button>
              <Link to="/login" className="hover:underline">
                Already have an account? Log in here
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
