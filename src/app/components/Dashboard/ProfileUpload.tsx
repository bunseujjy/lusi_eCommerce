"use client";

import { StateProps } from "@/lib/StateProps";
import { TUploadProfile, uploadProfile } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GrSelect } from "react-icons/gr";
import { MdCloudUpload } from "react-icons/md";
import { useBetween } from "use-between";

const ProfileUpload = ({ user }: any) => {
  const { setProfileImg } = useBetween(StateProps);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm<TUploadProfile>({
    resolver: zodResolver(uploadProfile),
    defaultValues: {
      image: "",
    },
  });

  const handleProductImage = (e: any) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg(reader.result as any);
      };
    } else {
      setProfileImg(user.image);
    }
  };

  const onSubmit = async (data: TUploadProfile) => {
    setLoading(true);
    const res = await fetch("/api/upload", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: data.image,
      }),
    });
    if (res.ok) {
      router.refresh();
      toast.success("Profile avatar uploaded successfully");
      reset();
    } else {
      toast.error("Failed to upload profile avatar");
    }
    setLoading(false);
  };

  return (
    <div
      className="bg-white flex mb-6 rounded-2xl flex-col dark:bg-slate-900/70"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-1 p-6 undefined">
        <div className="mb-6 last:mb-0">
          <label className="block font-bold mb-2 ">Avatar</label>
          <div className="relative">
            <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary mb-5">
              <GrSelect size={20} />
              Choose File
              <input
                type="file"
                name="image"
                className="hidden w-full h-full cursor-pointer -z-1"
              />
            </label>
            <div className="flex items-stretch justify-start relative">
              <label className="inline-flex">
                <div className="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3">
                  <span className="inline-flex justify-center items-center w-6 h-6">
                    <MdCloudUpload size={20} />
                  </span>
                  <span className="px-2">
                    {loading ? "Uploading" : "Upload"}
                  </span>
                </div>
                <input
                  {...register("image")}
                  type="file"
                  name="image"
                  className="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
                  onChange={handleProductImage}
                />
              </label>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Max 500kb
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpload;
