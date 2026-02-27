import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { ToastContainer } from './ToastContainer';
import { NotificationSystem } from './NotificationSystem';
import { useToast } from '@/hooks/useToast';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="lg:pl-64">
        <main className="flex-1 pt-20">
          {children || <Outlet />}
        </main>
      </div>
      <NotificationSystem />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
