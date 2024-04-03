import prisma from "@/lib/db";

export async function getAllProduct() {
  const products = await prisma.product.findMany({
    orderBy: [
      {
        price: "desc",
      },
    ],
  });

  if (products) {
    return products;
  }
}
