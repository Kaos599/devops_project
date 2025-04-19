import React from 'react';
import styles from './MetricCard.module.css';

function MetricCard({ title, children }) {
  return (
    <div className={styles.card}>
      {title && <h2>{title}</h2>} {/* Conditionally render title */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default MetricCard; 