"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ order }: any) => {
  const [chartData, setChartData] = useState<any>({
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales $",
        data: Array(7).fill(0),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const calculateRevenue = () => {
      const dailyRevenueArray: number[] = Array(7).fill(0);
      const weeklyRevenueArray: number[] = Array(7).fill(0);

      order.forEach((orderItem: any) => {
        const orderDayOfWeek = moment(orderItem.createdAt).day();
        const orderRevenue = orderItem.products.reduce(
          (acc: number, product: any) =>
            acc + (product?.price_data?.unit_amount || 0),
          0
        );
        dailyRevenueArray[orderDayOfWeek] += orderRevenue;
        weeklyRevenueArray[orderDayOfWeek] += orderRevenue;
      });

      setChartData((prevChartData: any) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: dailyRevenueArray,
          },
        ],
      }));

      // If today is Sunday, update weekly revenue
      if (moment().day() === 0) {
        setChartData((prevChartData: any) => ({
          ...prevChartData,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: weeklyRevenueArray,
            },
          ],
        }));
      }
    };

    calculateRevenue();

    const msUntilNextDay = moment().endOf("day").valueOf() - moment().valueOf();
    const dailyInterval = setInterval(() => {
      calculateRevenue();
    }, msUntilNextDay);

    // Calculate time until next Sunday
    const today = moment().day();
    const daysUntilSunday = today === 0 ? 7 : 7 - today;
    const msUntilNextSunday =
      moment().endOf("day").add(daysUntilSunday, "days").valueOf() -
      moment().valueOf();
    const weeklyInterval = setInterval(() => {
      calculateRevenue();
    }, msUntilNextSunday);

    return () => {
      clearInterval(dailyInterval);
      clearInterval(weeklyInterval);
    };
  }, [order]);

  return (
    <div className="w-full md:col-span-2 relative md:h-[50%] p-4 rounded-lg bg-white dark:bg-navy-800 dark:text-white">
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              type: "category",
              labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
