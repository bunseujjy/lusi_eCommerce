import prisma from "@/lib/db";
import { Suspense } from "react";
import ProductPage from "@/app/components/product/ProductPage";
import Loading from "@/app/(route)/(product)/loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men Product",
  description: "Find your favorite shoes",
};

const MenPage = async () => {
  const product = await prisma.product.findMany({
    where: {
      category: { hasSome: ["men"] },
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

export default MenPage;
