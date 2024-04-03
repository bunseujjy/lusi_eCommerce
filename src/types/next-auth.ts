import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    name: string
    image: string | null
    role: UserRole
  }

  interface Session {
    user: User & {
      name: string
      image: string | null
    }
    token: {
        name: string
        image: string | null
        role: UserRole
    }
  }
}