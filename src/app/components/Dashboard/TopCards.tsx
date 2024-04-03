"use client";

import { IOrder } from "@/app/(route)/order/page";
import moment from "moment";
import { useEffect, useState } from "react";

const TopCards = ({ order, user }: any) => {
  const totalOfCustomer = order?.length + user?.length;
  const customerPercentage = totalOfCustomer / 100;
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  useEffect(() => {
    // Calculate daily revenue
    const calculateDailyRevenue = () => {
      const todayOrders = order.filter((order: IOrder) =>
        moment(order.createdAt).isSame(moment(), "day")
      );
      const dailyRevenue = todayOrders.reduce(
        (total: number, orderItem: any) => {
          return (
            total +
            orderItem.products.reduce((acc: number, product: any) => {
              return acc + (product?.price_data?.unit_amount || 0);
            }, 0)
          );
        },
        0
      );
      setDailyRevenue(dailyRevenue);
    };

    calculateDailyRevenue();

    // Reset daily revenue at the beginning of each day
    const nextDay = moment().endOf("day").add(1, "milliseconds");
    const msUntilNextDay = nextDay.diff(moment());
    const resetDailyRevenueTimeout = setTimeout(() => {
      setDailyRevenue(0);
    }, msUntilNextDay);

    return () => clearTimeout(resetDailyRevenueTimeout);
  }, [order]);

  useEffect(() => {
    // Calculate monthly revenue
    const calculateMonthlyRevenue = () => {
      const thisMonthOrders = order.filter((order: IOrder) =>
        moment(order.createdAt).isSame(moment(), "month")
      );

      const monthlyRevenue = thisMonthOrders.reduce(
        (total: number, orderItem: any) => {
          const orderTotal = orderItem.products.reduce(
            (acc: number, product: any) => {
              return acc + (product.price_data?.unit_amount || 0);
            },
            0
          );
          return total + orderTotal;
        },
        0
      );
      setMonthlyRevenue(monthlyRevenue);
    };

    calculateMonthlyRevenue();

    // Reset monthly revenue at the beginning of each month
    const intervalId = setInterval(() => {
      const now = moment();
      const startOfNextMonth = moment().endOf("month").add(1, "milliseconds");
      if (now.isSame(startOfNextMonth, "month")) {
        calculateMonthlyRevenue();
      }
    }, 1000 * 60); // Check every minute to determine if a new month has started

    return () => clearInterval(intervalId);
  }, [order]);

  return (
    <div className="grid lg:grid-cols-6 gap-4 py-4">
      <div className="lg:col-span-2 col-span-1 bg-white dark:bg-navy-800 flex justify-between w-full p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${dailyRevenue}</p>
          <p className="text-gray-600">Daily Revenue</p>
        </div>
        <p className="bg-green-200 dark:bg-brand-300 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg  dark:text-white">+18%</span>
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white dark:bg-navy-800 flex justify-between w-full p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${monthlyRevenue}</p>
          <p className="text-gray-600">Monthly Revenue</p>
        </div>
        <p className="bg-green-200 dark:bg-brand-300 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg  dark:text-white">+11%</span>
        </p>
      </div>

      <div className="lg:col-span-2 col-span-1 bg-white dark:bg-navy-800 flex justify-between w-full p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{totalOfCustomer}</p>
          <p className="text-gray-600">Customers</p>
        </div>
        <p className="bg-green-200 dark:bg-brand-300 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg  dark:text-white">
            +{customerPercentage.toFixed(2)}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default TopCards;
