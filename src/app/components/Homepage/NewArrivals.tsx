"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/productType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cartSlices";
import toast from "react-hot-toast";

const NewArrivals = ({ product }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="max-w-[86rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-9 mt-10 mb-5 gap-x-9">
      {product.slice(0, 6).map((product: ProductType) => (
        <div
          className="relative w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl dark:bg-navy-700"
          key={product.id}
        >
          <div className="relative group">
            <Link href={`/collection/${product.id}`}>
              <Image
                src={product.images}
                width={400}
                height={400}
                alt="Product"
                className="h-80 w-full object-cover rounded-t-xl"
              />
              <div className="w-full absolute bottom-0 text-center bg-[rgba(0,0,0,.7)] transition-opacity duration-400 ease-in opacity-0 group-hover:opacity-100 py-1">
                <span className="text-white text-lg">Quick View</span>
              </div>
            </Link>
          </div>
          <div className="w-full px-4 py-3 dark:text-white">
            <span className="text-gray-400 dark:text-white mr-3 uppercase text-xs">
              Brand
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize dark:text-white">
              {product.title}
            </p>
            <div className="flex items-center">
              {product?.discount === 0 ? (
                <p className="text-lg font-semibold text-black cursor-auto my-3 dark:text-white">
                  ${product?.price.toFixed(2)}
                </p>
              ) : (
                <>
                  <p className="text-lg font-semibold text-black cursor-auto my-3 dark:text-white">
                    $
                    {Number(
                      product?.price -
                        (product?.price * product?.discount) / 100
                    ).toFixed(2)}
                  </p>
                  <div>
                    <p className="text-sm text-gray-600 cursor-auto ml-2 line-through">
                      ${product?.price.toFixed(2)}
                    </p>
                  </div>
                </>
              )}
              <div className="ml-auto"></div>
              <button
                onClick={() =>
                  dispatch(addToCart(product)) &&
                  toast.success(
                    `${product?.title.substring(0, 15)} added successfully`
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="absolute -right-3 -top-3">
            <p
              className={`${
                product.inStock === "instock"
                  ? "rounded-full px-1 py-[10px] text-sm text-white bg-[#6e7051] dark:bg-navy-600"
                  : ""
              }`}
            >
              {product.inStock === "instock" ? "Sale!" : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewArrivals;
