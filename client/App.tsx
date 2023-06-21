import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import HierarchyPage from './pages/HierarchyPage';
import AppsPage from './pages/AppsPage/AppPage';

// import redux hooks and action creators
import { useAppDispatch, useAppSelector } from './app/hooks';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/hierarchy" element={<HierarchyPage />} />
        <Route path="/apps" element={<AppsPage />} />
      </Routes>
    </>
  );
};

export default App;
