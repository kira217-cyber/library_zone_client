import React from "react";
import CountUp from "react-countup";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DepartmentSales from "./DepartmentSales";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  // Summary card data
  const summaryData = [
    { title: "TOTAL USER", value: 7591, color: "bg-red-500", icon: "👤" },
    { title: "TOTAL BOOKS", value: 4875, color: "bg-green-500", icon: "📝" },
    { title: "TOTAL FOLLOWERS", value: 9854, color: "bg-gray-800", icon: "👥" },
    { title: "ARTICLES", value: 4584, color: "bg-blue-600", icon: "📄" },
  ];

  // Bar Chart Data (Load Average)
  const barData = {
    labels: [
      "20:25",
      "20:30",
      "20:35",
      "20:40",
      "20:45",
      "20:50",
      "20:55",
      "21:00",
      "21:05",
    ],
    datasets: [
      {
        label: "Load Average",
        data: [20, 15, 10, 15, 25, 40, 60, 80, 85],
        backgroundColor: [
          "#2563EB",
          "#4CAF50",
          "#FF9800",
          "#E91E63",
          "#26A69A",
          "#9C27B0",
          "#00BCD4",
          "#F44336",
          "#8BC34A",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: "#2563EB",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Load: ${context.parsed.y}`;
          },
        },
      },
    },
    animation: { duration: 1500, easing: "easeOutBounce" },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#eee" },
        ticks: { stepSize: 20 },
      },
    },
  };

  // Line Chart Data
  const lineData = {
    labels: [
      "21:10",
      "21:15",
      "21:20",
      "21:25",
      "21:30",
      "21:35",
      "21:40",
      "21:45",
      "21:50",
    ],
    datasets: [
      {
        label: "Process 1",
        data: [5, 15, 30, 50, 80, 120, 150, 180, 200],
        borderColor: "orange",
        backgroundColor: "orange",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Process 2",
        data: [3, 10, 20, 35, 55, 80, 100, 120, 130],
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    animation: { duration: 1500, easing: "easeInOutQuart" },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`${item.color} text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300`}
          >
            <div className="text-4xl">{item.icon}</div>
            <h2 className="text-3xl font-bold">
              <CountUp end={item.value} duration={10} separator="," />
            </h2>
            <p className="mt-2 text-sm">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-[#2563EB]">Load Average</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Processes</h3>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
      <div className="mt-6">
        <DepartmentSales />
      </div>
    </div>
  );
};

export default Statistics;