/// <reference types="vite-plugin-svgr/client" />
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '../../assets/add.svg?react';
import SubtractIcon from '../../assets/subtract.svg?react';
import {
  setBrightness,
  toggleDuskTillDawn,
  toggleFlashing,
  toggleNightVision,
} from '../../redux/slice/configSlice';
import { RootStateType } from '../../redux/store';
import '../../styles/widgets/control.css';
import BatteryInfo from '../battery-info';
import { Button } from '../button';
import { ProgressBar } from '../progress-bar';
import { Switch } from '../switch';

export const ControlWidget = () => {
  const dispatch = useDispatch();
  const configSwitchOptions = useSelector<
    RootStateType,
    Record<keyof RootStateType['configSwitchOptions'], boolean>
  >((state) => state.configSwitchOptions);

  const { duskTillDawn, nightVision, flashing } = configSwitchOptions;

  const brightness = useSelector<RootStateType, number>(
    (state) => state.brightness
  );
  const timeLeft = useSelector<RootStateType, number>(
    (state) => state.timeLeft
  );

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

  const LOW_BRIGHTNESS = 1;
  const MAX_BRIGHTNESS = 100;
  const brightnessPower = [1, 3, 10, 30, 100];
  const currentBrightnesLevel = brightnessPower.findIndex(
    (val) => val === brightness
  );

  const formRef = React.useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //symulacja wysyłania formularza

    console.log('Updating data on the server', {
      duskTillDawn: duskTillDawn,
      nightVision: nightVision,
      flashing: flashing,
      brightness: brightness,
      timeLeft: timeLeft,
    });
  };

  const handleChange = async (
    toggleAction: () => void,
    key?: keyof typeof initialState
  ) => {
    if (key) {
      dispatchError({ type: 'increment', key });
      // Symulacja bledu - zapewne w aplikacji produkcyjnej z prawdziwym backendem uzywane jest cos co ulatiwa przechwytywanie bledow. Tutaj juz nie chcialem komplikować i zrobilem to recznie :)

      try {
        await toggleAction();

        if (formRef.current) {
          formRef.current.requestSubmit();
        }

        if (errorState[key].count && errorState[key].count % 7 === 0) {
          throw new Error('Backend error');
        }

        dispatchError({ type: 'setError', key, error: false });
      } catch (error) {
        dispatchError({ type: 'setError', key, error: true });

        await toggleAction();

        setTimeout(() => {
          dispatchError({ type: 'resetError', key });
        }, 3000);
      }
    } else {
      await toggleAction();

      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  return (
    <form
      className='control-widget'
      onSubmit={onSubmit}
      ref={formRef}
      data-testid='form'
    >
      <div className='title-container'>
        <p>THR08</p>
        <ProgressBar steps={5} currentStep={currentBrightnesLevel} />
      </div>
      <div className='control-panel'>
        <div className='button-container'>
          <Button
            icon={<AddIcon fill='#fff' width={42} height={42} />}
            className='add-button'
            disabled={brightness === MAX_BRIGHTNESS}
            onClick={() =>
              handleChange(() =>
                dispatch(
                  setBrightness(brightnessPower[currentBrightnesLevel + 1])
                )
              )
            }
            data-testid='add-button'
          />
          <div className='percent-info'>
            {brightnessPower[currentBrightnesLevel]}%
          </div>
          <Button
            icon={<SubtractIcon fill='#fff' width={42} height={42} />}
            className='subtract-button'
            disabled={brightness === LOW_BRIGHTNESS}
            onClick={() =>
              handleChange(() =>
                dispatch(
                  setBrightness(brightnessPower[currentBrightnesLevel - 1])
                )
              )
            }
            data-testid='subtract-button'
          />
        </div>
        <div className='switch-container'>
          <BatteryInfo batteryLevel={timeLeft} />
          <Switch
            id='nightVision'
            label='Night Vision'
            onChange={() =>
              handleChange(() => dispatch(toggleNightVision()), 'nightVision')
            }
            checked={nightVision}
            error={errorState.nightVision.error}
          />
          <Switch
            id='duskTillDawn'
            label='Dusk Till Dawn'
            onChange={() =>
              handleChange(() => dispatch(toggleDuskTillDawn()), 'duskTillDawn')
            }
            checked={duskTillDawn}
            error={errorState.duskTillDawn.error}
          />
          <Switch
            id='flashing'
            label='Flashing'
            onChange={() =>
              handleChange(() => dispatch(toggleFlashing()), 'flashing')
            }
            checked={flashing}
            error={errorState.flashing.error}
          />
        </div>
      </div>
    </form>
  );
};
