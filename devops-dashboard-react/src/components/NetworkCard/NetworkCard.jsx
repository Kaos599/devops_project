import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard';
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
import cardStyles from '../MetricCard/MetricCard.module.css'; // Reuse metric style

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

const MAX_DATAPOINTS = 15;

function NetworkCard() {
  const [networkData, setNetworkData] = useState({
    sentText: 'Loading...',
    receivedText: 'Loading...',
    chartData: {
      labels: Array(MAX_DATAPOINTS).fill(''),
      datasets: [
        {
          label: 'Sent (KB/s)',
          data: Array(MAX_DATAPOINTS).fill(0),
          borderColor: 'rgb(255, 99, 132)', // Red for sent
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.2,
          pointRadius: 0, 
        },
        {
          label: 'Received (KB/s)',
          data: Array(MAX_DATAPOINTS).fill(0),
          borderColor: 'rgb(54, 162, 235)', // Blue for received
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate network traffic (KB/s)
      const newSent = Math.floor(Math.random() * 500) + 50; // 50-550 KB/s
      const newReceived = Math.floor(Math.random() * 1500) + 100; // 100-1600 KB/s

      setNetworkData(prevData => {
        const updateDataset = (dataset, newValue) => [
          ...dataset.data.slice(1),
          newValue,
        ];
        const newLabels = [...prevData.chartData.labels.slice(1), ''];

        return {
          sentText: `${newSent} KB/s`,
          receivedText: `${newReceived} KB/s`,
          chartData: {
            ...prevData.chartData,
            labels: newLabels,
            datasets: [
              {
                ...prevData.chartData.datasets[0],
                data: updateDataset(prevData.chartData.datasets[0], newSent),
              },
              {
                ...prevData.chartData.datasets[1],
                data: updateDataset(prevData.chartData.datasets[1], newReceived),
              },
            ],
          },
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId);
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
            // Can add suggestedMax if needed, e.g., 2000
        }
    },
    plugins: {
        legend: {
             position: 'bottom', // Show legend for Sent/Received
             labels: { padding: 15 }
        },
        tooltip: {
            enabled: true, // Enable tooltips for details
            mode: 'index', // Show both values on hover
            intersect: false,
        }
    },
    animation: {
        duration: 250 
    }
  };

  return (
    <MetricCard title="Network I/O">
        <div style={{ height: '150px' }}> 
         <Line data={networkData.chartData} options={chartOptions} />
        </div>
        <div className={cardStyles.networkValues}> {/* Use a container for side-by-side text */} 
          <p className={cardStyles.metric}><span className={cardStyles.arrowUp}>↑</span> Sent: {networkData.sentText}</p>
          <p className={cardStyles.metric}><span className={cardStyles.arrowDown}>↓</span> Received: {networkData.receivedText}</p>
        </div>
    </MetricCard>
  );
}

export default NetworkCard; 