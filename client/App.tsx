import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

// import dashboard components
import Health from './pages/DashboardPage/Health/Health';
import Diagram from './pages/DashboardPage/Diagram/Diagram';
import Apps from './pages/DashboardPage/Apps/Apps';

// import redux hooks and action creators
import { useAppDispatch, useAppSelector } from './app/hooks';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="health" element={<Health />} />
          <Route path="apps" element={<Apps />} />
          <Route path="diagram" element={<Diagram />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
