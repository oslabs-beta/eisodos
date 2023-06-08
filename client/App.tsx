import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

// import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

// import redux hooks and action creators
import { useAppDispatch, useAppSelector } from './app/hooks';

const App = () => {
  useEffect(() => {
    // fetch to server to check for a session cookie
    fetch('/login/auth')
      .then(res => res)
      // .then(res => {
      //   // if the server returns a 200 status code, set CurrentUser (on State) to the response from the server, which is the logged in user's username
      //   if (res.status === 200) dispatch(setCurrentUser(res));
      // })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
};

export default App;