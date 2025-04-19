import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, // Needed for Doughnut
  Tooltip,
  Legend,
} from 'chart.js';
import cardStyles from '../MetricCard/MetricCard.module.css';

// Register Chart.js components needed for Doughnut
ChartJS.register(ArcElement, Tooltip, Legend);

const TOTAL_MEMORY = 128;

function MemoryCard() {
  const [memoryData, setMemoryData] = useState({
    valueText: 'Loading...',
    chartData: {
      labels: ['Used', 'Free'],
      datasets: [
        {
          label: 'Memory (GB)',
          data: [0, TOTAL_MEMORY], // Initial: 0 used, all free
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)', // Used - Red
            'rgba(75, 192, 192, 0.6)', // Free - Green
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const used = Math.floor(Math.random() * TOTAL_MEMORY * 0.8); // Simulate usage up to 80%
      const free = TOTAL_MEMORY - used;

      setMemoryData({
        valueText: `${used} GB / ${TOTAL_MEMORY} GB`,
        chartData: {
          // Keep labels the same
          ...memoryData.chartData, 
          datasets: [
            {
              ...memoryData.chartData.datasets[0],
              data: [used, free],
            },
          ],
        },
      });
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(intervalId);
  }, [memoryData.chartData]); // Dependency needed to keep chartData reference stable in update

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
        duration: 300 
    }
  };

  return (
    <MetricCard title="Memory Usage">
      <div style={{ height: '150px', marginBottom: '15px' }}>
        <Doughnut data={memoryData.chartData} options={chartOptions} />
      </div>
      <p className={cardStyles.metric} id="memory-value">
        {memoryData.valueText}
      </p>
    </MetricCard>
  );
}

export default MemoryCard; 