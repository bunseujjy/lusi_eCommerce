import prisma from "@/lib/db";
import React from "react";
import OrderDetails from "../OrderDetails";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Order ${params.id}`,
    description: `Order ${params.id}`,
  };
};

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  const order = await prisma.order.findUnique({ where: { id: params.id } });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return <OrderDetails order={order} />;
};

export default OrderDetailsPage;
