"use client";

import { BsThreeDotsVertical } from "react-icons/bs";
import moment from "moment";
import Image from "next/image";
import { PaginationSection } from "@/app/components/product/Pagination";
import { convertValidStringQueries } from "@/app/helper/functions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const CustomerItems = ({ order }: any) => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const searchParams = useSearchParams();
  // Calculate the indexes of the products to be displayed on the current page
  const page = searchParams.get("page") || (1 as any);
  const per_page = searchParams.get("per_page") || (10 as any);
  const lastItemsIndex = page * per_page;
  const firstItemsIndex = lastItemsIndex - per_page;
  // Extract the products for the current page
  const currentCustomers = order.slice(firstItemsIndex, lastItemsIndex);
  const totalCustomers = order.length;
  const totalItems = currentCustomers.length;
  return (
    <div className="bg-gray-100 dark:bg-navy-900 min-h-screen">
      <div className="mt-10 pl-10 uppercase">
        Total Customers: {totalCustomers}
      </div>
      <div className="py-4 px-5 md:px-10">
        <div className="w-full m-auto p-4 rounded-lg bg-white dark:bg-navy-800 overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
          </div>
          <ul>
            {currentCustomers.map((item: any, idx: any) => (
              <li
                key={idx}
                className="bg-gray-50 hover:bg-gray-100 dark:bg-navy-700 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-lg">
                    <Image
                      src={item?.user.image}
                      alt="user image"
                      width={50}
                      height={50}
                    />
                  </div>
                  <p className="pl-4">{item.name}</p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {item.email}
                </p>
                <p className="hidden md:flex">
                  {moment(item?.createdAt).fromNow()}
                </p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>Stripe</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
          <div className="">
            <PaginationSection
              totalItems={totalItems}
              convertValidStringQueries={convertValidStringQueries}
              selected={selected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerItems;
