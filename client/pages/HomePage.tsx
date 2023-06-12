import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
  return (
    // TODO: add login/register links
    <div>
      <h1 className="text-3xl underline">Test</h1>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default HomePage;