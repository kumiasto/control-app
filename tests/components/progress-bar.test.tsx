import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from '../../src/components/progress-bar';

describe('ProgressBar component', () => {
  it('Renders the correct number of steps', () => {
    render(<ProgressBar steps={5} currentStep={2} />);
    const progressItems = screen.getAllByTestId('progress-item');
    expect(progressItems).toHaveLength(5);
  });

  it('All items should have correct class based on current step', () => {
    render(<ProgressBar steps={5} currentStep={2} />);
    const progressItems = screen.getAllByTestId('progress-item');

    progressItems.forEach((item, index) => {
      if (index <= 2) {
        expect(item).toHaveClass('active');
      } else {
        expect(item).not.toHaveClass('active');
      }
    });
  });
});
