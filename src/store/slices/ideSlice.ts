import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FileNode } from '../../types';

interface IDEState {
  projectId: string;
  fileTree: FileNode[];
  activeFile: FileNode | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IDEState = {
  projectId: '',
  fileTree: [],
  activeFile: null,
  isLoading: false,
  error: null
};

const ideSlice = createSlice({
  name: 'ide',
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
    setFileTree: (state, action: PayloadAction<FileNode[]>) => {
      state.fileTree = action.payload;
    },
    setActiveFile: (state, action: PayloadAction<FileNode | null>) => {
      state.activeFile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setProjectId,
  setFileTree,
  setActiveFile,
  setLoading,
  setError
} = ideSlice.actions;

export default ideSlice.reducer;