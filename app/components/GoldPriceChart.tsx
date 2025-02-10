"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useTranslations } from "next-intl"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function GoldPriceChart({ data }) {
  const t = useTranslations("GoldPriceChart")

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: t("goldPrice"),
        data: data.map((item) => item.price),
        borderColor: "rgb(255, 215, 0)",
        backgroundColor: "rgba(255, 215, 0, 0.5)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: t("chartTitle"),
        color: "white",
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
  }

  return <Line options={options} data={chartData} />
}

