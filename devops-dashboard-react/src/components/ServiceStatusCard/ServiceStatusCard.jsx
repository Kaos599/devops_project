import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import { FaServer } from 'react-icons/fa';
import styles from './ServiceStatusCard.module.css';

function ServiceStatusCard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample service names
  const serviceNames = [
    'Authentication Service', 
    'Payment Gateway', 
    'User Management',
    'Data Processing',
    'Notification Service',
    'API Gateway',
    'Search Service',
    'Recommendation Engine',
    'Analytics Service',
    'Content Delivery'
  ];

  // Possible statuses with weighted probabilities
  const statuses = [
    { status: 'Healthy', className: styles.healthy, weight: 7 },
    { status: 'Degraded', className: styles.degraded, weight: 2 },
    { status: 'Down', className: styles.down, weight: 1 }
  ];

  // Generate random service data
  const generateServiceData = () => {
    const totalWeight = statuses.reduce((sum, item) => sum + item.weight, 0);
    
    return serviceNames.map(service => {
      // Generate weighted random status
      let random = Math.random() * totalWeight;
      let statusObj = statuses[0];
      
      for (const item of statuses) {
        random -= item.weight;
        if (random <= 0) {
          statusObj = item;
          break;
        }
      }
      
      return {
        name: service,
        status: statusObj.status,
        statusClass: statusObj.className,
        uptime: Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 10) + '%',
        lastChecked: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString()
      };
    });
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setServices(generateServiceData());
      setLoading(false);
    }, 1000);
    
    // Update service statuses every 20 seconds
    const interval = setInterval(() => {
      setServices(generateServiceData());
    }, 20000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <MetricCard 
      title="Service Status" 
      icon={<FaServer />}
      loading={loading}
    >
      <div className={styles.serviceList}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceItem}>
            <div className={styles.serviceInfo}>
              <span className={styles.serviceName}>{service.name}</span>
              <span className={styles.serviceUptime}>Uptime: {service.uptime}</span>
            </div>
            <div className={styles.statusContainer}>
              <span className={`${styles.serviceStatus} ${service.statusClass}`}>
                {service.status}
              </span>
              <span className={styles.lastChecked}>
                Last checked: {new Date(service.lastChecked).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </MetricCard>
  );
}

export default ServiceStatusCard; 