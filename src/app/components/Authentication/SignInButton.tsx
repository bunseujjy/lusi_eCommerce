"use client";

import Image from "next/image";
import { useState } from "react";

const SignInButton = () => {
  const [pfOpen, setPfOpen] = useState(false);
  return (
    <div className="relative">
      <Image
        id="avatarButton"
        typeof="button"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="w-8 h-8 rounded-full cursor-pointer"
        src="/jjy.jpg"
        alt="User dropdown"
        width={40}
        height={40}
        onClick={() => setPfOpen(!pfOpen)}
      />

      <div
        id="userDropdown"
        className={`z-10 absolute right-0 top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
          pfOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          {/* <div>{session.username}</div>
          <div className="font-medium truncate">{session.email}</div> */}
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInButton;
