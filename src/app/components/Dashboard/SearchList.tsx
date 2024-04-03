import { IOrder } from "@/app/(route)/order/page";
import { ProductType } from "@/types/productType";
import Image from "next/image";
import Link from "next/link";

const SearchList = ({ product, user, order }: any) => {
  return (
    <div className="bg-white dark:bg-navy-800 w-[340px] max-h-96 overflow-y-scroll resultProductContainer dark:resultProductContainer">
      {product &&
        product.slice(0, 3).map((item: ProductType) => (
          <Link
            href="/admin/products"
            key={item.id}
            className="py-2 px-4 flex items-center justify-between gap-8 hover:bg-gray-200 dark:hover:bg-navy-700 cursor-pointer"
          >
            <p className="font-medium">{item.title}</p>
            <Image
              src={item.images}
              alt=""
              className=" w-8"
              width="50"
              height="50"
            />
          </Link>
        ))}
      {user &&
        user.slice(0, 3).map((item: any, index: any) => (
          <Link
            href="/admin/user"
            key={index}
            className="py-2 px-4 flex items-center justify-between gap-8 hover:bg-gray-200 dark:hover:bg-navy-700 cursor-pointer"
          >
            <p className="font-medium">{item.name}</p>
            <Image
              src={item.image}
              alt=""
              className=" w-8"
              width="50"
              height="50"
            />
          </Link>
        ))}
      {order &&
        order.slice(0, 3).map((item: IOrder) => (
          <div className="" key={item.id}>
            {item.products.slice(0, 3).map((product: any) => (
              <Link
                href="/admin/orders"
                className="py-2 px-4 flex items-center justify-between gap-8 hover:bg-gray-200 dark:hover:bg-navy-700 cursor-pointer"
                key={product.id}
              >
                <p className="font-medium uppercase">
                  {item.paid === "paid" ? "Paid" : "Unpaid"}
                </p>
                <Image
                  src={product?.price_data?.product_data?.images[0]}
                  alt="product image"
                  className=" w-8"
                  width="50"
                  height="50"
                />
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SearchList;
