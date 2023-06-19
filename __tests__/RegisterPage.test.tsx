import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import RegisterPage from '../client/pages/RegisterPage';

describe('Register Page - Rendering', () => {
  it('should have input field with label Username', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  });
  it('should have input field with label Password', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });
  it('should have button with Register text', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    expect(screen.getByRole('button', {name: 'Register' })).toBeInTheDocument();
  });
  it ('should have "Already have an account? Login here" text', () => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    );
    expect(screen.getByText('Already have an account? Login here')).toBeInTheDocument();
  });
});