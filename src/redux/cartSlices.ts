import {  createSlice } from "@reduxjs/toolkit";

export type ProductType = {
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

export interface StoreType {
    products: ProductType[]
    orderData: ProductType[]
    qty: number
}

const initialState: StoreType = {
    products: [],
    orderData: [],
    qty: 0,
} 

const cartSlices = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state, action) => {
            const {id, title, description, price, discount, images, category, inStock} = action.payload
            const existingProduct = state.products.find((item: ProductType) => item.id === action.payload.id)
            if (existingProduct) {
                existingProduct.qty += 1
            } else {
                state.products.push({id, title, description, price, discount, images, category, inStock, qty: 1})
            }
        },
        removeFromCart:(state, action) => {
            state.products = state.products.filter((item: ProductType) => item.id !== action.payload)
        },
        incremetQty: (state, action) => {
            const existingProduct = state.products.find((item: ProductType) => item.id === action.payload)
            if(existingProduct) {
                existingProduct.qty += 1
            }
        },
        decrementQty: (state, action) => {
            const existingProduct = state.products.find((item: ProductType) => item.id === action.payload)
            if(existingProduct && existingProduct.qty > 1) {
                existingProduct.qty -= 1
            }
        },
        saveOrder: (state, action) => {
            state.orderData = action.payload
        },
        
        resetOrder: (state) => {
            state.orderData = []
        }
    }
})

export const {addToCart, removeFromCart, incremetQty, decrementQty, saveOrder, resetOrder} = cartSlices.actions
export default cartSlices.reducer