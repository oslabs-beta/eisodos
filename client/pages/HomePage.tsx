import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const HomePage = () => {
  return (
    <>
      <nav className="flex justify-between bg-gray-800 h-20">
        <div className="flex space-x-3 items-center text-lg">
          <Link to="/" 
          className="hover:underline"
          >Overview</Link>
          <Link to="/#features"
          className="hover:underline"
          >Features</Link>
          <Link to="/#demo"
          className="hover:underline"
          >Demo</Link>
          <Link to="/#get-started"
          className="hover:underline"
          >Get Started</Link>
          <Link to="/#team"
          className="hover:underline"
          >Team</Link>
        </div>
        <div className="flex space-x-3 mr-10 items-center">
          <Link to="/login" className="rounded border border-black bg-sky-600 hover:bg-sky-700 w-20 h-7 content-center pl-5" >Login</Link>
          <Link to="/register" className="rounded border border-black bg-sky-600 hover:bg-sky-700 w-20 h-7 content-center pl-3">Register</Link>
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
