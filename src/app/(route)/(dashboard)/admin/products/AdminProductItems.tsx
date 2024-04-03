"use client";

import ProductActions from "@/app/components/Button/ProductActions";
import { FaRegEdit } from "react-icons/fa";
import { PaginationSection } from "@/app/components/product/Pagination";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneDelete } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { convertValidStringQueries } from "@/app/helper/functions";
import { useState } from "react";

const AdminProductItems = ({ product }: any) => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const searchParams = useSearchParams();
  // Calculate the indexes of the products to be displayed on the current page
  const page = searchParams.get("page") || (1 as any);
  const per_page = searchParams.get("per_page") || (10 as any);
  const lastItemsIndex = page * per_page;
  const firstItemsIndex = lastItemsIndex - per_page;
  // Extract the products for the current page
  const currentProducts = product.slice(firstItemsIndex, lastItemsIndex);
  const totalProducts = product.length;
  const totalItems = currentProducts.length;
  return (
    <div className="bg-gray-50 dark:bg-transparent text-black dark:text-white mx-5 min-[1280px]:mx-16 relative mt-5">
      <div className="flex justify-between pt-4 items-center">
        <Link
          href="/admin/products/add-product"
          className="bg-cyan-500 focus:ring duration-150 text-white dark:border-brand-700 cursor-pointer dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-cyan-400 hover:border-navy-700 hover:dark:border-navy-600 p-3 rounded-lg"
        >
          Add Product
        </Link>
      </div>
      <div className="pt-4 uppercase">Total Products: {totalProducts}</div>
      <div className="py-4">
        <div className="w-full m-auto p-4 rounded-lg bg-white dark:bg-navy-800 overflow-y-auto">
          <div className="flex-auto block py-8 pt-6 px-3 md:px-9">
            <div className="overflow-x-auto">
              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                  <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                    <th className="pb-3 text-start min-w-[175px]">Product</th>
                    <th className="pb-3 pr-12 text-end min-w-[175px] absolute right-0 md:hidden">
                      Actions
                    </th>
                    <th className="pb-3 text-end min-w-[100px] invisible md:visible">
                      Price
                    </th>
                    <th className="pb-3 text-end min-w-[100px] invisible md:visible">
                      Category
                    </th>
                    <th className="pb-3 pr-12 text-end min-w-[175px] invisible md:visible">
                      Edit
                    </th>
                    <th className="pb-3 pr-5 text-end min-w-[100px] invisible md:visible">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts &&
                    currentProducts.map((product: any, id: any) => (
                      <tr
                        className="border-b border-dashed last:border-b-0"
                        key={id}
                      >
                        <td className="p-3 pl-0" key={product?.id}>
                          <div className="flex items-center">
                            <div className="relative inline-block shrink-0 rounded-2xl me-3">
                              <Image
                                src={product.images}
                                alt="Product Images"
                                width={50}
                                height={50}
                                className="object-cover object-center rounded border align-middle inline-block"
                              />
                            </div>
                            <div className="flex flex-col justify-start">
                              <p className="pl-4 text-sm">{product?.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 pr-12 text-end absolute right-0 md:hidden">
                          <ProductActions product={product} />
                        </td>
                        <td className="p-3 pr-0 text-end invisible md:visible">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            ${product.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-3 pr-0 text-end invisible md:visible">
                          <p className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                            {product.category
                              .map(
                                (item: any) =>
                                  item.charAt(0).toUpperCase() + item.slice(1)
                              )
                              .join(", ")}
                          </p>
                        </td>
                        <td className="pr-0 text-start invisible md:visible">
                          <div className="md:flex md:items-center justify-end mr-6">
                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              className="bg-purple-100 focus:ring duration-150 border dark:text-white dark:border-brand-700 cursor-pointer dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-purple-50 hover:border-navy-700 hover:dark:border-navy-600 p-3 rounded-lg flex items-center text-black"
                            >
                              <FaRegEdit className="text-purple-800 mr-2 dark:text-white" />
                              Edit
                            </Link>
                          </div>
                        </td>
                        <td className="pr-0 text-start invisible md:visible">
                          <div className="md:flex md:items-center">
                            <Link
                              href={`/admin/products/delete/${product.id}`}
                              className="bg-purple-100 focus:ring duration-150 border dark:text-white dark:border-brand-700 cursor-pointer dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-purple-50 hover:border-navy-700 hover:dark:border-navy-600 p-3 rounded-lg flex items-center text-blackhidden "
                            >
                              <AiTwotoneDelete className="text-purple-800 dark:text-white mr-2" />
                              Delete
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

export default AdminProductItems;
