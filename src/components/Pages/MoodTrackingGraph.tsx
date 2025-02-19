import { useEffect, useState } from "react";
import axios from "axios";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const legendLabels = [
  { text: "Good Mood (4.0 - 5.0)", color: "bg-teal-400" },
  { text: "Mixed Mood (2.6 - 3.9)", color: "bg-yellow-400" },
  { text: "Bad Mood (1.0 - 2.5)", color: "bg-red-500" },
];

const DailyMoodChart = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchDailyAverages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/mood_tracking/mood_tracking_average",
          {
            withCredentials: true,
          }
        );
        const averages = response.data.dailyAverages;

        setLabels(Object.keys(averages));
        setData(Object.values(averages));
      } catch (error) {
        console.error("Error fetching daily averages:", error);
      }
    };

    fetchDailyAverages();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Daily Mood Average",
        data: data,
        fill: false,
        borderColor: "rgba(192,192,75,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full p-4 my-[80px]">
      <p className="text-white text-center mb-4 text-lg sm:text-xl">
        Your Mood Patterns
      </p>

      <div className="flex flex-col justify-start  items-center space-y-2 mb-4">
        {legendLabels.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className={`w-4 h-4 ${item.color} rounded-full`} />
            <span className="text-white text-sm">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[600px] mx-auto overflow-x-auto rounded-lg">
        <div className="h-[300px] sm:h-[350px] md:h-[400px] w-full">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DailyMoodChart;
