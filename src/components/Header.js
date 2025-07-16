import React, { useState, useEffect } from 'react';

import { LOGO_URL } from '../utils/constants';

const Header = ({ setNewsCategory }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = 'light';

    if (savedTheme) {
      initialTheme = savedTheme;
    } else if (prefersDark) {
      initialTheme = 'dark';
    }

    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.remove(theme === 'light' ? 'light-mode' : 'dark-mode');
    document.body.classList.add(newTheme === 'dark' ? 'dark-mode' : 'light-mode');
  };

  return (
    <div className="header">
      <div className="logo-container">
        <a href='https://meyashjha.github.io/GenZ_News/'>
        <img className="logo" src={LOGO_URL} alt="Crypto News Logo" />
      </a>
      </div>
      <div className="nav-items">
        <ul>
          <li onClick={() => setNewsCategory('crypto-news')}>Crypto News</li>
          <li onClick={() => setNewsCategory('startup-news')}>Startup News</li>
          <li onClick={() => setNewsCategory('popculture-news')}>Pop Culture News</li>
        </ul>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </div>
  );
};

export default Header;