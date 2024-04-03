import { getAllProduct } from "@/app/actions/getAllProduct";
import Footer from "@/app/components/Homepage/Footer";
import HowShoesMade from "@/app/components/Homepage/HowShoesMade";
import Navbar from "@/app/components/Homepage/Navbar";
import { storyItems } from "@/app/helper/items-list-icon";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Story",
  description: "Story of our page",
};

const StoragePage = async () => {
  const products = await getAllProduct();
  return (
    <>
      <Navbar products={products} />
      <section>
        <div className="max-w-3xl mx-auto text-center lg:max-w-7xl lg:px-8 px-4">
          <div className="max-w-[720px] mx-auto py-4 md:py-10 text-center">
            <h1 className="text-6xl tracking-tight text-[#262b2c] dark:text-white">
              Our Story
            </h1>
            <h3 className="text-center text-3xl text-[#262b2c] tracking-tight pt-4 dark:text-white">
              Taking a stylish and sustainable footwear with a focus on creating
              a positive impact on both the world and the people
            </h3>
          </div>
        </div>
        <div className="w-full h-auto text-center px-0 md:px-4 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto aspect-[1.77777] flex items-center flex-col">
            <iframe
              className="w-full h-full mb-6"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/BHw7cP105bs?si=wtNJv-LHS_KHoK2Y"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-col md:flex-row px-4">
            {storyItems.map((item, idx) => (
              <div className="" key={idx}>
                <div className="text-start px-2 pt-4">
                  <p className="text-[#6e7051] text-2xl">{item.icon}</p>
                  <h1 className="py-3 text-xl">{item.title}</h1>
                  <p className="text-[#979a9b]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#ffff] border-x-0 md:border-x-[40px] px-4 py-6 md:py-24 md:px-10 bg-[#f1f1ef] dark:bg-navy-800 dark:border-navy-900">
          <div className="max-w-6xl mx-auto flex items-center flex-col flex-wrap">
            <div className="flex justify-between max-w-6xl mx-auto mb-20 flex-col md:flex-row">
              <div className="w-full md:w-[33.333%]">
                <div className="w-full">
                  <h1 className="text-2xl">Mission</h1>
                </div>
              </div>
              <div className="w-full md:w-[66.666%]">
                <p className="text-md md:text-xl text-[#979a9b] py-6 md:py-0">
                  Pulvinar sed nunc ultrices consequat adipiscing sagittis
                  feugiat at dui, arcu nec id non pellentesque dolor feugiat
                  dolor ac ac sem semper nulla dis vitae, quis elit odio nunc
                  dignissim aliquam ipsum.
                </p>
                <p className="text-md md:text-xl py-6 md:py-0 text-[#979a9b]">
                  Mattis pretium nec tellus viverra phasellus sed tortor ac
                  tincidunt adipiscing nibh eget, adipiscing sit penatibus
                  lobortis placerat
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row max-w-6xl mx-auto">
              <div className="w-full md:w-[33.333%]">
                <div className="w-full">
                  <h1 className="text-2xl">Vision</h1>
                </div>
              </div>
              <div className="w-full md:w-[66.666%]">
                <p className="text-md md:text-xl text-[#979a9b] py-6 md:py-0">
                  Sit etiam est, nunc sollicitudin malesuada tincidunt senectus
                  venenatis, adipiscing nulla vel diam, lorem donec sit blandit
                  nec tortor, diam cras ut velit nulla purus ullamcorper ornare
                  elit bibendum augue.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HowShoesMade />

        <div className="w-full flex items-center flex-wrap flex-col-reverse md:flex-row md:flex-nowrap md:max-w-6xl mx-auto px-10 md:px-10">
          <div className="w-full flex justify-between flex-col md:flex-row border-t-2 border-[#e4e6e7] mt-20 py-12">
            <div className="mb-6 mt-5 md:mt-0 text-center md:text-start w-full md:w-[50%] md:pr-10">
              <p className="text-[#a0a5a7] text-lg">
                Eu eget felis erat mauris aliquam mattis lacus, arcu leo aliquam
                sapien pulvinar laoreet vulputate sem aliquet phasellus egestas
                felis, est, vulputate morbi massa mauris vestibulum dui odio.
              </p>
            </div>
            <div className="flex items-center justify-evenly md:flex-nowrap w-full md:w-[50%] h-full">
              <div className="w-full px-4">
                <Image
                  className="w-auto"
                  src="/recycle-1.svg"
                  alt="recycle images"
                  width={104}
                  height={104}
                />
              </div>
              <div className="w-full px-4">
                <Image
                  className="w-auto"
                  src="/recycle-2.svg"
                  alt="recycle images"
                  width={104}
                  height={104}
                />
              </div>
              <div className="w-full px-4">
                <Image
                  className="w-auto"
                  src="/recycle-3.svg"
                  alt="recycle images"
                  width={104}
                  height={104}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StoragePage;
