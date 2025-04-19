import React from 'react';
import styles from './Header.module.css';

// Props will include currentTheme and toggleTheme from App.jsx
function Header({ currentTheme, toggleTheme }) {
  // Determine button text based on the current theme
  const buttonText = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  return (
    <header className={styles.header}>
      <h1>🚀 DevOps Monitoring Dashboard</h1>
      <div className={styles.headerControls}>
        <img 
          src="https://img.shields.io/github/actions/workflow/status/confusedjpeg/devops_project/deploy.yml?label=CI%2FCD"
          alt="CI/CD Status" 
          className={styles.ciBadge}
        />
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {buttonText}
        </button>
      </div>
    </header>
  );
}

export default Header; 