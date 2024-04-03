import prisma from "@/lib/db";
import AboutUs from "./components/Homepage/AboutUs";
import CustomerComment from "./components/Homepage/CustomerComment";
import Footer from "./components/Homepage/Footer";
import Header from "./components/Homepage/Header";
import HowShoesMade from "./components/Homepage/HowShoesMade";
import Navbar from "./components/Homepage/Navbar";
import ShopMenAndWomen from "./components/Homepage/ShopMenAndWomen";
import NewArrivals from "./components/Homepage/NewArrivals";
import { getAllProduct } from "./actions/getAllProduct";
import Link from "next/link";
import { getCurrentUser } from "./actions/getCurrentUser";

const Home = async () => {
  const user = await getCurrentUser();
  const contact = await prisma.contact.findMany({ include: { user: true } });
  const product = await prisma.product.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    include: { reviews: true },
  });

  const bestSelling = await prisma.product.findMany({
    where: {
      sold: {
        gt: 0,

        // Filter out products with sold quantity greater than 0
      },
    },
    orderBy: [
      {
        sold: "desc",
      },
    ],
  });
  const products = await getAllProduct();
  return (
    <>
      <Navbar products={products} user={user} />
      <Header />
      <AboutUs />
      <HowShoesMade style={{ background: "#f1f1ef", color: "#000" }} />
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
          <NewArrivals product={bestSelling} />
        </div>
      </section>
      <ShopMenAndWomen />
      <section className="py-[96px] px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-sm md:text-lg">New Arrivals</h1>
            <Link
              href=""
              className="border-b-2 border-b-[#f6aa28] uppercase hover:border-b-black text-sm md:text-lg"
            >
              View All New Arrivals
            </Link>
          </div>
          <NewArrivals product={product} />
        </div>
      </section>
      <CustomerComment user={user} contact={contact} />
      <Footer />
    </>
  );
};

export default Home;
