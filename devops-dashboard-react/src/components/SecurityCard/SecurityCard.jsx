import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import { FaShieldAlt } from 'react-icons/fa';
import styles from './SecurityCard.module.css';

function SecurityCard() {
  const [securityData, setSecurityData] = useState({});
  const [loading, setLoading] = useState(true);

  // Sample security threats
  const securityThreats = [
    { 
      type: 'Brute Force Attack', 
      severity: 'High', 
      count: Math.floor(Math.random() * 5), 
      time: '2 hours ago'
    },
    { 
      type: 'Suspicious Login', 
      severity: 'Medium', 
      count: Math.floor(Math.random() * 10) + 5, 
      time: '45 minutes ago'
    },
    { 
      type: 'Data Exfiltration', 
      severity: 'High', 
      count: Math.floor(Math.random() * 3), 
      time: '3 hours ago'
    },
    { 
      type: 'Malware Detected', 
      severity: 'Medium', 
      count: Math.floor(Math.random() * 7) + 1, 
      time: '1 hour ago'
    },
    { 
      type: 'Unauthorized Access', 
      severity: 'Low', 
      count: Math.floor(Math.random() * 15) + 5, 
      time: '30 minutes ago'
    }
  ];

  const generateSecurityData = () => {
    return {
      threatCount: Math.floor(Math.random() * 20) + 10,
      mitigatedCount: Math.floor(Math.random() * 150) + 50,
      securityScore: Math.floor(Math.random() * 30) + 70,
      activeThreats: securityThreats.filter(() => Math.random() > 0.4)
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSecurityData(generateSecurityData());
      setLoading(false);
    }, 1000);
    
    // Update security data every 30 seconds
    const interval = setInterval(() => {
      setSecurityData(generateSecurityData());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return styles.highSeverity;
      case 'medium':
        return styles.mediumSeverity;
      case 'low':
        return styles.lowSeverity;
      default:
        return '';
    }
  };

  return (
    <MetricCard 
      title="Security Monitoring" 
      icon={<FaShieldAlt />}
      loading={loading}
    >
      {!loading && (
        <div className={styles.securityContainer}>
          <div className={styles.securityOverview}>
            <div className={styles.securityMetric}>
              <span className={styles.metricValue}>{securityData.securityScore}</span>
              <span className={styles.metricLabel}>Security Score</span>
            </div>
            <div className={styles.securityMetric}>
              <span className={styles.metricValue}>{securityData.threatCount}</span>
              <span className={styles.metricLabel}>Active Threats</span>
            </div>
            <div className={styles.securityMetric}>
              <span className={styles.metricValue}>{securityData.mitigatedCount}</span>
              <span className={styles.metricLabel}>Mitigated</span>
            </div>
          </div>
          
          <h3 className={styles.threatTitle}>Recent Threats</h3>
          
          <div className={styles.threatList}>
            {securityData.activeThreats.map((threat, index) => (
              <div key={index} className={styles.threatItem}>
                <div className={styles.threatInfo}>
                  <span className={styles.threatType}>{threat.type}</span>
                  <span className={styles.threatTime}>{threat.time}</span>
                </div>
                <div className={styles.threatMetrics}>
                  <span className={`${styles.threatSeverity} ${getSeverityClass(threat.severity)}`}>
                    {threat.severity}
                  </span>
                  <span className={styles.threatCount}>Count: {threat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MetricCard>
  );
}

export default SecurityCard; 