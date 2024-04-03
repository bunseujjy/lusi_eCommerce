import Link from "next/link";
import Navbar from "../components/Homepage/Navbar";

const SuccessPage = () => {
  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center py-20">
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
          <h2 className="text-4xl font-bold text-center">
            Your Payment Accepted by lusishoe.com
          </h2>
          <p className="text-center">
            Now you can view your Orders and continue Shopping with us.
          </p>
          <div className="flex items-center gap-x-5">
            <Link href={"/order"}>
              <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300 cursor-pointer">
                View Orders
              </button>
            </Link>
            <Link href={"/"}>
              <button className="w-44 h-12 rounded-full bg-black text-white p-2 hover:bg-orange-600 cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuccessPage;
