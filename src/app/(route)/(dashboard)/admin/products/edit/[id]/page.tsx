import prisma from "@/lib/db";
import React from "react";
import EditProduct from "./EditProduct";
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
    title: `Edit products ${params.id}`,
    description: `Edit products ${params.id}`,
  };
};

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return (
    <main>
      <EditProduct product={product} />
    </main>
  );
};

export default EditProductPage;
