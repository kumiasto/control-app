import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../../src/components/button';

describe('Button component', () => {
  it('Should render without error', () => {
    render(<Button />);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
  });

  it('Renders button with default props', () => {
    render(<Button />);
    const button = screen.getByTestId('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('Renders button with correct type attribute', () => {
    render(<Button type='submit' />);

    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('Renders button with label', () => {
    render(<Button label='Click' />);

    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('Calls onClick handler when button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} />);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).toBeCalledTimes(1);
  });

  it('Renders button with both label and icon', () => {
    render(<Button label='Search' icon={<span data-testid='icon'>🔍</span>} />);

    const label = screen.getByText('Search');
    const icon = screen.getByTestId('icon');

    expect(label).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('Renders button as disabled', async () => {
    render(<Button disabled />);

    const button = screen.getByTestId('button');

    expect(button).toBeDisabled();
  });
});
