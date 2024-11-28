import { configureStore } from '@reduxjs/toolkit';
import agentReducer from './slices/agentSlice';
import previewReducer from './slices/previewSlice';
import ideReducer from './slices/ideSlice';

export const store = configureStore({
  reducer: {
    agent: agentReducer,
    preview: previewReducer,
    ide: ideReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;