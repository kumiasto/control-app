import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  brightness: 0,
  timeLeft: 0,
  configSwitchOptions: {
    nightVision: false,
    duskTillDawn: false,
    flashing: false,
  },
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setBrightness(state, action) {
      state.brightness = action.payload;
    },
    setTimeLeft(state, action) {
      state.timeLeft = action.payload;
    },
    toggleNightVision({ configSwitchOptions: configSwitchOptions }) {
      configSwitchOptions.nightVision = !configSwitchOptions.nightVision;
    },
    toggleDuskTillDawn({ configSwitchOptions: configSwitchOptions }) {
      configSwitchOptions.duskTillDawn = !configSwitchOptions.duskTillDawn;
    },
    toggleFlashing({ configSwitchOptions: configSwitchOptions }) {
      configSwitchOptions.flashing = !configSwitchOptions.flashing;
    },
    setConfig(state, action) {
      const { brightness, timeLeft, nightVision, duskTillDawn, flashing } =
        action.payload;
      state.brightness = brightness ?? state.brightness;
      state.timeLeft = timeLeft ?? state.timeLeft;
      state.configSwitchOptions.nightVision =
        nightVision ?? state.configSwitchOptions.nightVision;
      state.configSwitchOptions.duskTillDawn =
        duskTillDawn ?? state.configSwitchOptions.duskTillDawn;
      state.configSwitchOptions.flashing =
        flashing ?? state.configSwitchOptions.flashing;
    },
  },
});

export const {
  setBrightness,
  setTimeLeft,
  toggleNightVision,
  toggleDuskTillDawn,
  toggleFlashing,
  setConfig,
} = configSlice.actions;

export default configSlice.reducer;
