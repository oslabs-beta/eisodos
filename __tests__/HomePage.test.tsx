import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import HomePage from '../client/pages/HomePage';

describe('Home Page - Rendering', () => {
  it ('should have "Login" text', () => {
    render(
      <Router>
        <Routes>
            <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
  it ('should have "Register" text', () => {
    render(
      <Router>
        <Routes>
            <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});