import prisma from "@/lib/db";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import CustomerItems from "./CustomerItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer details",
  description: "Customer details of this website",
};

const CustomersPage = async () => {
  const order = await prisma.order.findMany({ include: { user: true } });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return <CustomerItems order={order} />;
};

export default CustomersPage;
