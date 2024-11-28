import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PreviewState, PreviewError } from '../../types';

const initialState: PreviewState = {
  url: '',
  isLoading: false,
  error: null,
  successMessage: '',
  lastUpdated: null,
};

const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
      state.error = null;
      state.lastUpdated = new Date().toISOString();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<PreviewError>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.successMessage = '';
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.error = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = '';
    }
  }
});

export const { 
  setUrl, 
  setLoading, 
  setError, 
  setSuccess, 
  clearMessages 
} = previewSlice.actions;

export default previewSlice.reducer;