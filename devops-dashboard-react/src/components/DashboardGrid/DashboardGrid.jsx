import React from 'react';
import styles from './DashboardGrid.module.css';

// This component will wrap the metric cards
function DashboardGrid({ children }) {
  return (
    <div className={styles.gridContainer}>
      {children}
    </div>
  );
}

export default DashboardGrid; 