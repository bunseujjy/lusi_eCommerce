import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProductByReview from "@/app/actions/getProductByReview";
import ProductDetails from "@/app/components/product/ProductDetails";
import prisma from "@/lib/db";
import { Metadata } from "next";

export interface IParams {
  productId?: string;
  id: string;
}

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Men Product ${params.id}`,
    description: `Men Product details for ${params.id}`,
  };
};

const ProductDetailPage = async ({ params }: { params: IParams }) => {
  const product = await getProductByReview(params);
  const user = await getCurrentUser();
  const products = await prisma.product.findUnique({
    where: { id: params.id },
    include: { reviews: { include: { user: true } } },
  });

  // Fetch related products excluding the current product
  const related = await prisma.product.findMany({
    where: {
      // Filter by category
      category: { hasSome: products?.category },
      // Exclude the current product
      NOT: { id: products?.id },
    },
    take: 6,
  });

  return (
    <>
      <ProductDetails
        product={product}
        products={products}
        user={user}
        related={related}
      />
    </>
  );
};

export default ProductDetailPage;
