import Footer from "@/app/components/Homepage/Footer";
import Navbar from "@/app/components/Homepage/Navbar";
import prisma from "@/lib/db";
import Product from "./Product";
import { FaGifts } from "react-icons/fa";
import { getAllProduct } from "@/app/actions/getAllProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sale",
  description: "Sale Page",
};

const Sale = async () => {
  const product = await prisma.product.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  const products = await getAllProduct();
  return (
    <>
      <Navbar products={products} />

      <div className="bg-gray-50 dark:bg-navy-900">
        <div className="max-w-3xl mx-auto text-center lg:max-w-7xl lg:px-8 px-4">
          <div className="py-10 md:py-24">
            <h1 className="text-6xl tracking-tight text-gray-900 dark:text-white">
              Sale
            </h1>
          </div>
        </div>

        <section className="min-h-[280px] md:min-h[280px] lg:min-h-[400px] flex flex-wrap md:grid md:grid-cols-2 lg:px-10 lg:gap-10">
          <div className="bg-sale-image1 bg-center bg-no-repeat bg-cover w-full">
            <div className="w-[100%] h-full flex items-center justify-center flex-col min-h-[280px]">
              <div className="py-5">
                <h4 className="text-lg text-white font-semibold">
                  Refer a friend
                </h4>
              </div>
              <h1 className="sm:text-6xl text-3xl md:text-6xl text-white tracking-wide text-center font-semibold pb-5">
                Get 20% OFF
              </h1>
              <div className="font-semibold">
                <button className="py-2 px-5 border-white border-2 text-white uppercase tracking-widest hover:bg-white hover:text-black transform duration-500">
                  Lern More
                </button>
              </div>
            </div>
          </div>
          <div className="bg-sale-image2 bg-center bg-no-repeat bg-cover w-full">
            <div className="w-[100%] h-full flex items-center justify-center flex-col min-h-[280px]">
              <div className="py-5">
                <h4 className="text-lg text-white font-semibold">Promotion</h4>
              </div>
              <h1 className="sm:text-6xl text-3xl md:text-5xl text-white tracking-wide text-center font-semibold pb-5">
                Student Discount
              </h1>
              <div className="font-semibold">
                <button className="py-2 px-5 border-white border-2 text-white uppercase tracking-widest hover:bg-white hover:text-black transform duration-500">
                  Lern More
                </button>
              </div>
            </div>
          </div>
        </section>

        <Product product={product} />
      </div>

      <div className="px-16 py-10 bg-[#f1f1ef] dark:bg-navy-800">
        <div className="flex items-center justify-between">
          <div id="gift" className="flex items-center">
            <FaGifts className="text-[#6E7051] text-2xl" />
            <div className="flex items-start flex-col pl-4">
              <h4 className="text-black text-3xl font-semibold dark:text-white pb-2">
                The best gift
              </h4>
              <p className="text-[#979a9b] text-xl">
                Lacus vel sit eu integer leo nec ornare consequat eget dolor
              </p>
            </div>
          </div>
          <button className="uppercase bg-[#6E7051] font-semibold px-8 py-4">
            Shop Gift Card
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sale;
