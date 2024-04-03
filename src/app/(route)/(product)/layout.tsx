import { getAllProduct } from "@/app/actions/getAllProduct";
import Navbar from "@/app/components/Homepage/Navbar";
import { Poppins } from "next/font/google";
import { Metadata } from "next";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Product",
    template: "%s - Lusi-Ecommerce",
  },
  description: "Find your favorite shoes",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getAllProduct();
  return (
    <div className={`${poppins.className}`}>
      <Navbar products={products} />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
