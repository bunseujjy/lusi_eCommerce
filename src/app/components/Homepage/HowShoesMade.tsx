import Image from "next/image";

const HowShoesMade = ({ style }: any) => {
  return (
    <section className="max-w-full md:px-[40px]">
      <div
        className="py-[96px] px-10 bg-white dark:bg-navy-700 flex items-start w-full flex-wrap style"
        style={style}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-4xl text-center w-full">
            <h1 className="mb-4">See how your shoes are made</h1>
          </div>
          <div className="text-center text-[#a0a5a7] md:px-[160px]">
            <p className="mb-20">
              Urna, felis enim orci accumsan urna blandit egestas mattis egestas
              feugiat viverra ornare donec adipiscing semper aliquet integer
              risus leo volutpat nulla enim ultrices
            </p>
          </div>
          <div className="grid grid-cols-1 md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-center flex-col pr-0 md:pr-[56px]">
              <div>
                <p className="text-[#f6aa28] pb-5">01.</p>
                <h1 className="text-2xl pb-3 font-semibold">Pet Canvas</h1>
                <p className="text-[#a0a5a7]">
                  Morbi eget bibendum sit adipiscing morbi ac nisl vitae
                  maecenas nulla cursusi
                </p>
              </div>
              <div className="w-full h-[1px] bg-gray-400 my-20"></div>
              <div className="pb-8">
                <p className="text-[#f6aa28] pb-5">0.2</p>
                <h1 className="text-2xl pb-3 font-semibold">
                  Algae foam + vegan glue
                </h1>
                <p className="text-[#a0a5a7]">
                  Enim tincidunt donec vulputate magna pharetra mattis in
                </p>
              </div>
            </div>
            <div className="w-full h-full flex items-center">
              <div className="w-full">
                <Image
                  src="/shoesinfo.png"
                  alt="Shoes image"
                  width={600}
                  height={480}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex items-center justify-center flex-col pr-0 md:pl-[56px] text-end">
              <div>
                <p className="text-[#f6aa28] pb-5">0.3</p>
                <h1 className="text-2xl pb-3 font-semibold">Organic cotton</h1>
                <p className="text-[#a0a5a7]">
                  A vel ipsum, sed dignissim elementum ultrices amet
                </p>
              </div>
              <div className="w-full h-[1px] bg-gray-400 my-20"></div>
              <div>
                <p className="text-[#f6aa28] pb-5">04.</p>
                <h1 className="text-2xl pb-3 font-semibold">
                  Upcycled plastic bottles
                </h1>
                <p className="text-[#a0a5a7]">
                  Pellentesque viverra amet netus facilisis amet felis odio
                  tortor orci cursus est
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowShoesMade;
