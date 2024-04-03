import { getAllProduct } from "@/app/actions/getAllProduct";
import Navbar from "@/app/components/Dashboard/Navbar";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import prisma from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s - Lusi-Ecommerce",
  },
  description: "Manage your shop",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const product = await getAllProduct();
  const order = await prisma.order.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  const user = await prisma.user.findMany();
  return (
    <div className="min-[1280px]:pl-80 transition-position lg:w-auto bg-gray-50 dark:bg-navy-900 dark:text-slate-100">
      <div className="z-[10] md:sticky top-5">
        <Navbar product={product} order={order} user={user} />
      </div>
      {/* <div className=" top-0 inset-x-0 fixed bg-gray-50 h-14 z-30 transition-position w-screen lg:w-auto dark:bg-navy-800"> */}
      <Sidebar />
      {/* </div> */}
      {children}
    </div>
  );
}
