import { sendEmail } from "@/app/config/mail";
import ForgotPasswordEmail from "@/app/emails/ForgotPasswordEmail";
import prisma from "@/lib/db";
import { render } from "@react-email/components";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const payload = await request.json()

    // Check if the user email is exist
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        }
    })

    if  (!user) {
        return NextResponse.json({message: "No user found with this email."}, {status: 404})
    }

    // Generate random string
    const randomStr = cryptoRandomString({
        length: 64,
        type: "alphanumeric"
    })

    const today = new Date();
    const expiryDate = new Date(today.getTime() + 5 * 60 * 1000);
 
    user.token = randomStr
    user.passwordResetTokenExpiry = expiryDate

      await prisma.user.update({
       where: {
        email: user.email
        },
        data: {
            token: randomStr,
            passwordResetTokenExpiry: expiryDate
        }
    })
    
    // Encrypt user email

    const crypt= new Cryptr(process.env.NEXTAUTH_SECRET!)
    const ecryptedEmail = crypt.encrypt(user.email)

    const url = `${process.env.APP_URL}/reset-password/${ecryptedEmail}?signature=${randomStr}`

    try {
        const html = render(
            ForgotPasswordEmail({
              params: {
                username: user.name,
                url: url,
              },
            })
          );
      
    //  Send email to user
        await sendEmail(payload.email, "Password Reset Request for Sangzhi Ecommerce", html);

        return NextResponse.json({
        status: 200,
        message: "Email sent successfully.please check your email.",
        });
    } catch (error) {
        user.token = null;
        user.passwordResetTokenExpiry = null
        console.log("the error is", error);
        return NextResponse.json({
        status: 500,
        message: "Something went wrong.please try again!",
        });
    }
}