"use client";

import Link from "next/link";
import { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";

const ProductActions = ({ product }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PiDotsThreeOutlineVerticalDuotone />
      </button>

      <div
        id="dropdown"
        className={`relative z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="absolute py-2 text-sm text-gray-700 dark:text-gray-200 flex items-center flex-col dark:bg-navy-700 px-5 rounded-r-md">
          <div className="md:flex md:items-center w-full py-2">
            <Link
              href={`/admin/products/edit/${product.id}`}
              className="bg-purple-100 focus:ring duration-150 border dark:text-white dark:border-brand-700 cursor-pointer dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-purple-50 hover:border-navy-700 hover:dark:border-navy-600 p-3 rounded-lg flex items-center justify-center text-black"
            >
              <FaRegEdit className="text-purple-800 mr-2 dark:text-white" />
              Edit
            </Link>
          </div>

          <div className="md:flex md:items-center w-full">
            <Link
              href={`/admin/products/delete/${product.id}`}
              className="bg-purple-100 focus:ring duration-150 border dark:text-white dark:border-brand-700 cursor-pointer dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-purple-50 hover:border-navy-700 hover:dark:border-navy-600 p-3 rounded-lg flex items-center text-black"
            >
              <AiTwotoneDelete className="text-purple-800 dark:text-white mr-2" />
              Delete
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
