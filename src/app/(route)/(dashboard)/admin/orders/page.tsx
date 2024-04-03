import prisma from "@/lib/db";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import OrderItems from "./OrderItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order details.",
  description: "Order details of this website",
};

const OrdersPage = async () => {
  const order = await prisma.order.findMany();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return <OrderItems order={order} />;
};

export default OrdersPage;
