import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import prisma from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
        CredentialsProvider({
            name: "Credentials", 
            credentials: {
            email: { label: "Email", type: "email", placeholder: "name@mail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) {
              return null
            }

            const {email, password} = credentials

            const existingUser = await prisma.user.findUnique({
              where: { email}
            })

            if(!existingUser) {
              return null
            }

            await prisma.user.update({
              where: {
                email: email
              },
              data:{
                lastLogin: new Date()
              }
            })

            const passwordMatched = await bcrypt.compare(password, existingUser.hashedPassword!)
        
            if(!passwordMatched) {
              return null
            }
 
            return existingUser
            
          }
        })
      ],
      callbacks: {
        async jwt({token, user, session, trigger}) {

          if(user) {
            return {
              ...token,
              id: user.id,
              name: user.name,
              image: user.image,
              role: user.role
            }
          }
            if(trigger === "update") {
              if(session?.name) {
                token.name = session.name
              } else if (session?.image) {
                
                token.image = session.image
              }
                console.log("User updated successfully")
            } 

          await prisma.user.update({
            where: {
              id: token.id as string
            }, 
            data: {
              name: token.name as string,
            }
          })

          await prisma.user.update({
            where: {
              id: token.id as string
            }, 
            data: {
              image: token.image as string,
            }
          })


          return token
      },

      async session({session, token}) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            image: token.image as string,
            name: token.name,
            role: token.role
          }
        }
      },
      
      async signIn({account, profile}) {
        if(account?.provider === "google") {
          console.log(profile)
          const existingUser = await prisma.user.findUnique({
            where: {
              email: profile?.email
            }
          })
          if(existingUser) {
            console.log("User created successfully")
          } 
        }
        return true
      },
      async redirect({ url, baseUrl }) { return baseUrl },
    
} 
}
