import prisma from "@/lib/db";


export const connectDB = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error("Failed to connect db")
    }
}