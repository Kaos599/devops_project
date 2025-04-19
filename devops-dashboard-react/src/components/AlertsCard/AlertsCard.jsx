import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import styles from './AlertsCard.module.css';

const MAX_ALERTS = 5;
const MOCK_ALERT_MESSAGES = [
  { status: '🟡', message: 'High CPU load on web-01' },
  { status: '🟡', message: 'Memory usage high on db-cluster' },
  { status: '🔴', message: 'Service redis-cache unresponsive' },
  { status: '🟢', message: 'Deployment pipeline completed' },
  { status: '🟡', message: 'Latency increased for api-gateway' },
];

let alertCounter = 1; // Simple counter for unique keys

function AlertsCard() {
  const [alerts, setAlerts] = useState([
    { id: alertCounter++, status: '🟢', message: 'All systems operational' },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newAlertIndex = Math.floor(Math.random() * MOCK_ALERT_MESSAGES.length);
      const newAlert = {
        id: alertCounter++,
        ...MOCK_ALERT_MESSAGES[newAlertIndex]
      };

      setAlerts(prevAlerts => {
        const updatedAlerts = [newAlert, ...prevAlerts];
        // Limit the number of alerts shown
        if (updatedAlerts.length > MAX_ALERTS) {
          return updatedAlerts.slice(0, MAX_ALERTS);
        }
        return updatedAlerts;
      });

    }, 8000); // Add a new alert every 8 seconds

    return () => clearInterval(intervalId);
  }, []); // Run only once on mount

  return (
    <MetricCard title="System Alerts">
      <ul className={styles.alertsList} id="alerts-list">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <li key={alert.id} className={styles.alertItem}>
              <span className={styles.alertStatus}>{alert.status}</span>
              {alert.message}
            </li>
          ))
        ) : (
          <li className={styles.alertItem}>No active alerts.</li>
        )}
      </ul>
    </MetricCard>
  );
}

export default AlertsCard; 