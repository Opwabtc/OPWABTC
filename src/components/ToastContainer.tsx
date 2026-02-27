import React from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="toast-icon success" size={20} />;
      case 'error':
        return <XCircle className="toast-icon error" size={20} />;
      case 'info':
        return <Info className="toast-icon info" size={20} />;
      default:
        return <Info className="toast-icon info" size={20} />;
    }
  };

  return (
    <div className="toast-area" id="toastArea">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {getIcon(toast.type)}
          <div className="toast-body">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-desc">{toast.description}</div>
          </div>
          <button
            className="toast-close"
            onClick={() => onRemove(toast.id)}
            aria-label="Close toast"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};
