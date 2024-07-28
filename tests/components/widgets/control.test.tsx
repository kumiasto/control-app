import * as React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { ControlWidget } from '../../../src/components/widgets/control';
import configReducer, {
  initialState,
} from '../../../src/redux/slice/configSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = initialState,
    store = configureStore({ reducer: configReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

describe('Control widget component', () => {
  const preloadedState = {
    brightness: 30,
    timeLeft: 20,
    configSwitchOptions: {
      duskTillDawn: false,
      flashing: false,
      nightVision: false,
    },
  };

  it('Add button disabled when brightness reaches 100', async () => {
    renderWithProviders(<ControlWidget />, {
      preloadedState,
    });

    const button = screen.getByTestId('add-button');

    fireEvent.click(button);
    expect(button).toBeDisabled();
  });
  it('Add button not disabled when brightness reaches 30', async () => {
    renderWithProviders(<ControlWidget />, {
      preloadedState: {
        ...preloadedState,
        brightness: 10,
      },
    });

    const button = screen.getByTestId('add-button');

    fireEvent.click(button);
    expect(button).not.toBeDisabled();
  });
  it('Subtract button disabled when brightness reaches 1', async () => {
    renderWithProviders(<ControlWidget />, {
      preloadedState: {
        ...preloadedState,
        brightness: 3,
      },
    });

    const button = screen.getByTestId('subtract-button');

    fireEvent.click(button);
    expect(button).toBeDisabled();
  });
  it('Subtract button not disabled when brightness reaches 3', async () => {
    renderWithProviders(<ControlWidget />, {
      preloadedState: {
        ...preloadedState,
        brightness: 10,
      },
    });
    const button = screen.getByTestId('subtract-button');

    fireEvent.click(button);
    expect(button).not.toBeDisabled();
  });
  it('Light switches are properly set to true', async () => {
    renderWithProviders(<ControlWidget />, {
      preloadedState: {
        ...preloadedState,
        configSwitchOptions: {
          duskTillDawn: true,
          flashing: true,
          nightVision: true,
        },
      },
    });

    const switchElements: HTMLInputElement[] = screen.getAllByTestId('switch');
    const allChecked = switchElements.every(
      (switchElement) => switchElement.checked
    );

    expect(allChecked).toBe(true);
  });
  it('All items have class active when brightness reaches 100', () => {
    renderWithProviders(<ControlWidget />, {
      preloadedState: {
        ...preloadedState,
        brightness: 30,
      },
    });
    const progressItems = screen.getAllByTestId('progress-item');
    const button = screen.getByTestId('add-button');

    fireEvent.click(button);

    progressItems.forEach((item) => {
      expect(item).toHaveClass('active');
    });
  });
});
