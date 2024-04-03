import Loading from "@/app/(route)/(product)/loading";
import ProductPage from "@/app/components/product/ProductPage";
import prisma from "@/lib/db";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women Product",
  description: "Find your favorite shoes",
};

const WomenPage = async () => {
  const product = await prisma.product.findMany({
    where: {
      category: { hasSome: ["women"] },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <Suspense fallback={<Loading />}>
      <ProductPage product={product} />
    </Suspense>
  );
};

export default WomenPage;
