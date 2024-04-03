import { ProductType } from "@/types/productType";
import Image from "next/image";
import Link from "next/link";

const ProductList = ({ product }: any) => {
  return (
    <div className="bg-white dark:bg-navy-800 max-h-96 overflow-y-scroll resultProductContainer dark:resultProductContainer">
      {product &&
        product.slice(0, 10).map((item: ProductType) => (
          <Link
            href={`/collection/${item.id}`}
            key={item.id}
            className="py-2 px-4 flex items-center justify-between gap-8 hover:bg-gray-200 dark:hover:bg-navy-700 cursor-pointer"
          >
            <p className="font-medium">{item.title}</p>
            <Image
              src={item.images}
              alt="product image"
              className="w-8"
              width="50"
              height="50"
            />
          </Link>
        ))}
    </div>
  );
};

export default ProductList;
