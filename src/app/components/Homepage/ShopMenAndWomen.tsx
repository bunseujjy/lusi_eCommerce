import Link from "next/link";

const ShopMenAndWomen = () => {
  return (
    <div className="min-h-[480px] md:min-h[240px] lg:min-h-[480px] flex flex-wrap md:grid md:grid-cols-2 lg:px-10 lg:gap-10">
      <div className="bg-shop-men bg-center bg-no-repeat bg-cover w-full">
        <div className="w-[100%] h-full flex items-center justify-center flex-col">
          <h1 className="text-3xl text-white tracking-wide text-center font-semibold pb-5">
            Men
          </h1>
          <div className="font-semibold">
            <Link
              href="/product-category/men"
              className="py-2 px-5 border-white border-2 text-white uppercase tracking-widest hover:bg-white hover:text-black transform duration-500"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-shop-women bg-center bg-no-repeat bg-cover w-full">
        <div className="w-[100%] h-full flex items-center justify-center flex-col">
          <h1 className="text-3xl text-white tracking-wide text-center font-semibold pb-5">
            Women
          </h1>
          <div className="font-semibold">
            <Link
              href="/product-category/women"
              className="py-2 px-5 border-white border-2 text-white uppercase tracking-widest hover:bg-white hover:text-black transform duration-500"
            >
              Shop Women
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopMenAndWomen;
