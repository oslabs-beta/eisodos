import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
  return (
    <>
      <nav className="flex h-20 justify-between bg-gray-800">
        <div className="flex items-center space-x-3 text-lg">
          <Link to="/" className="hover:underline">
            Overview
          </Link>
          <Link to="/#features" className="hover:underline">
            Features
          </Link>
          <Link to="/#demo" className="hover:underline">
            Demo
          </Link>
          <Link to="/#get-started" className="hover:underline">
            Get Started
          </Link>
          <Link to="/#team" className="hover:underline">
            Team
          </Link>
        </div>
        <div className="mr-10 flex items-center space-x-3">
          <Link
            to="/login"
            className="h-7 w-20 content-center rounded border border-black bg-sky-600 pl-5 hover:bg-sky-700">
            Login
          </Link>
          <Link
            to="/register"
            className="h-7 w-20 content-center rounded border border-black bg-sky-600 pl-3 hover:bg-sky-700">
            Register
          </Link>
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
