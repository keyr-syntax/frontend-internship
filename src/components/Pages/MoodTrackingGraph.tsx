import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
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
  ChartOptions,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { CalendarDays, TrendingUp, AlertCircle } from "lucide-react";
import BASE_URL from "@/lib/api";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Footer } from "../landing/footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface MoodData {
  value: number;
  notes?: string;
  timestamp: string;
}

const timeRanges = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
];

const moodColors = {
  happy: "rgba(255, 193, 7, 0.8)",
  calm: "rgba(33, 150, 243, 0.8)",
  sad: "rgba(158, 158, 158, 0.8)",
  angry: "rgba(244, 67, 54, 0.8)",
};

const getMoodColor = (value: number): string => {
  if (value >= 4.0) return moodColors.happy;
  if (value >= 3.0) return moodColors.calm;
  if (value >= 2.0) return moodColors.sad;
  return moodColors.angry;
};

const DailyMoodChart = () => {
  const [timeRange, setTimeRange] = useState("7");
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoodData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await BASE_URL.get(
          `/mood_tracking/mood_tracking_average?days=${timeRange}`
        );
        const formattedData = Object.entries(response.data.dailyAverages).map(([date, value]) => ({
          timestamp: date,
          value: value as number,
          notes: response.data.notes?.[date],
        }));
        setMoodData(formattedData);
      } catch (error) {
        console.error("Error fetching mood data:", error);
        setError("Failed to load mood data");
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, [timeRange]);

  const chartData = useMemo(() => {
    const sortedData = [...moodData].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return {
      labels: sortedData.map((d) => format(new Date(d.timestamp), "MMM d")),
      datasets: [
        {
          label: "Mood Level",
          data: sortedData.map((d) => d.value),
          fill: true,
          borderColor: sortedData.map((d) => getMoodColor(d.value)),
          backgroundColor: sortedData.map((d) => getMoodColor(d.value).replace("0.8", "0.2")),
          tension: 0.4,
          pointBackgroundColor: sortedData.map((d) => getMoodColor(d.value)),
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [moodData]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          color: "rgba(255, 255, 255, 0.8)",
          callback: (value) => {
            const labels = {
              1: "Very Low",
              2: "Low",
              3: "Neutral",
              4: "Good",
              5: "Excellent",
            };
            return labels[value as keyof typeof labels] || value;
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "rgba(255, 255, 255, 1)",
        bodyColor: "rgba(255, 255, 255, 0.8)",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const data = moodData[dataIndex];
            const lines = [
              `Mood Level: ${data.value.toFixed(1)}`,
              data.notes ? `Notes: ${data.notes}` : null,
            ].filter(Boolean);
            return lines;
          },
        },
      },
      annotation: {
        annotations: {
          trendline: {
            type: "line",
            borderColor: "rgba(255, 255, 255, 0.5)",
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: "Trend",
              position: "start",
            },
            scaleID: "y",
            value: moodData.reduce((acc, curr) => acc + curr.value, 0) / moodData.length,
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-4 mt-[80px] container"
    >
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mood Patterns
            </h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-gray-700/50 border-gray-600 text-white">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>{timeRanges.find((r) => r.value === timeRange)?.label}</span>
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {timeRanges.map((range) => (
                  <SelectItem
                    key={range.value}
                    value={range.value}
                    className="text-white hover:bg-gray-600"
                  >
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex items-center justify-center p-8 text-red-400">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          ) : loading ? (
            <div className="h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-gray-700/30 p-2 rounded">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">
                    Average Mood:{" "}
                    {(
                      moodData.reduce((acc, curr) => acc + curr.value, 0) / moodData.length
                    ).toFixed(1)}
                  </span>
                </div>
                {Object.entries(moodColors).map(([mood, color]) => (
                  <div
                    key={mood}
                    className="flex items-center space-x-2 bg-gray-700/30 p-2 rounded"
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm text-white capitalize">{mood}</span>
                  </div>
                ))}
              </div>
              <div className="h-[400px] w-full">
                <Line data={chartData} options={options} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <div className="mt-12 ">
        <Footer />
      </div>
    </motion.div>
  );
};

export default DailyMoodChart;
