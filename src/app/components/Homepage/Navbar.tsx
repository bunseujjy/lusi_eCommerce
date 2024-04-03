"use client";

import { FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward, IoMdClose, IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";
import { useAppSelector } from "@/redux/store";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import ProductList from "../product/ProductSearchList";
import { ProductType } from "@/types/productType";
import { navbarItems, sidebarItems } from "@/app/helper/items-list";
import CartSidebar from "../product/CartSidebar";
import ThemeSwitch from "@/components/ui/ThemeButton";

const Navbar = ({ products }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pfOpen, setPfOpen] = useState(false);
  const [closeSearch, setCloseSearch] = useState(false);
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const { closeSide, setCloseSide } = useBetween(StateProps);
  const [search, setSearch] = useState();
  const count = useAppSelector((state) => state.cart.products.length);
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setClientWindowHeight(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;
    if (backgroundTransparacyVar < 1) {
      setBackgroundTransparacy(backgroundTransparacyVar);
    }
  }, [clientWindowHeight]);

  const searchQ = searchParams.get("query") ?? "";

  const filterProduct =
    products &&
    products.filter((product: ProductType) => {
      return (
        product.category.toString() &&
        product.title.toLowerCase().includes(searchQ && searchQ.toLowerCase())
      );
    });

  const onInput = useDebouncedCallback((e: any) => {
    const text = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (text) {
      params.set("query", text);
      setSearch(search);
    } else {
      params.delete("query");
      setSearch(search);
    }
    router.push(`${pathname}/?${params.toString()}`);
  }, 300);

  const onSearch = (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    router.push(`/collection/?${params.toString()}`);
  };

  return (
    <>
      <div
        className={`max-w-full flex items-center justify-between sticky top-0 py-8 px-2 min-[450px]:px-7 md:px-[40px] bg-white dark:bg-[#0b14374d] z-[999] ${
          backgroundTransparacy &&
          "bg-white/10 backdrop-blur-xl rounded-xl mx-2 top-5"
        }`}
      >
        <RxHamburgerMenu
          className="min-[979px]:hidden text-[25px] font-semibold cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="flex items-center justify-between min-[979px]:pr-[10px]">
          <Link
            href="/"
            className="text-2xl md:text-md uppercase font-semibold tracking-[5px] text-[#8e9496] dark:text-white"
          >
            Lusishoe
          </Link>
          {isOpen && (
            <div className="bg-[rgba(0,0,0,0.4)] md:bg-transparent fixed inset-0 z-0 opacity-1 visible cursor-pointer"></div>
          )}
          <div className="hidden min-[979px]:flex items-center justify-between lg:ml-4 gap-2 lg:gap-4 min-[979px]:pl-[20px] uppercase font-semibold">
            {navbarItems.map((items, idx) => (
              <div key={idx}>
                <Link
                  href={items.path}
                  className={`text-black dark:text-white hover:text-black hover:opacity-70 dark:hover:text-navy-200 text-sm transform duration-300 ml-[20px] min-[979px]:ml-0 min-[1188px]:text-[1rem] ${
                    items.path === pathname
                      ? "text-slate-400 dark:text-navy-400"
                      : ""
                  }`}
                >
                  {items.labels}
                </Link>
                <span className="w-full h-[1px] bg-[#979a9b]"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between min-[979px]:gap-10 min-[979px]:pl-[20px]">
          <div className="hidden min-[979px]:block text-sm md:text-md text-[#8c9396] dark:text-white min-[1188px]:text-[1rem] font-semibold uppercase ">
            <Link
              href="/story"
              className={`mr-5 md:mr-2 hover:text-black dark:hover:text-navy-200 transform duration-300 ${
                pathname === "/story" ? "text-black dark:text-navy-300" : ""
              }`}
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className={`hover:text-black dark:hover:text-navy-200 transform duration-300 ${
                pathname === "/contact" ? "text-black dark:text-navy-300" : ""
              }`}
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center md:hidden text-xl md:text-[20px]">
              <ThemeSwitch />
            </div>
            <div className="relative flex items-center mx-5">
              <button>
                <IoMdSearch
                  className="text-2xl md:pr-0 md:text-[20px]"
                  onClick={() => setCloseSearch(!closeSearch)}
                />
              </button>
              <button onClick={() => setCloseSide(!closeSide)}>
                <MdOutlineShoppingBag className="text-2xl ml-2 mr-7 md:pr-0 md:text-[20px]" />
                <div className="absolute right-4 -top-2 bg-red-500 text-white rounded-full px-1 text-xs">
                  {count ? count : 0}
                </div>
              </button>
              <div className={` ${closeSide ? "block" : "hidden"}`}>
                <CartSidebar backgroundTransparacy={backgroundTransparacy} />
              </div>
            </div>
            {!session && (
              <Link
                href="/sign-in"
                className="px-5 py-3 bg-white border-2 border-black dark:bg-navy-700 dark:text-white dark:border-navy-600"
              >
                Login
              </Link>
            )}
            {session && (
              <div className="relative">
                <Image
                  id="avatarButton"
                  typeof="button"
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                  className="w-8 h-8 rounded-full cursor-pointer object-cover"
                  src={session?.user.image || "/default-pf.jpg"}
                  alt="User dropdown"
                  width={40}
                  height={40}
                  onClick={() => setPfOpen(!pfOpen)}
                />

                <div
                  id="userDropdown"
                  className={`z-10 absolute right-0 top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-navy-800 ${
                    pfOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{session?.user.name}</div>
                    <div className="font-medium truncate">
                      {session?.user?.email}
                    </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      {session?.user.role === "ADMIN" ? (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/admin/profile"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          View Your Profile
                        </Link>
                      )}
                    </li>
                  </ul>
                  <div
                    className="py-1"
                    onClick={() =>
                      signOut({ redirect: false }).then(() => {
                        router.push("/sign-in"); // Redirect to the dashboard page after signing out
                      })
                    }
                  >
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`min-[979px]:hidden shadow-lg transform duration-800 fixed top-0 left-0 z-[999] bg-white dark:bg-navy-900 w-[90%] min-h-[100vh] flex flex-col gap-5 text-[#8e9496] dark:text-white uppercase ${
          isOpen ? "block" : "hidden"
        } ${backgroundTransparacy}`}
      >
        <IoMdClose
          className=" ml-auto m-2 text-3xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <FaUser className="text-xl ml-[20px] min-[979px]:ml-0" />
        <span className="w-full h-[1px] bg-[#979a9b]"></span>
        {sidebarItems.map((items, idx) => (
          <div key={idx}>
            <Link
              href={items.path}
              onClick={() => setIsOpen(!isOpen)}
              className={`hover:text-black dark:hover:text-navy-200 transform duration-300 ml-[20px] min-[979px]:ml-0 ${
                items.path === pathname ? "text-black dark:text-slate-400" : ""
              }`}
            >
              {items.labels}
            </Link>
            <span className="w-full h-[1px] bg-[#979a9b]"></span>
          </div>
        ))}
      </div>
      {/* Search Bar */}
      <form
        className={`p-5 bg-[#e4e6e7] dark:bg-navy-800 ${
          closeSearch ? "block" : "hidden"
        }`}
        onSubmit={onSearch}
      >
        <div className="relative max-w-sm mx-auto">
          <input
            className="w-full py-2 px-4 border border-gray-300 dark:border-navy-700 dark:bg-navy-800 rounded-md shadow-sm focus:outline-none"
            type="search"
            placeholder="Search Product by Title or Category"
            onChange={onInput}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700  bg-[#6e7051] border-gray-300 dark:text-white dark:bg-navy-700 dark:border-navy-800 rounded-r-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="submit"
          >
            <IoIosArrowForward className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="max-w-sm mx-auto border rounded-md dark:border-navy-700">
          {filterProduct && filterProduct.length > 0 ? (
            <ProductList product={filterProduct} />
          ) : (
            <div className="flex items-center justify-center text-center py-5">
              <div className="flex items-center flex-col my-5">
                <h1>
                  Opps... We could not find any products matching your criteria.
                </h1>
                <Link
                  href="/collection"
                  className="underline text-blue-500 py-2"
                >
                  Check all the products available in our store here
                </Link>
              </div>
            </div>
          )}
        </div>
      </form>
      <div
        className={` ${
          closeSide &&
          backgroundTransparacy &&
          "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50"
        }`}
      ></div>
    </>
  );
};

export default Navbar;
