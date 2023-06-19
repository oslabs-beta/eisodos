import React from 'react';
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import ConnectClusterPage from '../client/pages/ConnectClusterPage';

describe('ConnectClusterPage - Rendering', () => {
  it ('should have "Connect to Cluser" text', () => {
    render(<ConnectClusterPage />);
    expect(screen.getByText('Connect to Cluster')).toBeInTheDocument();
  });
  it('should have input field with placeholder "my-cluster" text', () => {
    render(<ConnectClusterPage />);
    expect(screen.getByPlaceholderText('my-cluster')).toBeInTheDocument();
  });
  it('should have button with Connect text', () => {
    render(<ConnectClusterPage />);
    expect(screen.getByRole('button', {name: 'Connect' })).toBeInTheDocument();
  });
});