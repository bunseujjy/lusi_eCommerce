import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(request: Request) {
    try {
        const body = await request.json()

        const {secure_url,public_id, email} = body

        const userId = await prisma.user.findUnique({where: {email: email}})
        
        const publicId = userId?.public_id

        if(userId?.public_id) {
            await cloudinary.uploader.destroy(publicId as string)
        }

            const user = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    image: secure_url,
                    public_id: public_id,
                }
            })
                if(!user) {
                    return null
                }
                
            return NextResponse.json({message: "Profile avatar updated successfully"}, {status: 200})
                
        } catch (error) {
        return NextResponse.json({message: "Failed to upload profile"}, {status: 500})
    }
}

// export async function PATCH(request: Request) {
//     try {
//         const body = await request.json()

//         const {image, id} = body

//         const userID = await prisma.user.findUnique({where: {id: id}})

//         // if(image && image === "/default-pf.jpg") {
//         //     const imgId = userID?.public_id
//         //     if(imgId) {
//         //         await cloudinary.uploader.destroy(imgId)
//         //     } 
//         // }

//         if(image) {
//             const newImg = await cloudinary.uploader.upload(image, {
//                 upload_preset: "profileupload",
//             })
    
//             if(newImg) {
//                 const user = await prisma.user.update({
//                     where: {
//                         id: id
//                     },
//                     data: {
//                         image: newImg.url,
//                         public_id: newImg.public_id as string,
//                     }
//                 })
//                     if(!user) {
//                         return null
//                     }
                    
//                 return NextResponse.json({message: "Profile avatar updated successfully"}, {status: 200})
//             }
//         }

       

//     } catch (error) {
//         return NextResponse.json({message: "Failed to upload profile"}, {status: 500})
//     }
// }