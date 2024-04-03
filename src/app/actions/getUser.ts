import prisma from "@/lib/db"
import toast from "react-hot-toast"

export default async function getUsers () {
    try {
        const users = prisma.user.findMany()

        return users
    } catch (error: any) {
        throw new Error(error)
    }
}