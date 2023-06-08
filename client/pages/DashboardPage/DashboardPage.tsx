import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import Health from './Health';

const DashboardPage = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="">Health</Link></li>
          <li><Link to="">Apps</Link></li>
          <li><Link to="">Nodes</Link></li>
        </ul>
      </nav>
      <Health />
    </>
  );
};

export default DashboardPage;