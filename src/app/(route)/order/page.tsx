import { getAllProduct } from "@/app/actions/getAllProduct";
import Order from "./Order";
import prisma from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order",
  description: "Your order product",
};

export interface IOrder {
  id: string;
  userId: number;
  orderID: number;
  productId: string[];
  products: string[];
  email: string;
  name: string;
  postcode: string;
  address: string;
  phoneNumber: string;
  paid: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderPage = async () => {
  const order = await prisma.order.findMany({ orderBy: { id: "desc" } });

  // Retrieve the last order
  const lastOrder = order.length > 0 ? order[0] : null;

  // Find all orders created before the last order
  const previousOrders = lastOrder
    ? await prisma.order.findMany({
        where: {
          createdAt: { lt: lastOrder.createdAt },
        },
        select: { userId: true },
      })
    : [];

  const products = await getAllProduct();
  return (
    <Order order={order} previousOrders={previousOrders} products={products} />
  );
};

export default OrderPage;
