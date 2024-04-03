"use client";

import { TUploadProfile, uploadProfile } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCsrfToken, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import SpinnerButton from "../Spinner/SpinnerButton";
import Link from "next/link";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";

const AvatarUploader = ({ user }: any) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { profileImg, setProfileImg, previewImg, setPreviewImg } =
    useBetween(StateProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, register } = useForm<TUploadProfile>({
    resolver: zodResolver(uploadProfile),
    defaultValues: {
      email: session?.user.email as string,
      image: session?.user.image as string,
      public_id: user?.public_id,
    },
  });

  const handleFileChange = (event: any) => {
    setProfileImg(event.target.files[0]);
  };

  const onSubmit = async (data: TUploadProfile) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", profileImg as any);
      formData.append("upload_preset", "profileupload");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dvgefuzhi/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadedImageData = await uploadResponse.json();
      const imageUrl = uploadedImageData.secure_url;
      const publicId = uploadedImageData.public_id;
      console.log(imageUrl);

      setProfileImg(imageUrl);

      const res = await fetch("/api/upload", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          image: imageUrl,
          public_id: publicId,
        }),
      });

      update({ image: imageUrl });

      if (res.ok) {
        toast.success("Profile uploaded successfully");
        router.push("/");
        setIsLoading(false);
        return NextResponse.json("Profile uploaded successfully");
      } else {
        toast.error("Something went wrong");
        return NextResponse.json("Something went wrong");
      }
    } catch (error) {
      return NextResponse.json("Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            Avatar Upload!
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Lorem ipsum is placeholder text.
          </p>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 ">Email</label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg"
              {...register("email")}
              type="email"
              name="email"
              placeholder={session?.user.email!}
              value={session?.user.email as string}
              defaultValue={session?.user.email as string}
            />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Profile Avatar Uploader
            </label>
            <div className="w-full text-center my-5">
              <div className="w-[130px] h-[130px] rounded-full relative  justify-center items-center max-w-md mx-auto my-10">
                {profileImg ? (
                  <Image
                    src={profileImg}
                    alt="Profile Avatar"
                    width={200}
                    height={200}
                    className="w-[130px] h-[130px] rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={"/default-pf.jpg"}
                    alt="Profile Avatar"
                    width={200}
                    height={200}
                    className="w-[130px] h-[130px] rounded-full object-cover"
                  />
                )}
                <label className="absolute right-1 bottom-7 h-[30px] w-[30px] p-[6px] rounded-full cursor-auto text-white">
                  <input
                    {...register("image")}
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <FaUserEdit className="w-[30px] h-[30px] pr-1.5 pl-2 text-white rounded-full border-0 bg-[#08f] transition duration-100 cursor-pointer" />
                </label>
              </div>
              {isLoading ? (
                <div className="w-[30%] max-w-sm mx-auto mt-2 text-base leading-normal px-2 py-2 bg-blue-500 text-white rounded-full">
                  <SpinnerButton />
                </div>
              ) : (
                <button
                  className="mt-2 text-base leading-normal px-4 py-2 bg-blue-500 text-white rounded-full"
                  type="submit"
                >
                  Upload Profile
                </button>
              )}
            </div>
            <Link
              href="/"
              className="flex items-center justify-end font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer pt-10"
            >
              Continue to Homepage?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvatarUploader;
