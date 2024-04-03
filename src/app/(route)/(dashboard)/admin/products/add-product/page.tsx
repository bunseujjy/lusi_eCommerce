import { getCurrentUser } from "@/app/actions/getCurrentUser";
import AddProduct from "./AddProduct";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adding Product.",
  description: "Adding product to this website",
};

const AddProductPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return <AddProduct />;
};

export default AddProductPage;
