"use client";

import { StateProps } from "@/lib/StateProps";
import { ProductType, removeFromCart } from "@/redux/cartSlices";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useBetween } from "use-between";

const CartSidebar = ({ backgroundTransparacy }: any) => {
  const { setCloseSide, closeSide } = useBetween(StateProps);
  const cart = useAppSelector((store) => store.cart.products);
  const dispatch = useDispatch();
  const path = usePathname();

  const subtotal = cart.reduce(
    (acc, currentProduct) => acc + currentProduct.price * currentProduct.qty,
    0
  );
  return (
    <div className="relative z-[999]">
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
          backgroundTransparacy && "relative"
        }`}
      ></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div
              className={`pointer-events-auto w-screen max-w-md ${
                backgroundTransparacy && "h-[101vh] fixed -top-6 -right-2"
              }`}
            >
              <div className="flex h-full flex-col bg-white dark:bg-navy-800 shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setCloseSide(!closeSide)}
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cart.length > 0 ? (
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.map((product: ProductType) => (
                            <li className="flex py-6" key={product.id}>
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <Image
                                  src={product.images}
                                  alt="product image"
                                  width={100}
                                  height={100}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <h3>{product.title}</h3>
                                    <p className="ml-4 dark:text-white">
                                      ${product.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-white">
                                    {product.category
                                      ?.map(
                                        (item: any) =>
                                          item.charAt(0).toUpperCase() +
                                          item.slice(1)
                                      )
                                      .join(", ")}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty: {product.qty}
                                  </p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        dispatch(removeFromCart(product.id))
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center">
                          No products in the cart!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>

                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link
                        href={`${path}`}
                        className="font-medium text-indigo-600 hover:text-indigo-500 pl-3"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
