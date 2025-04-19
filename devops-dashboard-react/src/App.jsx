import React, { useState, useEffect } from 'react';
// Import components
import Header from './components/Header/Header'; 
import DashboardGrid from './components/DashboardGrid/DashboardGrid';
import CpuCard from './components/CpuCard/CpuCard';
import MemoryCard from './components/MemoryCard/MemoryCard';
import AlertsCard from './components/AlertsCard/AlertsCard';
import DiskCard from './components/DiskCard/DiskCard';
import NetworkCard from './components/NetworkCard/NetworkCard';
// Import new cards
import ServiceStatusCard from './components/ServiceStatusCard/ServiceStatusCard';
import DeploymentCard from './components/DeploymentCard/DeploymentCard';
import LogErrorsCard from './components/LogErrorsCard/LogErrorsCard';
import PerformanceCard from './components/PerformanceCard/PerformanceCard';

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
        {/* Row 1: System resources */}
        <CpuCard />
        <MemoryCard />
        <DiskCard />
        <NetworkCard />
        
        {/* Row 2: Service health and performance */}
        <PerformanceCard />
        <ServiceStatusCard />
        
        {/* Row 3: Operational data */}
        <DeploymentCard />
        <LogErrorsCard />
        <AlertsCard />
      </DashboardGrid>
    </div>
  );
}

export default App; 