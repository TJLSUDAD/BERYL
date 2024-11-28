import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle, XCircle } from 'lucide-react';
import { clearMessages } from '../../store/slices/previewSlice';
import type { RootState } from '../../store';
import { colors } from '../../styles/colors';

export function StatusMessage() {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state: RootState) => state.preview);

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  if (!error && !successMessage) return null;

  const isError = !!error;
  const message = error?.message || successMessage;
  const Icon = isError ? XCircle : CheckCircle;
  const bgColor = isError ? 'bg-red-50' : 'bg-green-50';
  const textColor = isError ? 'text-red-800' : 'text-green-800';
  const iconColor = isError ? '#DC2626' : '#059669';

  return (
    <div className={`rounded-md p-4 ${bgColor} mb-4`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3" style={{ color: iconColor }} />
        <p className={`text-sm font-medium ${textColor}`}>{message}</p>
      </div>
    </div>
  );
}