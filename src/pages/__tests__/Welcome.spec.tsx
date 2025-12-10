import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Welcome from '../Welcome';

describe('<Welcome />', () => {
  it('should render Welcome component', () => {
    render(<Welcome />);
    expect(screen.getByText('👋 Welcome,')).toBeInTheDocument();
    expect(screen.getByText('Kuln Kunnalawanich')).toBeInTheDocument();
    expect(screen.getByText('To Recruitment Lead Management System')).toBeInTheDocument();
  });

  it('should render logo image', () => {
    render(<Welcome />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });
});
