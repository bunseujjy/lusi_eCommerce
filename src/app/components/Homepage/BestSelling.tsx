import Image from "next/image";
import Link from "next/link";
import { productData } from "../../helper/product";

const BestSelling = () => {
  return (
    <section className="py-[96px] px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-sm md:text-lg">Our Best Seller</h1>
          <Link
            href=""
            className="border-b-2 border-b-[#f6aa28] uppercase hover:border-b-black text-sm md:text-lg"
          >
            View All Best Sellers
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {productData.map((product) => (
            <div
              key={product._id}
              className="flex items-center flex-col w-full h-full mb-5"
            >
              <div className="w-full h-full pb-5">
                <Image src={product.image} alt="" width={400} height={400} />
              </div>
              <div className="w-full h-full md:px-5 md:pt-2 text-start md:text-center">
                <div className="text-sm font-semibold">
                  <h1>{product.title}</h1>
                </div>
                <div className="text-sm text-[#979a9b] my-1">
                  <p>${product.price}</p>
                </div>
                <div>
                  <p>{product.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
