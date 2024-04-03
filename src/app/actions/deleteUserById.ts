import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function deleteUser(id: string) {
    try {
        const res = await fetch(`/api/addUser/${id}`, {
            method: "DELETE"
        });

        if(res.ok) {
            toast.success("User deleted successfully")
            return NextResponse.json({message: "User deleted successfully"}, {status: 200})
        } else {
            toast.error("Failed to deleted user")
        }
    } catch (error) {
        return NextResponse.json({message: "Failed to delete user"}, {status: 500})
    }
}