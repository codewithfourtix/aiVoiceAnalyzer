import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
    const baseWPM =
      paceCategory === "high" ? 170 : paceCategory === "medium" ? 150 : 130;
    const dataPoints = [];
    const interval = 10;
    let currentStart = 0;

    while (currentStart < durationSeconds) {
      const currentEnd = Math.min(currentStart + interval, durationSeconds);
      const timeLabel = `${currentStart}-${currentEnd}s`;
      const wpm = baseWPM + (Math.random() - 0.5) * 40;
      dataPoints.push({ time: timeLabel, wpm: Math.max(0, wpm) });
      currentStart += interval;
    }
    return dataPoints;
  };

  const dataPoints = generatePaceData();

  if (dataPoints.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No pace data available for this duration.
      </div>
    );
  }

  const data = {
    labels: dataPoints.map((p) => p.time),
    datasets: [
      {
        label: "Words Per Minute",
        data: dataPoints.map((p) => p.wpm),
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 2,
        borderRadius: 8,
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
        text: "Pace Analysis (Words Per Minute)",
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#374151",
      },
      tooltip: {
        backgroundColor: "rgba(139, 92, 246, 0.9)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `${Math.round(context.parsed.y)} WPM`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
      y: {
        beginAtZero: true,
        max: 200,
        title: {
          display: true,
          text: "WPM",
          color: "#6B7280",
          font: {
            weight: "bold",
          },
        },
        ticks: {
          color: "#6B7280",
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaceChart;
