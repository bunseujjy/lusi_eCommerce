import { getAllProduct } from "@/app/actions/getAllProduct";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import ProductInfo from "./AdminProductItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Product details",
};

const ProductsPage = async () => {
  const product = await getAllProduct();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }

  return <ProductInfo product={product} />;
};

export default ProductsPage;
