import { ProductType } from "@/types/productType";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/cartSlices";
import { IoBagAddOutline, IoBagCheckOutline } from "react-icons/io5";

export const ProductCard = ({ currentItems, related }: any) => {
  const path = usePathname();
  const dispatch = useDispatch();

  return (
    <>
      <div className="max-w-[86rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-9 mt-10 mb-5 gap-x-9">
        {currentItems?.map((product: ProductType) => (
          <div
            className="relative w-full bg-white dark:bg-navy-700 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            key={product?.id}
          >
            <div className="relative group">
              {related ? (
                <Link href={`/collection/${product.id}`}>
                  <Image
                    src={product?.images}
                    width={400}
                    height={400}
                    alt="Product"
                    className="h-80 w-full object-cover rounded-t-xl"
                    priority
                  />
                  <div className="w-full absolute bottom-0 text-center bg-[rgba(0,0,0,.7)] dark:bg-navy-200 transition-opacity duration-400 ease-in opacity-0 group-hover:opacity-100 py-1">
                    <span className="text-white text-lg">Quick View</span>
                  </div>
                </Link>
              ) : (
                <Link href={`${path}/${product.id}`}>
                  <Image
                    src={product?.images}
                    width={400}
                    height={400}
                    alt="Product"
                    className="h-80 w-full object-cover rounded-t-xl"
                    priority
                  />
                  <div className="w-full absolute bottom-0 text-center bg-[rgba(0,0,0,.7)] dark:bg-navy-200 transition-opacity duration-400 ease-in opacity-0 group-hover:opacity-100 py-1">
                    <span className="text-white text-lg">Quick View</span>
                  </div>
                </Link>
              )}
            </div>
            <div className="px-4 py-3 w-full">
              <span className="text-gray-400 dark:text-white mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-lg font-bold text-black dark:text-white truncate block capitalize">
                {product?.title}
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
                  <IoBagAddOutline size={25} />
                </button>
              </div>
            </div>
            <div className="absolute -right-3 -top-3">
              <p
                className={`${
                  product?.inStock === "instock"
                    ? "rounded-full px-1 py-[10px] text-sm text-white bg-[#6e7051] dark:bg-navy-600"
                    : ""
                }`}
              >
                {product?.inStock === "instock" ? "Sale!" : null}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
