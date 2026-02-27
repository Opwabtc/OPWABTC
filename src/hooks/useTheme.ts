import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('opwa-theme') || 'dark';
    setTheme(savedTheme as 'dark' | 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('opwa-theme', newTheme);
  };

  return { theme, toggleTheme };
};
