import { useState } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState extends ToastConfig {
  visible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
    duration: 3000,
  });

  const showToast = ({ message, type, duration = 3000 }: ToastConfig) => {
    setToast({
      visible: true,
      message,
      type,
      duration,
    });
  };

  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const showSuccess = (message: string, duration?: number) => {
    showToast({ message, type: 'success', duration });
  };

  const showError = (message: string, duration?: number) => {
    showToast({ message, type: 'error', duration });
  };

  const showInfo = (message: string, duration?: number) => {
    showToast({ message, type: 'info', duration });
  };

  const showWarning = (message: string, duration?: number) => {
    showToast({ message, type: 'warning', duration });
  };

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}; 