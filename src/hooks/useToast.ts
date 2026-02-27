import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast['type'], title: string, description: string) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, title, description };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title: string, description: string) => {
    addToast('success', title, description);
  }, [addToast]);

  const error = useCallback((title: string, description: string) => {
    addToast('error', title, description);
  }, [addToast]);

  const info = useCallback((title: string, description: string) => {
    addToast('info', title, description);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info
  };
};
