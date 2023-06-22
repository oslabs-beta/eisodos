import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

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
        navigate('/dashboard/health'); // TODO: change this to ':username/dashboard' later
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <div>
      <Link to="/">
        <img src="./assets/logos/eisodos.png" className="h-24 w-24 mt-4 ml-4" />
      </Link>
      <div className="mt-36 flex flex-col items-center justify-center">
        <div className="h-2/4 w-1/4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-black-1 py-16">
            <form className="flex flex-col items-center">
              <title className="mb-10 block text-3xl font-bold">Log in to your account</title>
              <div className="w-full">
                <label>Username</label>
                <input
                  id="loginUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mb-3 w-full rounded border border-black px-2 py-1 text-black"
                />
              </div>
              <div className="w-full">
                <label>Password</label>
                <input
                  id="loginPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4 w-full rounded border border-black px-2 py-1 text-black"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => loginUser(e, username, password)}
                className="mb-2 mt-6 w-full rounded bg-gradient-to-r from-cyan-500 to-blue-600 py-2 font-bold">
                Log In
              </button>
              <Link to="/register" className="mt-2 hover:underline">
                Don&apos;t have an account? Sign up here
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
