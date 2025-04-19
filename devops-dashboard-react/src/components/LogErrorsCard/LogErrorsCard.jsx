import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import styles from './LogErrorsCard.module.css';

function LogErrorsCard() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sample error data generator
  const generateErrors = () => {
    const errorTypes = [
      { name: 'Connection Timeout', severity: 'critical' },
      { name: 'Database Query Failed', severity: 'critical' },
      { name: 'Authentication Failed', severity: 'warning' },
      { name: 'Invalid Request Format', severity: 'info' },
      { name: 'Rate Limit Exceeded', severity: 'warning' },
      { name: 'Resource Not Found', severity: 'info' },
      { name: 'Permission Denied', severity: 'warning' },
    ];
    
    const services = [
      'Authentication Service',
      'User API',
      'Payment Gateway',
      'Data Storage',
      'Notification Service',
      'Search Service'
    ];
    
    // Generate between 3-8 random errors
    const count = 3 + Math.floor(Math.random() * 6);
    const result = [];
    
    for (let i = 0; i < count; i++) {
      // Random time within the last 30 minutes
      const timestamp = new Date(Date.now() - Math.random() * 30 * 60 * 1000);
      
      const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
      const service = services[Math.floor(Math.random() * services.length)];
      
      result.push({
        id: i,
        type: errorType.name,
        severity: errorType.severity,
        service,
        timestamp,
        count: 1 + Math.floor(Math.random() * 10) // How many times this error has occurred
      });
    }
    
    // Sort by timestamp (newest first)
    return result.sort((a, b) => b.timestamp - a.timestamp);
  };
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setErrors(generateErrors());
      setLoading(false);
    }, 1000);
    
    // Refresh data occasionally
    const interval = setInterval(() => {
      setErrors(generateErrors());
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format the relative time (e.g., "2 minutes ago")
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffSeconds = Math.floor(diffMs / 1000);
    
    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    }
    
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  };
  
  // Get CSS class for severity level
  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'critical':
        return styles.critical;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return '';
    }
  };
  
  return (
    <MetricCard 
      title="Recent Log Errors" 
      icon={<FaExclamationTriangle />}
      loading={loading}
    >
      <div className={styles.errorList}>
        {errors.length > 0 ? (
          errors.map(error => (
            <div 
              key={error.id} 
              className={`${styles.errorItem} ${getSeverityClass(error.severity)}`}
            >
              <div className={styles.errorHeader}>
                <span className={styles.errorService}>{error.service}</span>
                <span className={styles.errorTime}>{formatRelativeTime(error.timestamp)}</span>
              </div>
              <div className={styles.errorMessage}>
                {error.type}
                {error.count > 1 && (
                  <span className={styles.errorCount}>×{error.count}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noErrors}>
            No errors in the last 30 minutes
          </div>
        )}
      </div>
    </MetricCard>
  );
}

export default LogErrorsCard; 