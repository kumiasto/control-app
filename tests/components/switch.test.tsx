import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from '../../src/components/switch';

describe('Switch component', () => {
  const handleChange = vi.fn();

  it('Should render without error', () => {
    render(
      <Switch
        id='testid'
        label='Switch'
        onChange={handleChange}
        checked={false}
      />
    );

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('Renders switch with default state', () => {
    render(
      <Switch id='testid' label='Switch' onChange={() => handleChange(true)} />
    );

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).not.toBeChecked();
  });
});
