"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdSearch } from "react-icons/io";
import { FaGithubAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useBetween } from "use-between";
import { StateProps } from "../../../lib/StateProps";
import { menuItems, smSideabar } from "@/app/helper/items-list-icon";
import { BiDotsVertical } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import ThemeSwitch from "@/components/ui/ThemeButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductType } from "@/types/productType";
import { useDebouncedCallback } from "use-debounce";
import SearchList from "./SearchList";
import { IOrder } from "@/app/(route)/order/page";
import { useTheme } from "next-themes";

const Navbar = ({ product, order, user }: any) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState();
  const [pfOpen, setPfOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const { isOpen, setIsOpen, navOpen, setNavOpen } = useBetween(StateProps);
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      setBackgroundTransparacy(backgroundTransparacyVar);
    }
  }, [clientWindowHeight]);
  const searchQ = searchParams.get("query") ?? "";

  const filterProduct =
    product &&
    product.filter((product: ProductType) => {
      return (
        product.category.toString() &&
        product.title.toLowerCase().includes(searchQ && searchQ.toLowerCase())
      );
    });

  // Filter orders based on their "paid" status
  const filterOrder =
    order &&
    order.filter((order: IOrder) => {
      const lowerCasePaidStatus = order.paid.toLowerCase();
      const lowerCaseSearchQ = searchQ && searchQ.toLowerCase();
      // If the search query is for paid orders, hide unpaid orders
      if (lowerCaseSearchQ === "paid") {
        return !lowerCasePaidStatus.includes("unpaid");
      }
      // If the search query is for unpaid orders, hide paid orders
      else if (lowerCaseSearchQ === "unpaid") {
        return lowerCasePaidStatus.includes("unpaid");
      }
      // For other search queries, show all orders
      return true;
    });

  const filterUser =
    user &&
    user.filter((user: any) => {
      const lowerCaseSearchQ = searchQ && searchQ.toLowerCase();
      return (
        (user.email.toLowerCase().includes(lowerCaseSearchQ) ||
          user.name.toLowerCase().includes(lowerCaseSearchQ)) &&
        (user.name.toLowerCase().includes(lowerCaseSearchQ) ||
          user.email.toLowerCase().includes(lowerCaseSearchQ))
      );
    });

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

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
    if (filterProduct && filterProduct.length > 0) {
      router.push(`/admin/products/?${params.toString()}`);
    } else if (filterUser && filterUser.length > 0) {
      router.push(`/admin/user/?${params.toString()}`);
    }
  };

  return (
    <>
      {!navOpen && (
        <div className="flex items-start flex-col mx-5 mt-2 md:hidden">
          <h2 className="text-md">
            Pages <span className="px-2">/</span>
            {menuItems.map((item) => (
              <span
                key={item.id}
                className={`${item.path === pathname ? "" : "hidden"}`}
              >
                {item.label}
              </span>
            ))}
          </h2>
          <h1 className="text-3xl pt-4 font-semibold">
            {menuItems.map((item) => (
              <span
                key={item.id}
                className={`${item.path === pathname ? "" : "hidden"}`}
              >
                {item.label}
              </span>
            ))}
          </h1>
        </div>
      )}
      <div
        className={`text-black dark:text-white dark:bg-navy-900 md:bg-transparent relative md:sticky md:top-5 z-[900] flex lg:items-stretch justify-end xl:mx-[55px] md:py-4 px-2  ${
          navOpen ? "mx-0" : "mx-5"
        } ${
          backgroundTransparacy && "bg-white/10 backdrop-blur-xl rounded-xl"
        }`}
      >
        <div className="flex flex-1 items-center flex-row  z-[9999]">
          <div
            className="pr-5 cursor-pointer block min-[768px]:hidden min-[1280px]:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <RxHamburgerMenu size={25} />
          </div>
          <form className="block md:hidden flex-1" onSubmit={onSearch}>
            <input
              type="text"
              className="w-full h-14 p-2 text-black dark:text-white bg-transparent focus:border-x-orange-500 outline-none border border-navy-700 rounded-md"
              placeholder="Search..."
              onChange={onInput}
              defaultValue={searchParams.get("query")?.toString()}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </form>
          <div
            className="flex-1 absolute right-0 md:hidden"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? (
              <RiCloseCircleLine size={25} className="cursor-pointer" />
            ) : (
              <BiDotsVertical size={25} className="cursor-pointer" />
            )}
          </div>
          <div className="hidden md:flex items-start flex-col">
            <h2 className="text-md">
              Pages <span className="px-2">/</span>
              {menuItems.map((item) => (
                <span
                  key={item.id}
                  className={`${item.path === pathname ? "" : "hidden"}`}
                >
                  {item.label}
                </span>
              ))}
            </h2>
            <h1 className="text-3xl pt-4 font-semibold">
              {menuItems.map((item) => (
                <span
                  key={item.id}
                  className={`${item.path === pathname ? "" : "hidden"}`}
                >
                  {item.label}
                </span>
              ))}
            </h1>
          </div>
        </div>
        <div className="mt-[3px] flex md:flex-grow items-center justify-between gap-2 rounded-full md:bg-white px-2 py-2 md:shadow-xl md:shadow-shadow-500 md:dark:!bg-navy-800 md:dark:shadow-none md:w-[365px] md:relative">
          <div className="w-full flex flex-col md:block xl:max-w-6xl absolute left-0 top-14 md:static md:top-0 md:bg-transparent z-[9998]">
            <div className="flex items-start flex-col md:flex-row md:items-center">
              {/* Small Screen */}

              <form
                className="hidden md:flex flex-1 h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]"
                onSubmit={onSearch}
              >
                <button className="pl-3 pr-2 text-xl" type="submit">
                  <IoMdSearch />
                </button>
                <input
                  type="text"
                  className="flex-1 h-12 w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
                  placeholder="Search..."
                  onChange={onInput}
                  defaultValue={searchParams.get("query")?.toString()}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </form>

              <div
                className={`w-screen fixed left-0 top-14 md:hidden bg-white dark:bg-navy-800 border-b-2 ${
                  navOpen ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col w-full bg-white pt-2 divide-y-2 dark:bg-navy-700">
                  <div className="flex items-center w-full py-2">
                    <Image
                      id="avatarButton"
                      typeof="button"
                      data-dropdown-toggle="userDropdown"
                      data-dropdown-placement="bottom-start"
                      className="w-8 h-8 rounded-full cursor-pointer object-cover mx-6"
                      src={session?.user.image || "/default-pf.jpg"}
                      alt="User dropdown"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h4>{session?.user.name}</h4>
                    </div>
                  </div>
                  {smSideabar.map((item, idx) => (
                    <div className="flex items-center py-4" key={idx}>
                      <p className="mx-6 pr-2 w-[25px]">{item.icon}</p>
                      <Link
                        href={item.path}
                        className="cursor-pointer"
                        onClick={idx === 3 ? toggleTheme : undefined}
                      >
                        <span onClick={() => setNavOpen((prev) => !prev)}>
                          {item.label}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* Medium Screen */}
              <div className="hidden md:block relative p-3">
                <div
                  className="flex items-center"
                  onClick={() => setPfOpen(!pfOpen)}
                >
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
                  />
                  <p className="mx-4">{session?.user.name}</p>
                  <button>
                    {pfOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </button>
                </div>

                <div
                  id="userDropdown"
                  className={` z-10 absolute right-0 top-12 bg-white divide-y divide-gray-100 dark:bg-navy-800 rounded-lg shadow w-44 ${
                    pfOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{session?.user.name}</div>
                    <div className="font-medium truncate">
                      {session?.user.email}
                    </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-white">
                    <li>
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Back Homepage
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <button
                      onClick={() => signOut()}
                      className="w-full block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center p-4">
                <ThemeSwitch />
              </div>
              <div className="hidden md:flex items-center p-4">
                <FaGithubAlt />
              </div>
              <div className="hidden md:flex items-center p-4">
                <AiOutlineLogout />
              </div>
            </div>
            {focus && (
              <div className="max-w-sm mx-auto border dark:border-navy-700 absolute left-14 md:left-7 md:top-[60px] rounded-tl-md z-[9999]">
                {(filterProduct && filterProduct.length > 0) ||
                (filterUser && filterUser.length > 0) ||
                (filterOrder && filterOrder.length > 0) ? (
                  <SearchList
                    product={filterProduct}
                    order={filterOrder}
                    user={filterUser}
                  />
                ) : (
                  <div className="flex items-center justify-center text-center py-5">
                    <div className="flex items-center flex-col my-5">
                      <h1>
                        Opps... We could not find any products matching your
                        criteria.
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
            )}
          </div>
        </div>
      </div>
      <div
        className="w-2 cursor-pointer mx-5 hidden md:block min-[1280px]:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <RxHamburgerMenu size={25} />
      </div>
      {navOpen && (
        <div className="flex z-40 undefined items-center flex-col justify-center overflow-hidden fixed inset-0">
          <div className="overlay z-40 from-[#374151] absolute inset-0 bg-gradient-to-t opacity-90 dark:from-gray-800 dark:via-gray-900 dark:to-navy-900"></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
