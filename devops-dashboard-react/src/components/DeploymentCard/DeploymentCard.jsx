import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import { FaRocket, FaCheck, FaTimes, FaExclamationTriangle, FaHourglassHalf } from 'react-icons/fa';
import styles from './DeploymentCard.module.css';

function DeploymentCard() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample deployment data generator
  const generateDeployments = () => {
    const services = [
      'Frontend', 
      'Auth Service', 
      'API Gateway',
      'User Management',
      'Payment Service',
      'Notification Service'
    ];
    
    const environments = ['Production', 'Staging', 'Development'];
    
    const statuses = [
      { name: 'Success', icon: <FaCheck className={styles.successIcon} />, className: styles.success },
      { name: 'Failed', icon: <FaTimes className={styles.failedIcon} />, className: styles.failed },
      { name: 'Warning', icon: <FaExclamationTriangle className={styles.warningIcon} />, className: styles.warning },
      { name: 'In Progress', icon: <FaHourglassHalf className={styles.inProgressIcon} />, className: styles.inProgress }
    ];
    
    const statusWeights = [70, 10, 10, 10]; // Success more common
    
    // Generate random deployments
    const result = [];
    for (let i = 0; i < 10; i++) {
      // Random timestamp in the last 7 days
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      
      // Weighted random status
      const randomNum = Math.random() * 100;
      let cumulativeWeight = 0;
      let selectedStatus = statuses[0];
      
      for (let j = 0; j < statuses.length; j++) {
        cumulativeWeight += statusWeights[j];
        if (randomNum <= cumulativeWeight) {
          selectedStatus = statuses[j];
          break;
        }
      }
      
      result.push({
        id: i,
        service: services[Math.floor(Math.random() * services.length)],
        environment: environments[Math.floor(Math.random() * environments.length)],
        version: `v${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
        timestamp,
        status: selectedStatus.name,
        statusIcon: selectedStatus.icon,
        statusClass: selectedStatus.className
      });
    }
    
    // Sort by timestamp (newest first)
    return result.sort((a, b) => b.timestamp - a.timestamp);
  };
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setDeployments(generateDeployments());
      setLoading(false);
    }, 1000);
    
    // Refresh data occasionally
    const interval = setInterval(() => {
      setDeployments(generateDeployments());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format the relative time (e.g., "2 hours ago")
  const formatRelativeTime = (timestamp) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    
    const elapsed = Date.now() - timestamp;
    
    if (elapsed < msPerMinute) {
      const seconds = Math.floor(elapsed / 1000);
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
    else if (elapsed < msPerHour) {
      const minutes = Math.floor(elapsed / msPerMinute);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    else if (elapsed < msPerDay) {
      const hours = Math.floor(elapsed / msPerHour);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    else {
      const days = Math.floor(elapsed / msPerDay);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };
  
  return (
    <MetricCard 
      title="Recent Deployments" 
      icon={<FaRocket />}
      loading={loading}
    >
      <div className={styles.deploymentList}>
        {deployments.map(deployment => (
          <div 
            key={deployment.id} 
            className={`${styles.deploymentItem} ${deployment.statusClass}`}
          >
            <div className={styles.deploymentHeader}>
              <div className={styles.deploymentMeta}>
                <span className={styles.deploymentService}>
                  {deployment.service}
                </span>
                <span className={styles.deploymentEnv}>
                  {deployment.environment}
                </span>
              </div>
              <div className={styles.deploymentTime}>
                {formatRelativeTime(deployment.timestamp)}
              </div>
            </div>
            <div className={styles.deploymentDetails}>
              <div className={styles.deploymentVersion}>
                {deployment.version}
              </div>
              <div className={styles.deploymentStatus}>
                {deployment.statusIcon}
                <span>{deployment.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MetricCard>
  );
}

export default DeploymentCard; 