import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import LoginPage from '../client/pages/LoginPage';

describe('Log In Page - Rendering', () => {
  it ('should have "Home" text', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
  it('should have input field with label Username', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  });
  it('should have input field with label Password', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });
  it('should have button with Log In text', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });
  it ('should have "Don\'t have an account? Register here" text', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByText('Don\'t have an account? Register here')).toBeInTheDocument();
  });
});