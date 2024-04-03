"use client";

import {
  ProductType,
  decrementQty,
  incremetQty,
  removeFromCart,
  saveOrder,
} from "@/redux/cartSlices";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { LiaCcStripe } from "react-icons/lia";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  FaCode,
  FaRegAddressCard,
  FaRegTrashAlt,
  FaStreetView,
} from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { TCreatePayment, createPayment } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";

const Cart = () => {
  const { loading, setLoading, setCloseSide } = useBetween(StateProps);
  const [phoneNum, setPhoneNum] = useState("");
  const { products } = useAppSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const subtotal = products.reduce(
    (acc, currentProduct) => acc + currentProduct.price * currentProduct.qty,
    0
  );

  const { handleSubmit, register } = useForm<TCreatePayment>({
    resolver: zodResolver(createPayment),
    defaultValues: {
      email: "",
      name: "",
      postcode: "",
      address: "",
      phoneNumber: "",
      orderID: Math.floor(Math.random() * 1000000),
    },
  });

  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
  );

  const onSubmit = async (payData: TCreatePayment) => {
    setLoading(true);
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: products,
        email: session?.user.email,
        name: payData.name,
        address: payData.address,
        postcode: payData.postcode,
        phoneNumber: payData.phoneNumber,
        orderID: payData.orderID,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("order saved", products);
      await dispatch(
        saveOrder({
          orderData: products,
          id: data.id,
          orderID: payData.orderID,
          email: session?.user.email,
          name: payData.name,
          address: payData.address,
          postcode: payData.postcode,
          phoneNumber: payData.phoneNumber,
          createdAt: data.createdAt,
        })
      );
      stripe?.redirectToCheckout({ sessionId: data.id });
      await products.forEach((product) => {
        dispatch(removeFromCart(product.id));
      });
    } else {
      setLoading(true);
      throw new Error("Failed to create Stripe payment");
    }
  };

  const phoneInput = (value: any) => {
    setPhoneNum(value);
  };

  useEffect(() => {
    setCloseSide(false);
  }, [setCloseSide]);

  return (
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 md:my-8">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {products.length > 0 ? (
            <div className="mt-8 space-y-3 rounded-lg border bg-white dark:bg-navy-700 px-2 py-4 sm:px-6">
              {products.map((product: ProductType) => (
                <div
                  className="flex justify-between flex-col rounded-lg min-[544px]:flex-row"
                  key={product?.id}
                >
                  <div className="flex w-full">
                    <Image
                      src={product?.images}
                      alt="product image"
                      className="object-cover object-center rounded border align-middle"
                      width={112}
                      height={96}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold dark:text-white">
                        {product?.title}
                      </span>
                      <span className="float-right text-gray-400 text-sm">
                        Category:
                        {product?.category
                          .map(
                            (item: any) =>
                              item.charAt(0).toUpperCase() + item.slice(1)
                          )
                          .join(", ")}
                      </span>
                      <div className="flex items-center text-white">
                        <p className="text-sm font-bold line-through">
                          ${product?.price}
                        </p>
                        <p className="text-sm font-semibold text-white cursor-auto my-3 pl-2">
                          $
                          {Number(
                            product?.price -
                              (product?.price * product?.discount) / 100
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center min-[544px]:items-end justify-between flex-row min-[544px]:flex-col py-4">
                    <div className="flex items-center">
                      <button
                        className="border border-black rounded-xl px-5 py-1 dark:border-navy-500"
                        onClick={() => dispatch(decrementQty(product?.id))}
                      >
                        −
                      </button>
                      <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500 dark:border-navy-500">
                        <p>{product.qty}</p>
                      </div>
                      <button
                        className="border border-black rounded-xl px-5 py-1 dark:border-navy-500"
                        onClick={() => dispatch(incremetQty(product?.id))}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-white hover:text-red-400"
                      onClick={() => dispatch(removeFromCart(product?.id))}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-2xl rounded-lg border bg-white dark:bg-navy-700 uppercase py-10 mt-8 space-y-3">
              No product available in the cart
            </div>
          )}

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input className="peer hidden" />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 dark:peer-checked:bg-navy-700">
                <LiaCcStripe className="w-10 text-4xl" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Stripe Payment</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <form
          className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 dark:bg-navy-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-navy-600"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <FiAtSign className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <label
              htmlFor="name"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                {...register("name")}
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-navy-600"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <FaRegAddressCard className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <label
              htmlFor="address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-full flex-shrink-0">
                <input
                  {...register("address")}
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded-md border dark:bg-navy-600 border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street address / Number"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FaStreetView className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <label className="mt-4 mb-2 block text-sm font-medium">
              City / Postal Code
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-full">
                <input
                  {...register("postcode")}
                  type="text"
                  id="postcode"
                  name="postcode"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-navy-600"
                  placeholder="City / Postal Code"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FaCode className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <label className="mt-4 mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-full">
                <PhoneInput
                  className="w-full rounded-md border border-gray-200 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-navy-600"
                  inputClassName="inputColor dark"
                  {...register("phoneNumber")}
                  inputProps={{ name: "phoneNumber" }}
                  value={phoneNum}
                  onChange={phoneInput}
                />
              </div>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Subtotal
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Shipping
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Free
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Total
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${subtotal.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            disabled={!session?.user.id || products.length < 1}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white cursor-pointer"
            type="submit"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Cart;
