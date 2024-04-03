"use client";

import Image from "next/image";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Review from "./Review";
import FormattedPrice from "../../helper/FormattedPrice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  addToCart,
  decrementQty,
  incremetQty,
  removeFromCart,
} from "@/redux/cartSlices";
import toast from "react-hot-toast";
import { StyledRating } from "./AddRating";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";

const ProductDetails = ({ products, user, related }: any) => {
  const { modal, setModal } = useBetween(StateProps);
  const [currentSection, setCurrentSection] = useState("description");
  const dispatch = useDispatch<AppDispatch>();
  const cart = useAppSelector((state) => state.cart.products);

  const rating =
    products &&
    products.reviews.reduce(
      (acc: number, currentItem: any) => currentItem.rating + acc,
      0
    ) / products.reviews.length;

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white dark:bg-navy-900 dark:text-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-[90%] mx-auto flex flex-col md:flex-row">
            <div className="md:w-[50%] float-left">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <Image
                    src={products.images}
                    alt="ecommerce"
                    className="object-cover object-center rounded border align-middle border-gray-200"
                    width={960}
                    height={960}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-[50%] float-right md:pl-10 md:py-6 mt-6 md:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {products &&
                  products.category
                    .map(
                      (item: any) =>
                        item.charAt(0).toUpperCase() + item.slice(1)
                    )
                    .join(", ")}
              </h2>
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                {products.title}
              </h1>
              <div className="flex mb-3">
                <span className="flex items-center">
                  <StyledRating value={rating} readOnly precision={0.5} />
                  <span className="text-gray-600 ml-3">
                    {products.reviews.length} Reviews
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <FaFacebookF className="text-gray-500" />
                  <FaTwitter className="ml-2 text-gray-500" />
                  <IoChatbubbleSharp className="ml-2 text-gray-500" />
                </span>
              </div>
              <span className="title-font font-medium text-2xl text-gray-400">
                <FormattedPrice amount={products.price} /> & Free Shipping
              </span>
              <p className="leading-relaxed pt-3">{products.description}</p>
              <div className="mt-6">
                {cart.find((item) => item.id === products.id) ? (
                  <div className="flex flex-col">
                    <p className="pb-2 text-xs text-gray-500">Quantity</p>
                    <div className="flex items-center">
                      <button
                        className="border border-black rounded-xl px-5 py-1 dark:border-navy-500"
                        onClick={() => dispatch(decrementQty(products.id))}
                      >
                        −
                      </button>
                      <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500 dark:border-navy-500">
                        <p>
                          {cart.slice(0, 1).map((item) => (
                            <p key={item.id}>{item.qty}</p>
                          ))}
                        </p>
                      </div>
                      <button
                        className="border border-black rounded-xl px-5 py-1 dark:border-navy-500"
                        onClick={() => dispatch(incremetQty(products.id))}
                      >
                        +
                      </button>

                      <button
                        className={`flex h-12 w-full sm:w-[60%] items-center justify-center bg-red-500 text-white duration-100 hover:bg-red-400 ${
                          cart.length > 0 ? "ml-4" : "ml-0"
                        }`}
                        onClick={() =>
                          dispatch(removeFromCart(products.id)) &&
                          toast.success(
                            `${products?.title.substring(
                              0,
                              15
                            )} removed from cart`
                          )
                        }
                      >
                        <BiShoppingBag className="mx-2" />
                        Remove from cart
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className={`flex h-12 text-center px-10 py-5 items-center justify-center bg-red-500 dark:bg-brand-400 dark:hover:bg-brand-300 text-white duration-100 hover:bg-red-400 ${
                      cart.length > 0 ? "md:text-sm" : "ml-0"
                    }`}
                    onClick={() =>
                      dispatch(addToCart(products)) &&
                      toast.success(
                        `${products?.title.substring(0, 15)} added to cart`
                      )
                    }
                  >
                    <BiShoppingBag className="mx-2" />
                    Add to cart
                  </button>
                )}
                <div className="border border-b-1 border-gray-200 my-2"></div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <p className="text-gray-400 dark:text-white">Categories:</p>

                  <h2 className="text-md title-font text-gray-700 dark:text-gray-500  tracking-widest pl-2 text-center">
                    {products &&
                      products.category
                        .map(
                          (item: any) =>
                            item.charAt(0).toUpperCase() + item.slice(1)
                        )
                        .join(", ")}
                  </h2>
                </div>
              </div>
              <div className="py-3">
                <Link
                  href="/cart"
                  className="flex h-12 w-full md:w-[70%] items-center justify-center bg-red-500 dark:bg-brand-400 dark:hover:bg-brand-300 text-white duration-100 hover:bg-red-400"
                >
                  <MdOutlineShoppingCartCheckout className="mx-2" />
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" dark:bg-navy-900">
        <div className="lg:col-span-3 lg:w-[90%] mx-auto px-4 md:px-10">
          <div className="border-b border-gray-300">
            <nav className="flex gap-4">
              <div
                id="description"
                className={`${
                  currentSection === "description"
                    ? "border-b-2 border-gray-900 text-gray-600"
                    : "text-white"
                } py-4 text-sm font-medium hover:border-gray-400 hover:text-gray-800 dark:hover:text-navy-200 dark:hover:border-navy-200 cursor-pointer`}
                onClick={() => setCurrentSection("description")}
              >
                Description
              </div>

              <div
                className={`${
                  currentSection === "review"
                    ? "border-b-2 border-gray-900 text-gray-600"
                    : "dark:text-white"
                } inline-flex flex-col py-4 text-sm font-medium dark:hover:text-navy-200 dark:hover:border-b-navy-200`}
                onClick={() => setCurrentSection("review")}
              >
                <div className="flex items-center cursor-pointer">
                  Reviews
                  <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                    {products.reviews.length ? products.reviews.length : 0}
                  </span>
                  <div className=""></div>
                </div>
              </div>
            </nav>
            {currentSection === "description" && (
              <div className="mt-8 flow-root sm:mt-12 pb-6">
                <p className="text-xl text-gray-400 dark:text-white leading-10">
                  {products.description}
                </p>
              </div>
            )}
            {currentSection === "review" && (
              <Review
                products={products}
                user={user}
                modal={modal}
                setModal={setModal}
              />
            )}
          </div>
          <h1 className="text-2xl uppercase pt-10">Related Product</h1>
          <div className="mb-12">
            <ProductCard currentItems={related} related={related} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
