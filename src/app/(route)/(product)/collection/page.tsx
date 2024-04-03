import prisma from "@/lib/db";
import { Suspense } from "react";
import Loading from "../loading";
import ProductPage from "@/app/components/product/ProductPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoes Collection",
  description:
    "Finding your favorite shoes in this collection that available in our shop",
};

const Collection = async () => {
  const product = await prisma.product.findMany({});
  return (
    <Suspense fallback={<Loading />}>
      <ProductPage product={product} />
    </Suspense>
  );
};

export default Collection;
