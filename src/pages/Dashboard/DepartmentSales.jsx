import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentSales = () => {
  // আপনার লাইব্রেরি/বই বিভাগ অনুযায়ী ডাটা
  const data = {
    labels: [
      "Novels",
      "History",
      "Science Fiction",
      "Biography",
      "Adventure",
    ],
    datasets: [
      {
        label: "Books Added",
        data: [40, 25, 30, 15, 20], // প্রতিটি বিভাগের বই সংখ্যা
        backgroundColor: [
          "#2563EB", // Novels
          "#4CAF50", // History
          "#FF9800", // Science Fiction
          "#E91E63", // Biography
          "#26A69A", // Adventure
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed} books`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full hover:cursor-pointer">
      <h3 className="text-lg font-semibold mb-4 text-[#2563EB]">
        Library Department Book Statistics
      </h3>
      <p className="mb-2 text-gray-600 text-sm">
        This chart shows the number of books in different sections of your library.
      </p>
      <div className="h-[400px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DepartmentSales;