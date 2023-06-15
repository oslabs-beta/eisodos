import React from 'react';
import { Link } from 'react-router-dom';

import Health from './Health';

const DashboardPage = () => {
  return (
    <div>
      <nav>
        <Link to="">Health</Link>
        <Link to="">Apps</Link>
        <Link to="">Nodes</Link>
      </nav>
      <Health />
    </div>
  );
};

export default DashboardPage;
