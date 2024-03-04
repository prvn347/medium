import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      // Convert the string value to a boolean
      const isDarkMode = savedDarkMode === 'true';
      setDarkMode(isDarkMode);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString()); // Convert boolean to string before storing
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`px-4 py-2 rounded-full ${
        darkMode ? 'bg-yellow-400' : 'bg-black'
      } ${
        darkMode ? 'text-gray-900' : 'text-white'
      } transition-colors duration-200`}
    >
      {darkMode ? '💡' : '🌑'}
    </button>
  );
};

export default ThemeSwitcher;
