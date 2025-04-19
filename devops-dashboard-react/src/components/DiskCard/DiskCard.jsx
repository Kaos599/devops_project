import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, 
  Tooltip,
  Legend,
} from 'chart.js';
import cardStyles from '../MetricCard/MetricCard.module.css';

// Register Chart.js components needed
ChartJS.register(ArcElement, Tooltip, Legend);

const TOTAL_DISK = 512; // Example total disk space in GB

function DiskCard() {
  const [diskData, setDiskData] = useState({
    valueText: 'Loading...',
    chartData: {
      labels: ['Used', 'Free'],
      datasets: [
        {
          label: 'Disk Space (GB)',
          data: [0, TOTAL_DISK], // Initial: 0 used
          backgroundColor: [
            'rgba(255, 159, 64, 0.6)', // Used - Orange
            'rgba(54, 162, 235, 0.6)', // Free - Blue
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate disk usage update (less volatile than memory/cpu)
      const used = Math.floor(Math.random() * TOTAL_DISK * 0.7); // Simulate usage up to 70%
      const free = TOTAL_DISK - used;

      setDiskData({
        valueText: `${used} GB Used / ${TOTAL_DISK} GB Total`,
        chartData: {
          ...diskData.chartData,
          datasets: [
            {
              ...diskData.chartData.datasets[0],
              data: [used, free],
            },
          ],
        },
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId);
  }, [diskData.chartData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
            padding: 15
        }
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
        duration: 400 // Slightly slower animation
    }
  };

  return (
    <MetricCard title="Disk Usage">
       <div style={{ height: '150px', marginBottom: '15px' }}>
        <Doughnut data={diskData.chartData} options={chartOptions} />
      </div>
      <p className={cardStyles.metric} id="disk-value">
        {diskData.valueText}
      </p>
    </MetricCard>
  );
}

export default DiskCard; 