"use client";

import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneDelete } from "react-icons/ai";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaginationSection } from "@/app/components/product/Pagination";
import { convertValidStringQueries } from "@/app/helper/functions";

const UserItems = ({ user }: any) => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const searchParams = useSearchParams();
  // Calculate the indexes of the products to be displayed on the current page
  const page = searchParams.get("page") || (1 as any);
  const per_page = searchParams.get("per_page") || (10 as any);
  const lastItemsIndex = page * per_page;
  const firstItemsIndex = lastItemsIndex - per_page;
  // Extract the products for the current page
  const currentUsers = user.slice(firstItemsIndex, lastItemsIndex);
  const totalUsers = user.length;
  const totalItems = currentUsers.length;
  return (
    <div className="text-black dark:text-slate-50 mx-5 min-[1280px]:mx-16 relative mt-5">
      <div className="flex justify-between py-4 items-center">
        <Link
          href="/admin/user/add-user"
          className="bg-cyan-500 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 p-3 rounded-lg flex items-center"
        >
          Add User
        </Link>
      </div>
      <div className="pt-2 uppercase">Total Users: {totalUsers}</div>
      <div className="py-2">
        <div className="w-full m-auto p-4 rounded-lg bg-white dark:bg-navy-800 overflow-y-auto">
          <div className="my-3 p-2 grid min-[664px]:grid-cols-2 md:grid-cols-5 sm:grid-cols-2 grid-cols-2 gap-10 items-center justify-between">
            <span>User</span>
            <span className="hidden text-right md:block md:text-left">
              Email
            </span>
            <span className="hidden md:grid">Role</span>
            <span className="text-right md:text-left md:grid">Edit</span>
            <span className="hidden md:grid">Delete</span>
          </div>
          <ul>
            {currentUsers &&
              currentUsers.map((user: any, id: any) => (
                <li
                  key={id}
                  className="bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 gap-10 sm:grid-cols-2 grid-cols-2 items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-100 dark:bg-navy-600 rounded-lg">
                      <Image
                        src={user.image as string}
                        alt="User Image"
                        className="w-full h-full object-cover"
                        width={50}
                        height={50}
                      />
                    </div>
                    <p className="pl-4 truncate">{user.name}</p>
                  </div>
                  <p className="hidden md:block text-gray-600 dark:text-slate-50 sm:text-left text-right truncate">
                    {user.email}
                  </p>
                  <p className="hidden md:flex">{user.role}</p>
                  <div className="flex items-center justify-end md:justify-normal">
                    <div className="md:flex md:items-center">
                      <Link
                        href={`/admin/user/edit/${user.id}`}
                        className="bg-purple-100 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 p-3 rounded-lg flex items-center cursor-pointer"
                      >
                        <FaRegEdit className="text-purple-800 dark:text-white  mr-2" />
                        Edit
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center">
                    <Link
                      href={`/admin/user/delete/${user.id}`}
                      className="bg-purple-100 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 p-3 rounded-lg flex items-center  cursor-pointer"
                    >
                      <AiTwotoneDelete className="text-purple-800 dark:text-white  mr-2" />
                      Delete
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
          <div className="pr-20">
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

export default UserItems;
