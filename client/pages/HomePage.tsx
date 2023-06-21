import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
  return (
    <>
      <nav className="flex justify-between bg-red-500">
        <div className="flex space-x-3">
          <Link to="/">Overview</Link>
          <Link to="/#features">Features</Link>
          <Link to="/#demo">Demo</Link>
          <Link to="/#get-started">Get Started</Link>
          <Link to="/#team">Team</Link>
        </div>
        <div className="flex space-x-3">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default HomePage;
