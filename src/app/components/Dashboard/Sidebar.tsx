"use client";

import Link from "next/link";
import { menuItems } from "@/app/helper/items-list-icon";
import { CgCloseO } from "react-icons/cg";
import { useBetween } from "use-between";
import { StateProps } from "../../../lib/StateProps";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useBetween(StateProps);
  const pathname = usePathname();

  const btnRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const closeOutside = (e: any) => {
      if (e.path[0] !== btnRef.current) {
        setIsOpen;
      }

      document.body.addEventListener("click", closeOutside);

      return () => document.body.removeEventListener("click", closeOutside);
    };
  }, [setIsOpen]);

  return (
    <>
      <aside className="lg:left-0 w-80 fixed top-0 transition-position z-[9999]">
        <div
          className={`xl:block border-1 bg-white dark:bg-navy-800 relative h-screen ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between min-[1280px]:justify-center text-white py-10 px-5">
            <h2 className="text-black dark:text-white uppercase text-xl font-semibold">
              Admin Dashboard
            </h2>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="block min-[1280px]:hidden cursor-pointer text-black dark:text-white"
            >
              <CgCloseO />
            </div>
          </div>

          <div className="border border-slate-700"></div>

          {/* Sidebar List */}
          <div className="bg-white dark:bg-navy-800 pt-5 pl-10 ">
            <div className="flex flex-col">
              {menuItems
                .filter((item) => item.id !== "error")
                .map((item, idx) => (
                  <div key={idx} className="flex items-center py-3">
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen((prev) => !prev)}
                      className={`${
                        item.path === pathname
                          ? "text-black dark:text-white"
                          : ""
                      } flex items-center cursor-pointer text-[#8c9396] hover:text-black dark:text-gray-500  dark:hover:text-white transform duration-200 text-xl font-semibold`}
                    >
                      {item.icon}
                      <p>{item.label}</p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Footer */}

          <div className="bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 hover:bg-brand-300 absolute bottom-0 text-white w-full p-6 border-t-2 border-brand-500 rounded-md">
            <div className="flex items-center justify-center p-2">
              <Link href="/" className="dark:hover:text-brand-100">
                Back to Homepage ?
              </Link>
            </div>
          </div>
        </div>
      </aside>
      {isOpen && (
        <div
          className={`flex undefined items-center flex-col justify-center overflow-hidden fixed inset-0 ${
            isOpen ? "z-[901]" : "z-0"
          }`}
        >
          <div
            className={`overlay from-[#374151] via-[#1b2559] to-[#707eae] xl:from-transparent xl:via-transparent xl:to-transparent absolute inset-0 bg-gradient-to-tr opacity-90 ${
              isOpen ? "z-[901]" : "z-0"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            ref={btnRef}
          ></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
