import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import { FaBolt } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './PerformanceCard.module.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PerformanceCard() {
  const [performance, setPerformance] = useState({
    currentResponseTime: '...',
    p95ResponseTime: '...',
    p99ResponseTime: '...',
    errorRate: '...',
    chartData: {
      labels: Array(12).fill(''),
      datasets: [
        {
          label: 'Response Time (ms)',
          data: Array(12).fill(0),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3,
          pointRadius: 0,
        },
      ],
    }
  });
  const [loading, setLoading] = useState(true);

  // Generate random performance data
  const generatePerformanceData = () => {
    // Base response time (30-80ms)
    const baseResponseTime = 30 + Math.random() * 50;
    
    // Random previous response times with some variation
    const previousData = [];
    for (let i = 0; i < 12; i++) {
      // Add some spikes and variations
      const variation = Math.random() > 0.8 
        ? baseResponseTime * (0.5 + Math.random() * 1) // Occasional spike
        : baseResponseTime * (0.8 + Math.random() * 0.4); // Normal variation
      
      previousData.push(Math.round(variation));
    }
    
    // Current response time (last value)
    const currentResponseTime = previousData[previousData.length - 1];
    
    // Calculate p95 and p99 (simplified for demonstration)
    const sortedData = [...previousData].sort((a, b) => a - b);
    const p95Index = Math.floor(sortedData.length * 0.95);
    const p99Index = Math.floor(sortedData.length * 0.99);
    
    return {
      currentResponseTime: `${currentResponseTime} ms`,
      p95ResponseTime: `${sortedData[p95Index] || sortedData[sortedData.length-1]} ms`,
      p99ResponseTime: `${sortedData[p99Index] || sortedData[sortedData.length-1]} ms`,
      errorRate: `${(Math.random() * 2).toFixed(2)}%`,
      chartData: {
        labels: Array(12).fill(''),
        datasets: [
          {
            label: 'Response Time (ms)',
            data: previousData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      }
    };
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPerformance(generatePerformanceData());
      setLoading(false);
    }, 1000);
    
    // Update data occasionally
    const interval = setInterval(() => {
      setPerformance(generatePerformanceData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        suggestedMax: 200,
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      }
    },
    animation: {
      duration: 500,
    }
  };

  return (
    <MetricCard 
      title="API Performance" 
      icon={<FaBolt />}
      loading={loading}
    >
      <div className={styles.performanceContainer}>
        <div className={styles.chartContainer}>
          <Line data={performance.chartData} options={chartOptions} />
        </div>
        
        <div className={styles.metricsContainer}>
          <div className={styles.mainMetric}>
            <div className={styles.metricLabel}>Current Response Time</div>
            <div className={styles.metricValue}>{performance.currentResponseTime}</div>
          </div>
          
          <div className={styles.secondaryMetrics}>
            <div className={styles.metricItem}>
              <div className={styles.metricLabel}>P95</div>
              <div className={styles.metricValue}>{performance.p95ResponseTime}</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricLabel}>P99</div>
              <div className={styles.metricValue}>{performance.p99ResponseTime}</div>
            </div>
            <div className={styles.metricItem}>
              <div className={styles.metricLabel}>Error Rate</div>
              <div className={styles.metricValue}>{performance.errorRate}</div>
            </div>
          </div>
        </div>
      </div>
    </MetricCard>
  );
}

export default PerformanceCard; 