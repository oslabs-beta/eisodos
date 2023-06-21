import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import HealthPage from './pages/DashboardPage/HealthPage/HealthPage';
import HierarchyPage from './pages/HierarchyPage';
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
          <Route path="health" element={<HealthPage />} />
          <Route path="apps" element={<Apps />} />
          <Route path="nodes" element={<div></div>} />
        </Route>
        <Route path="/hierarchy" element={<HierarchyPage />} />
      </Routes>
    </>
  );
};

export default App;
