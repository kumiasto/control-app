import React from 'react';

function useSwitchesError() {
  // Symulacja bledu na switchach

  const initialState = {
    duskTillDawn: { count: 0, error: false },
    nightVision: { count: 0, error: false },
    flashing: { count: 0, error: false },
  };

  type Action =
    | { type: 'increment'; key: keyof typeof initialState }
    | { type: 'setError'; key: keyof typeof initialState; error: boolean }
    | { type: 'resetError'; key: keyof typeof initialState };

  const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            count: state[action.key].count + 1,
          },
        };
      case 'setError':
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            error: action.error,
          },
        };
      case 'resetError':
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            error: false,
          },
        };
      default:
        return state;
    }
  };

  const [errorState, dispatchError] = React.useReducer(reducer, initialState);

  return {
    initialState,
    errorState,
    dispatchError,
  };
}

export default useSwitchesError;
