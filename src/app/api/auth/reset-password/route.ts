import prisma from "@/lib/db";
import Cryptr from "cryptr";
import {  NextResponse } from "next/server";
import bcrypt from "bcrypt";

type ResetPasswordPayload = {
  email: string;
  signature: string;
  password: string;
  confirmPassword: string
}

interface Date {
  // other properties...
  $gt?: Date;
} 

export async function POST(request: Request, token: string,) {
  const payload :ResetPasswordPayload = await request.json();


  //  Decrypt string
  const crypter = new Cryptr(process.env.NEXTAUTH_SECRET!);
  const email = crypter.decrypt(payload.email);

  const user = await prisma.user.findUnique({
    where: {
        email: email,
    }});

  if (user === null || user === undefined) {
    return NextResponse.json({
      status: 404,
      message: "Reset url is not correct. pls double check it .",
    });
  } 

  const passwordResetTokenExpiry = user.passwordResetTokenExpiry 

  if(!passwordResetTokenExpiry) {
    return NextResponse.json({message: "Invalid Token or has expired. Please try again"}, {status: 500})
  }
  
  const today = new Date();

  if(today > passwordResetTokenExpiry) {
    return NextResponse.json({message: "Invalid Token or has expired. Please try again"}, {status: 400})
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12)
  
  const resetPassword = await prisma.user.update({
    where: {
      email: email
    },
    data: {
       hashedPassword,
      token: null,
      passwordResetTokenExpiry: null
    }
  })

  console.log(resetPassword)
  return NextResponse.json({
    status: 200,
    message: "Password changed successfully. please login with new password.",
  })};