import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function updateProductById(id: string) {
  try {
    // const product = await prisma.product.findUnique({ where: { id: id } });
    const res = await fetch(`/api/addProduct/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return NextResponse.json(
        { message: "Product updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to update product" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
