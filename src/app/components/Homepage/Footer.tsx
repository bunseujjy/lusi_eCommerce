import { footerAbout, footerHelp, footerShop } from "@/app/helper/items-list";
import Link from "next/link";
import {
  FaLock,
  FaInstagram,
  FaTruck,
  FaFacebook,
  FaTwitter,
  FaCcStripe,
  FaCcPaypal,
  FaCcMastercard,
  FaCcAmex,
  FaCcVisa,
} from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";

const Footer = () => {
  return (
    <>
      <div className="relative bg-footer-bg bg-center bg-no-repeat bg-cover">
        <div className="max-w-[1200px] min-h-[600px] mx-auto flex justify-center items-center">
          <div className="flex items-center justify-center flex-col text-white md:w-full">
            <h1 className="text-3xl md:text-6xl font-semibold tracking-[3px] text-center pb-5">
              Better for People & the Planet
            </h1>
            <p className="text-md text-center">
              Ut eget at et aliquam sit quis nisl, pharetra et ac pharetra est
              dictum in vulputate
            </p>
            <div className="flex items-center justify-center flex-col md:block mt-10">
              <Link
                href="/product-category/men"
                className="px-5 py-3 mb-5 md:mb-0 md:mr-5 bg-white text-black uppercase hover:bg-black hover:text-white transform duration-500"
              >
                Shop Men
              </Link>
              <Link
                href="/product-category/women"
                className="px-5 py-3  bg-white text-black uppercase hover:bg-black hover:text-white transform duration-500"
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-10">
        <div className="flex items-center flex-col md:flex-row justify-between">
          <div className="w-full h-full flex items-center justify-center gap-10 mb-5 md:mb-0">
            <ul className="flex items-center justify-center">
              <li className="flex items-center justify-center">
                <FaLock />
                <p className="ml-4 text-lg font-semibold">Secure Payment</p>
              </li>
            </ul>
          </div>
          <div className="h-[25px] w-[1px] bg-[#979a9b] hidden md:block"></div>
          <div className="w-full h-full flex items-center justify-center gap-10 mb-5 md:mb-0">
            <ul className="flex items-center justify-center">
              <li className="flex items-center justify-center">
                <FaTruck />
                <p className="ml-4 text-lg font-semibold">Express Shipping</p>
              </li>
            </ul>
          </div>
          <div className="h-[25px] w-[1px] bg-[#979a9b] hidden md:block"></div>
          <div className="w-full h-full flex items-center justify-center gap-10 mb-5 md:mb-0">
            <ul className="flex items-center justify-center">
              <li className="flex items-center justify-center">
                <LuRefreshCcw />
                <p className="ml-4 text-lg font-semibold">Free Return</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#979a9b] mt-10"></div>
      </div>
      <footer className="py-10 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center md:text-start gap-10 px-10 md:px-0">
          <div>
            <h1 className=" text-2xl md:text-md uppercase font-semibold tracking-[5px]">
              Plashoe
            </h1>
            <div className="mt-5 text-[#979a9b]">
              <p>
                Praesent eget tortor sit risus egestas nulla pharetra ornare
                quis bibendum est bibendum sapien proin nascetur
              </p>
            </div>
            <div className="flex items-center justify-center min-[880px]:justify-start gap-5 mt-10 text-xl">
              <Link
                href=""
                className=" hover:text-[#f6aa28] transform duration-300"
              >
                <FaInstagram />
              </Link>
              <Link
                href=""
                className=" hover:text-[#f6aa28] transform duration-300"
              >
                <FaPinterest />
              </Link>
              <Link
                href=""
                className=" hover:text-[#f6aa28] transform duration-300"
              >
                <FaFacebook />
              </Link>
              <Link
                href=""
                className=" hover:text-[#f6aa28] transform duration-300"
              >
                <FaTwitter />
              </Link>
            </div>
          </div>

          <div>
            <h1 className=" text-2xl md:text-md uppercase font-semibold tracking-[5px]">
              Shop
            </h1>
            <div className="flex items-center md:items-start justify-center flex-col mt-5  text-[#979a9b]">
              {footerShop.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="hover:text-black dark:hover:text-white transform duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className=" text-2xl md:text-md  font-semibold tracking-[5px]">
              About
            </h1>
            <div className="flex items-center md:items-start justify-center flex-col mt-5 text-[#979a9b]">
              {footerAbout.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="hover:text-black dark:hover:text-white transform duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className=" text-2xl md:text-md  font-semibold tracking-[5px]">
              Need Help?
            </h1>
            <div className="flex items-center md:items-start justify-center flex-col mt-5 text-[#979a9b]">
              {footerHelp.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="hover:text-black dark:hover:text-white transform duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-10 bg-[#f1f1ef] dark:bg-navy-800 p-14">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap md:justify-between">
          <div className="text-center md:text-start">
            <p>
              &copy; 2023 Recycled Shose Store. Powered by Recycled Shoe Store.
            </p>
          </div>
          <div className="flex items-center gap-5 mt-5 md:mt-0 text-2xl text-sky-500">
            <FaCcStripe />
            <FaCcPaypal />
            <FaCcAmex />
            <FaCcVisa />
            <FaCcMastercard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
