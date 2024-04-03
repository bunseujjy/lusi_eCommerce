import { getAllProduct } from "@/app/actions/getAllProduct";
import Navbar from "@/app/components/Homepage/Navbar";
import Cart from "@/app/components/product/Cart";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout your product.",
};

const CartPage = async () => {
  const products = await getAllProduct();
  return (
    <>
      <Navbar products={products} />
      <Cart />
    </>
  );
};

export default CartPage;
