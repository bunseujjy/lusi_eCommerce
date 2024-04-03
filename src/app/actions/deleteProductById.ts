import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function deleteProduct(id: string) {
    try {
        const res = await fetch(`/api/addProduct/${id}`, {
            method: "DELETE"
        });

        if(res.ok) {
            toast.success("Product deleted successfully")
            return NextResponse.json({message: "Product deleted successfully"}, {status: 200})
        } else {
            toast.error("Failed to deleted product")
        }
    } catch (error) {
        return NextResponse.json({message: "Failed to delete product"}, {status: 500})
    }
}