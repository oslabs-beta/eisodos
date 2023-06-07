import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Health</Link></li>
          <li><Link to="/login">Apps</Link></li>
          <li><Link to="/register">Nodes</Link></li>
        </ul>
      </nav>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes> */}
    </>
  );
};

export default DashboardPage;