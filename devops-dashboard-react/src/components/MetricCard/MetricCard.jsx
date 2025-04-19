import React from 'react';
import styles from './MetricCard.module.css';

function MetricCard({ title, children, icon, loading = false }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {title && (
          <h2>
            {icon && <span className={styles.cardIcon}>{icon}</span>}
            {title}
          </h2>
        )}
      </div>
      
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default MetricCard; 