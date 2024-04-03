import { IOrder } from "@/app/(route)/order/page";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";

const RecentOrders = ({ order }: any) => {
  const calculateSubtotal = (order: IOrder) => {
    return order.products.reduce(
      (acc: number, currentProduct: any) =>
        acc +
        (currentProduct.price_data.unit_amount / 100) * currentProduct.quantity,
      0
    );
  };
  return (
    <div className="w-full col-span-1 relative  p-4 rounded-lg bg-white dark:bg-navy-800">
      <h1>Recent Orders</h1>
      <ul>
        {order.slice(0, 10).map((orderItem: IOrder) => (
          <li
            key={orderItem?.id}
            className="bg-gray-50 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-dark-600 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-purple-100 dark:bg-brand-300 rounded-lg p-3">
              <FaShoppingBag className="text-purple-800 dark:text-white" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 dark:text-white font-bold">
                ${calculateSubtotal(orderItem).toFixed(2)}
              </p>
              <p className="text-gray-400 dark:text-white text-sm">
                {orderItem.name}
              </p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm">
              {moment(orderItem?.createdAt).fromNow()}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/admin/orders"
        className="p-2 text-black hover:text-slate-400 dark:text-cyan-500 dark:hover:text-cyan-700"
      >
        Views All
      </Link>
    </div>
  );
};

export default RecentOrders;
