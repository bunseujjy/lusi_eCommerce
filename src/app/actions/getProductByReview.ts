import prisma from "@/lib/db";

interface IParams {
    productId?: string
}

export default async function getProductByReview(params: IParams) {
    try {
        
        const {productId} = params;

        const product = await prisma.product.findUnique({

            where: {
                id: productId
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })
        if(!product) {
            return null
        }
        return product
    } catch (error: any) {
        return null
    }
}