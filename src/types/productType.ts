export interface ProductType  {
        id: string,
        title: string,
        price: number,
        discount: number,
        qty: number,
        description: string,
        category: string[],
        images: string,
        inStock: string
}
export interface ReduxProps {
        cart: {
            products: [],
            orderData: {
                orderData: ProductType[],
                orderID: string,
                email: string,
                name: string,
                address: string,
                postcode: string,
                phoneNumber: string
                createdAt: string,
            },
        }
}