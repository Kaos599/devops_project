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

function CpuCard() {
  const [cpuData, setCpuData] = useState({
    value: 'Loading...',
    chartData: {
      labels: Array(10).fill(''), // Initial empty labels
      datasets: [
        {
          label: 'CPU Usage %',
          data: Array(10).fill(0), // Initial zero data
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
          pointRadius: 0, // Hide points
        },
      ],
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newValue = Math.floor(Math.random() * 100);
      setCpuData(prevData => {
        const newData = [...prevData.chartData.datasets[0].data.slice(1), newValue];
        const newLabels = [...prevData.chartData.labels.slice(1), '' ] // Keep label count same
        return {
          value: `${newValue}% Usage`,
          chartData: {
            ...prevData.chartData,
            labels: newLabels,
            datasets: [
              {
                ...prevData.chartData.datasets[0],
                data: newData,
              },
            ],
          },
        };
      });
    }, 2000); // Update every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container height
    scales: {
        x: {
            display: false, // Hide x-axis labels
        },
        y: {
            beginAtZero: true,
            max: 100, // Assuming CPU % max is 100
        }
    },
    plugins: {
        legend: {
            display: false // Hide legend
        },
        tooltip: {
            enabled: false // Disable tooltips for cleaner look
        }
    },
    animation: {
        duration: 200 // Faster animation for smoother updates
    }
  };

  return (
    <MetricCard title="CPU Usage">
        <div style={{ height: '150px' }}> {/* Set a fixed height for the chart container */}
         <Line data={cpuData.chartData} options={chartOptions} />
        </div>
      <p className={cardStyles.metric} id="cpu-value">{cpuData.value}</p>
    </MetricCard>
  );
}

export default CpuCard; 