import React from 'react';
import { render, screen } from '@testing-library/react';
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