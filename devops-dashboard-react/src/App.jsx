import React, { useState, useEffect } from 'react';
// Import components
import Header from './components/Header/Header'; 
import DashboardGrid from './components/DashboardGrid/DashboardGrid';
import CpuCard from './components/CpuCard/CpuCard';
import MemoryCard from './components/MemoryCard/MemoryCard';
import AlertsCard from './components/AlertsCard/AlertsCard';
import DiskCard from './components/DiskCard/DiskCard';

import './index.css'; // Import global styles

function App() {
  const [theme, setTheme] = useState('dark'); // Default theme

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Apply theme to body element whenever it changes
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <Header currentTheme={theme} toggleTheme={toggleTheme} />
      
      <DashboardGrid>
        <CpuCard />
        <MemoryCard />
        <DiskCard />
        <AlertsCard />
        {/* Add more cards here later */}
      </DashboardGrid>
    </div>
  );
}

export default App; 