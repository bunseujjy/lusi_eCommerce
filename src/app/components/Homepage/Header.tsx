import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="bg-header-bg bg-center bg-no-repeat bg-cover p-10 min-[880px]:border-stone-50 min-[880px]:border-solid min-[880px]:border-x-[40px] dark:border-navy-900">
        <div className="max-w-[1200px] min-[1000px]:min-h-[600px] mx-auto flex items-center justify-center flex-col md:items-start md: ">
          <div className="py-17 px-6 md:px-0">
            <div className="max-w-xl mr-auto">
              <h1 className="text-3xl md:text-5xl text-white text-center font-semibold md:text-start">
                Love the Planet we walk on
              </h1>
              <p className="text-md md:text-start text-white text-center mt-4 leading-8">
                Bibendum fermentum, aenean donec pretium aliquam blandit tempor
                imperdiet arcu arcu ut nunc in dictum mauris at ut.
              </p>
            </div>
            <div className="md:block mt-10">
              <Link href="/product-category/men">
                <button className=" w-full h-full md:w-[50%] md:h-[50%] px-5 py-3 mb-5 md:mr-5 bg-white text-black uppercase">
                  Shop Men
                </button>
              </Link>
              <Link href="/product-category/women">
                <button className=" w-full h-full md:w-[50%] md:h-[50%] px-5 py-3 mb-5 md:mr-5 bg-white text-black uppercase">
                  Shop Women
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-full px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center flex-col flex-wrap md:flex-row min-[996px]:justify-between py-12">
          <div>As Seen In:</div>
          <div className="flex items-center justify-center md:justify-between flex-wrap gap-5 dark:bg-white">
            <Image
              src="/logo1.svg"
              alt="logo image"
              width={150}
              height={150}
              className="w-auto h-auto"
            />
            <Image
              src="/logo2.svg"
              alt="logo image"
              width={150}
              height={150}
              className="w-auto h-auto"
            />
            <Image
              src="/logo3.svg"
              alt="logo image"
              width={150}
              height={150}
              className="w-auto h-auto"
            />
            <Image
              src="/logo4.svg"
              alt="logo image"
              width={150}
              height={150}
              className="w-auto h-auto"
            />
            <Image
              src="/logo5.svg"
              alt="logo image"
              width={150}
              height={150}
              className="w-auto h-auto"
            />
          </div>
        </div>
        <div className="max-w-5xl mx-auto w-full h-[1px] bg-gray-400"></div>
      </section>
    </>
  );
};

export default Header;
