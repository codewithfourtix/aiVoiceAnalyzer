import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const OverallPerformanceChart = ({ userConfidence }) => {
  const data = {
    labels: ["Confidence Level"],
    datasets: [
      {
        label: "Your Confidence",
        data: [userConfidence],
        borderColor: "rgba(139, 92, 246, 1)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(139, 92, 246, 1)",
        pointBorderColor: "white",
        pointBorderWidth: 3,
        pointRadius: 8,
      },
      {
        label: "Average Confidence",
        data: [70],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "white",
        pointBorderWidth: 3,
        pointRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Overall Performance: Confidence Level",
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
            return `${context.dataset.label}: ${context.parsed.y}%`;
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
        max: 100,
        title: {
          display: true,
          text: "Confidence (%)",
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
      <Line data={data} options={options} />
    </div>
  );
};

export default OverallPerformanceChart;
