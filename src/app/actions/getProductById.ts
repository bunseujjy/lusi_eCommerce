import { NextResponse } from "next/server";

export async function getProductById(id: string) {
  try {
    const res = await fetch(`/api/addProduct/${id}`);

    const product = await res.json();

    if (product) {
      return product;
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
