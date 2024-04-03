"use client";

import Image from "next/image";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaginationSection } from "@/app/components/product/Pagination";
import { convertValidStringQueries } from "@/app/helper/functions";

const OrderItems = ({ order }: any) => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const searchParams = useSearchParams();
  // Calculate the indexes of the products to be displayed on the current page
  const page = searchParams.get("page") || (1 as any);
  const per_page = searchParams.get("per_page") || (10 as any);
  const lastItemsIndex = page * per_page;
  const firstItemsIndex = lastItemsIndex - per_page;
  // Extract the products for the current page
  const currentOrders = order.slice(firstItemsIndex, lastItemsIndex);
  const totalOrders = order.length;
  const totalItems = currentOrders.length;
  return (
    <div className="bg-gray-50 dark:bg-transparent text-black dark:text-white mx-5 min-[1280px]:mx-16 relative">
      <div className="mt-10 uppercase">Total Orders: {totalOrders}</div>
      <div className="py-4">
        <div className="w-full m-auto p-4 rounded-lg bg-white dark:bg-navy-800 overflow-y-auto">
          <div className="relative flex-auto block py-8 pt-6 lg:px-9">
            <div className="overflow-x-auto relative">
              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                  <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                    <th className="pb-3 text-start min-w-[175px]">Product</th>
                    <th className="pb-3 text-end min-w-[100px] invisible min-[862px]:visible">
                      Customer
                    </th>
                    <th className="pb-3 text-end min-w-[100px] invisible min-[862px]:visible">
                      Status
                    </th>
                    <th className="pb-3 pr-12 text-end min-w-[175px] invisible min-[862px]:visible">
                      Method
                    </th>
                    <th className="pb-3 min-[862px]:pr-12 text-end min-w-[100px] absolute right-0 min-[862px]:static">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders?.map((order: any) => (
                    <tr
                      className="border-b border-dashed last:border-b-0"
                      key={order.id}
                    >
                      {order.products.map(
                        (product: any, index: number) =>
                          index === 0 && (
                            <td className="p-3 pl-0" key={index}>
                              <div className="flex items-center">
                                <div className="inline-block shrink-0 rounded-2xl me-3">
                                  <Image
                                    src={
                                      product?.price_data?.product_data
                                        ?.images[0]
                                    }
                                    alt="Product Images"
                                    width={50}
                                    height={50}
                                    className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                  />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <p className="pl-4 text-sm truncate">
                                    {product?.price_data?.product_data?.name}
                                  </p>
                                  <p className="text-gray-600 sm:text-left text-left pl-4">
                                    {index === 0 && order.products.length - 1}
                                    {order.products.length === 1
                                      ? " product"
                                      : " other products"}
                                  </p>
                                </div>
                              </div>
                            </td>
                          )
                      )}
                      <td className="p-3 pr-0 text-end invisible min-[862px]:visible">
                        <span className="font-semibold text-light-inverse text-md/normal">
                          {order?.email}
                        </span>
                      </td>
                      <td className="p-3 pr-0 text-end invisible min-[862px]:visible">
                        <p className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                          {order?.paid}
                        </p>
                      </td>
                      <td className="p-3 pr-12 text-end invisible min-[862px]:visible">
                        Stripe
                      </td>
                      <td className="pr-0 text-start absolute right-0 min-[862px]:static">
                        <div className="flex items-center justify-end min-[862px]:justify-start">
                          <Link href={`/admin/orders/${order?.id}`}>
                            <FaEye className="text-purple-800 dark:text-white mr-2 cursor-pointer" />
                          </Link>
                          <Link
                            className="pl-2"
                            href={`/admin/orders/delete/${order?.id}`}
                          >
                            <AiTwotoneDelete className="text-purple-800 dark:text-white mr-2 cursor-pointer" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pr-10">
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

export default OrderItems;
