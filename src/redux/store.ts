import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slice/configSlice';

const store = configureStore({ reducer: configReducer });
export type RootStateType = ReturnType<typeof store.getState>;
export default store;
