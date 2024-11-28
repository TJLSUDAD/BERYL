import React, { useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';
import { saveFile } from '../../services/supabase';
import { setActiveFile } from '../../store/slices/ideSlice';
import type { RootState } from '../../store';
import { colors } from '../../styles/colors';

export function MonacoEditor() {
  const dispatch = useDispatch();
  const { activeFile, projectId } = useSelector((state: RootState) => state.ide);

  const handleEditorChange = useCallback(async (value: string | undefined) => {
    if (!activeFile || !value) return;

    try {
      await saveFile(projectId, activeFile.path, value);
      dispatch(setActiveFile({ ...activeFile, content: value }));
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  }, [activeFile, projectId, dispatch]);

  if (!activeFile) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Select a file to edit</p>
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage={activeFile.language || 'plaintext'}
      defaultValue={activeFile.content || ''}
      theme="vs-dark"
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        lineHeight: 1.5,
        fontFamily: '"JetBrains Mono", Menlo, Monaco, "Courier New", monospace',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 10 },
        smoothScrolling: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        formatOnPaste: true,
        formatOnType: true,
        renderWhitespace: "selection",
        bracketPairColorization: {
          enabled: true
        }
      }}
    />
  );
}