import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('should render the brand name', () => {
    // Arrange
    const props = {
      user: null,
      profile: null,
      onSignOut: () => {},
      onDashboardClick: () => {},
      onAuthClick: () => {},
    };

    render(
      <BrowserRouter>
        <Header {...props} />
      </BrowserRouter>
    );

    // Act
    const brandElement = screen.getByText(/CueMasters/i);

    // Assert
    expect(brandElement).toBeInTheDocument();
  });
});
