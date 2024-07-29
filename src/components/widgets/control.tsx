/// <reference types="vite-plugin-svgr/client" />
import * as React from 'react';

import { useDispatch } from 'react-redux';
import AddIcon from '../../assets/add.svg?react';
import SubtractIcon from '../../assets/subtract.svg?react';
import {
  setBrightness,
  toggleDuskTillDawn,
  toggleFlashing,
  toggleNightVision,
} from '../../redux/slice/configSlice';
import '../../styles/widgets/control.css';
import BatteryInfo from '../battery-info';
import { Button } from '../button';
import { ProgressBar } from '../progress-bar';
import { Switch } from '../switch';
import useConfigData from '../../hooks/use-config-data';
import useSwitchesError from '../../hooks/use-switches-error';

const LOW_BRIGHTNESS = 1;
const MAX_BRIGHTNESS = 100;
const brightnessPower = [1, 3, 10, 30, 100];

export const ControlWidget = () => {
  const { duskTillDawn, nightVision, flashing, brightness, timeLeft } =
    useConfigData();
  const dispatch = useDispatch();
  const { dispatchError, errorState, initialState } = useSwitchesError();
  const formRef = React.useRef<HTMLFormElement>(null);

  const currentBrightnessLevel = brightnessPower.findIndex(
    (val) => val === brightness
  );

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
      className="control-widget"
      onSubmit={onSubmit}
      ref={formRef}
      data-testid="form"
    >
      <div className="title-container">
        <p>THR08</p>
        <ProgressBar steps={5} currentStep={currentBrightnessLevel} />
      </div>
      <div className="control-panel">
        <div className="button-container">
          <Button
            icon={<AddIcon fill="#fff" width={42} height={42} />}
            className="add-button"
            disabled={brightness === MAX_BRIGHTNESS}
            onClick={() =>
              handleChange(() =>
                dispatch(
                  setBrightness(brightnessPower[currentBrightnessLevel + 1])
                )
              )
            }
            data-testid="add-button"
          />
          <div className="percent-info">
            <div>{brightnessPower[currentBrightnessLevel]}%</div>
          </div>
          <Button
            icon={<SubtractIcon fill="#fff" width={42} height={42} />}
            className="subtract-button"
            disabled={brightness === LOW_BRIGHTNESS}
            onClick={() =>
              handleChange(() =>
                dispatch(
                  setBrightness(brightnessPower[currentBrightnessLevel - 1])
                )
              )
            }
            data-testid="subtract-button"
          />
        </div>
        <div className="switch-container">
          <BatteryInfo batteryLevel={timeLeft} />
          <Switch
            id="nightVision"
            label="Night Vision"
            onChange={() =>
              handleChange(() => dispatch(toggleNightVision()), 'nightVision')
            }
            checked={nightVision}
            error={errorState.nightVision.error}
          />
          <Switch
            id="duskTillDawn"
            label="Dusk Till Dawn"
            onChange={() =>
              handleChange(() => dispatch(toggleDuskTillDawn()), 'duskTillDawn')
            }
            checked={duskTillDawn}
            error={errorState.duskTillDawn.error}
          />
          <Switch
            id="flashing"
            label="Flashing"
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
