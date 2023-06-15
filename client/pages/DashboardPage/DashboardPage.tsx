import React from 'react';
import { Link } from 'react-router-dom';
import HealthPage from './HealthPage/HealthPage';

const DashboardPage = () => {
  return (
    <div>
      <nav>
        <Link to="">Health</Link>
        <Link to="">Apps</Link>
        <Link to="">Nodes</Link>
      </nav>
      <HealthPage />
    </div>
  );
};

export default DashboardPage;
