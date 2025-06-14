import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaceChart = ({ paceCategory, durationSeconds }) => {
  const generatePaceData = () => {
    const baseWPM = paceCategory === "high" ? 170 : (paceCategory === "medium" ? 150 : 130);
    const dataPoints = [];
    const interval = 10; // seconds per interval
    let currentStart = 0;

    while (currentStart < durationSeconds) {
      const currentEnd = Math.min(currentStart + interval, durationSeconds);
      const timeLabel = `${currentStart}-${currentEnd}s`;
      // Simulate WPM fluctuation around the baseWPM
      const wpm = baseWPM + (Math.random() - 0.5) * 40; // +/- 20 WPM
      dataPoints.push({ time: timeLabel, wpm: Math.max(0, wpm) }); // Ensure WPM is not negative
      currentStart += interval;
    }
    return dataPoints;
  };

  const dataPoints = generatePaceData();

  if (dataPoints.length === 0) {
    return <div className="text-center text-gray-500">No pace data available for this duration.</div>;
  }

  const data = {
    labels: dataPoints.map(p => p.time),
    datasets: [
      {
        label: 'Words Per Minute',
        data: dataPoints.map(p => p.wpm),
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // blue-500 with opacity
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Pace Analysis (Words Per Minute)',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += Math.round(context.parsed.y) + ' WPM';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 200,
        title: {
          display: true,
          text: 'WPM',
        },
      },
    },
  };

  return (
    <div className="h-48 w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaceChart;