import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
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

  return (
    <button
      className="theme-toggle"
      id="themeToggle"
      aria-label="Toggle theme"
      title="Toggle between light and dark theme"
      onClick={toggleTheme}
    >
      <div className="theme-toggle-track">
        <Sun
          className={`theme-toggle-icon ${theme === 'light' ? 'active' : ''}`}
          id="iconSun"
          size={16}
        />
        <Moon
          className={`theme-toggle-icon ${theme === 'dark' ? 'active' : ''}`}
          id="iconMoon"
          size={14}
        />
      </div>
      <div className="theme-toggle-thumb"></div>
    </button>
  );
};
