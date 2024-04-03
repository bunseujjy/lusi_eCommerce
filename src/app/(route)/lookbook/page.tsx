import { getAllProduct } from "@/app/actions/getAllProduct";
import Footer from "@/app/components/Homepage/Footer";
import Navbar from "@/app/components/Homepage/Navbar";
import { lookbookItems } from "@/app/helper/items-list";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Read our book at this page.",
};

const Lookbook = async () => {
  const products = await getAllProduct();
  return (
    <>
      <Navbar products={products} />

      <div className="bg-gray-50 dark:bg-navy-900">
        <div className="max-w-3xl mx-auto text-center lg:max-w-7xl lg:px-8 px-4">
          <div className="py-10 md:py-24">
            <h1 className="text-6xl tracking-tight text-gray-900 dark:text-white">
              Lookbook
            </h1>
          </div>
        </div>

        <section className="">
          {lookbookItems.map((item, idx) => (
            <div
              className="flex items-center flex-col pb-12 md:py-12 md:px-8"
              key={idx}
            >
              <div className="w-full mb-9">
                <Image
                  src={item.image}
                  alt="lookbook-img"
                  width={1840}
                  height={800}
                />
              </div>
              <div className="flex items-start flex-col md:flex-row px-6 md:px-0 w-full lg:max-w-4xl lg:mx-auto">
                <div className="w-full md:pr-20 text-2xl md:text-4xl pb-4 md:pb-0">
                  {item.title}
                </div>
                <div className="w-full">
                  <p className="text-gray-400 text-[1rem] tracking-wide mb-6 leading-loose">
                    {item.disc}
                  </p>
                  <div className="font-semibold">
                    <button className="uppercase underline decoration-[#f6aa28] underline-offset-[6px] tracking-widest">
                      {item.button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Lookbook;
