import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import DashboardPage from '../client/pages/DashboardPage/DashboardPage';

jest.mock('@nivo/line', () => ({
  ResponsiveLine: jest.fn().mockReturnValue(null),
}));

describe('Dashboard Page - Rendering', () => {
  it ('should have "Health" text', () => {
    render(
    <Router>
      <DashboardPage />
    </Router>  
    );
    expect(screen.getByText('Health')).toBeInTheDocument();
  });
  it ('should have "Apps" text', () => {
    render(
    <Router>
      <DashboardPage />
    </Router>  
    );
    expect(screen.getByText('Apps')).toBeInTheDocument();
  });
  it ('should have "Nodes" text', () => {
    render(
    <Router>
      <DashboardPage />
    </Router>  
    );
    expect(screen.getByText('Nodes')).toBeInTheDocument();
  });
});