"use client";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa6";
import {
  MdCloudUpload,
  MdMarkEmailRead,
  MdOutlineVerified,
} from "react-icons/md";
import { TfiGithub } from "react-icons/tfi";
import { GrSelect } from "react-icons/gr";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TUpadateUserPassword,
  TUpdateUsername,
  TUploadProfile,
  updateUserPassword,
  updateUsername,
  uploadProfile,
} from "@/types/type";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import moment from "moment";

const ProfilePage = ({ user }: any) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const {
    profileImg,
    setProfileImg,
    loadingName,
    setLoadingName,
    loadingPassword,
    setLoadingPassword,
    loading,
    setLoading,
  } = useBetween(StateProps);
  const { handleSubmit, register, reset } = useForm<TUploadProfile>({
    resolver: zodResolver(uploadProfile),
    defaultValues: {
      email: session?.user.email as string,
      image: "",
    },
  });
  const {
    handleSubmit: handleUsername,
    register: registerUsername,
    formState: { errors: errorName },
  } = useForm<TUpdateUsername>({
    resolver: zodResolver(updateUsername),
  });

  const {
    handleSubmit: handlePass,
    register: registerPassword,
    reset: resetPwForm,
    formState: { errors },
  } = useForm<TUpadateUserPassword>({
    resolver: zodResolver(updateUserPassword),
    defaultValues: {
      email: session?.user.email as string,
    },
  });

  const handleFileChange = (event: any) => {
    setProfileImg(event.target.files[0]);
  };

  const handleProfile = async (data: TUploadProfile) => {
    setLoading(true);
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
        router.push("/admin/profile");
        return NextResponse.json("Profile uploaded successfully");
      } else {
        toast.error("Something went wrong");
        router.refresh();
        setLoading(false);
        return NextResponse.json("Something went wrong");
      }
    } catch (error) {
      return NextResponse.json("Something went wrong");
    }
  };

  const handleName = async (data: TUpdateUsername) => {
    setLoadingName(true);
    try {
      const updateUsername = update({
        name: data.name,
      });

      if (!updateUsername) {
        toast.error("Failed to update username");
      } else {
        toast.success("Username updated successfully");
        router.refresh();
        setLoadingName(false);
      }
    } catch (error) {
      return NextResponse.json("Error");
    }
    setLoadingName(false);
  };

  const handlePassword = async (data: TUpadateUserPassword) => {
    setLoadingPassword(true);
    try {
      const res = await fetch("/api/updatePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (res.status === 400) {
        toast.error("Failed to update user");
        return NextResponse.json({ message: "Failed to update user" });
      }

      if (res.status === 401) {
        toast.error("User not existed");
        return NextResponse.json({
          message: "User not existed",
        });
      }
      if (res.status === 201) {
        resetPwForm();
        setLoadingPassword(false);
        toast.success("User updated Successfully");
        router.refresh();
        return NextResponse.json({ message: "User updated Successfully" });
      }
    } catch (error) {
      return NextResponse.json("Error");
    }
    setLoadingPassword(false);
  };

  return (
    <section className="py-6 px-5 md:px-16 xl:max-w-6xl xl:mx-auto">
      <section className=" mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="pr-4">
            <FaUserCircle size={35} />
          </span>
          <h1 className="text-2xl">Profile</h1>
        </div>
        <a
          href="https://github.com/SangZhii"
          className="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded-full border-gray-800 dark:border-white ring-gray-300 dark:ring-gray-400 bg-gray-800 text-white dark:bg-white dark:text-black hover:bg-gray-700 hover:dark:bg-slate-100  text-sm px-3 py-1"
        >
          <TfiGithub size={20} />
          <div className="px-4">
            <p>Star on GitHub</p>
          </div>
        </a>
      </section>
      <div className="bg-white flex mb-6 rounded-2xl flex-col dark:bg-navy-800">
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
            <div className="mb-6 lg:mb-0 lg:mx-12">
              {profileImg ? (
                <Image
                  src={"/avatar.svg"}
                  alt="profile image"
                  width={25}
                  height={25}
                  className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
                />
              ) : (
                <Image
                  src={session?.user.image as string}
                  alt="profile image"
                  width={300}
                  height={300}
                  className="w-[300px] h-[300px] rounded-full object-cover"
                />
              )}
            </div>
            <div className="space-y-3 text-center lg:text-left lg:mx-12 ">
              <h1>Welcome, {session?.user.name as string}!</h1>
              <p>Account created {moment(user.lastLogin).fromNow()}</p>
              <div className="flex justify-center md:block">
                <div className="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-blue-500 border-blue-500 text-white ">
                  <span className="inline-flex justify-center items-center w-4 h-4 mr-2">
                    <MdOutlineVerified size={20} />
                  </span>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="bg-white flex mb-6 rounded-2xl flex-col dark:bg-navy-800">
            <form
              className="flex-1 p-6 undefined"
              onSubmit={handleSubmit(handleProfile)}
            >
              <div className="mb-6 last:mb-0">
                <label className="block font-bold mb-2 ">Avatar</label>
                <div className="relative">
                  <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary mb-5">
                    <GrSelect size={20} />
                    Choose File
                    <input
                      {...register("image")}
                      type="file"
                      name="image"
                      className="hidden w-full h-full cursor-pointer -z-1"
                      onChange={handleFileChange}
                    />
                  </label>
                  <div className="flex items-stretch justify-start relative">
                    <label className="inline-flex">
                      <div className="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border text-white dark:border-brand-700 cursor-pointer rounded dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-blue-700 hover:border-navy-700 hover:dark:border-navy-600 py-2 px-3">
                        <span className="inline-flex justify-center items-center w-6 h-6">
                          <MdCloudUpload size={20} />
                        </span>
                        <button type="submit" className="px-2">
                          {loading ? "Uploading" : "Upload"}
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Max 500kb
                </div>
              </div>
            </form>
          </div>

          {/* Change Username  */}
          <form
            onSubmit={handleUsername(handleName)}
            className="bg-white flex flex-1 rounded-2xl flex-col dark:bg-navy-800"
          >
            <div className="flex flex-col flex-1">
              <div className="flex-1 p-6 undefined">
                <div className="mb-6 last:mb-0">
                  <label className="block font-bold mb-2 cursor-pointer">
                    New Name
                  </label>
                  <div className="relative">
                    <input
                      {...registerUsername("name")}
                      className="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-12 border bg-white dark:bg-slate-800 pl-10"
                      name="name"
                      id="name"
                      placeholder="Name"
                      defaultValue={user.name}
                    />
                    <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                      <FaUserCircle size={20} />
                    </span>
                  </div>
                  {/* error message */}
                  <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    {errorName.name && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {errorName.name?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6 last:mb-0">
                  <label className="block font-bold mb-2 cursor-pointer">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      {...register("email")}
                      {...registerPassword("email")}
                      className="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-12 border bg-white dark:bg-slate-800 pl-10"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={session?.user.email as string}
                    />
                    <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                      <MdMarkEmailRead size={20} />
                    </span>
                  </div>{" "}
                  {/* error message */}
                  <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                    {errors.email && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <footer className="p-6 undefined">
                <div className="flex items-center justify-start undefined -mb-3 flex-wrap">
                  <button
                    className="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border text-white dark:border-brand-700 cursor-pointer rounded dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-blue-700 hover:border-navy-700 hover:dark:border-navy-600 py-2 px-3"
                    type="submit"
                    onClick={() => setLoadingName(false)}
                  >
                    <span className="px-2">
                      {loadingName ? "Proccessing" : "Submit"}
                    </span>
                  </button>
                </div>
              </footer>
            </div>
          </form>
        </div>
        {/* Change Password */}
        <form
          className="bg-white flex flex-1 rounded-2xl flex-col dark:bg-navy-800"
          onSubmit={handlePass(handlePassword)}
        >
          <div className="flex flex-col flex-1">
            <div className="flex-1 p-6 undefined">
              <div className="mb-6 last:mb-0">
                <label className="block font-bold mb-2 cursor-pointer">
                  New Password
                </label>
                <div className="relative">
                  <input
                    {...registerPassword("password")}
                    className="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-12 border bg-white dark:bg-slate-800 pl-10"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New Password"
                  />
                  <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                    <MdMarkEmailRead size={20} />
                  </span>
                </div>{" "}
                {/* error message */}
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  {errors.password && (
                    <p className="text-xs italic text-red-500 mt-2">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6 last:mb-0">
                <label className="block font-bold mb-2 cursor-pointer">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...registerPassword("confirmPassword")}
                    className="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none h-12 border bg-white dark:bg-slate-800 pl-10"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                    <MdMarkEmailRead size={20} />
                  </span>
                </div>{" "}
                {/* error message */}
                <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  {errors.confirmPassword && (
                    <p className="text-xs italic text-red-500 mt-2">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="p-6 undefined">
              <div className="flex items-center justify-start undefined -mb-3 flex-wrap">
                <button
                  className="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border text-white dark:border-brand-700 cursor-pointer rounded dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-700 hover:bg-blue-700 hover:border-navy-700 hover:dark:border-navy-600 py-2 px-3"
                  type="submit"
                  onClick={() => setLoadingPassword(false)}
                >
                  <span className="px-2">
                    {loadingPassword ? "Proccessing" : "Submit"}
                  </span>
                </button>
              </div>
            </footer>
          </div>
        </form>
      </div>
      <footer className="py-2 px-6 xl:max-w-6xl xl:mx-auto">
        <div className="block md:flex items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <b>
              &#169;2024,{" "}
              <a href="https://www.facebook.com/YuTuQJJ">Sangzhi.lusi.</a>
              Visit my <a href="https://github.com/SangZhii">GitHub</a>
            </b>
          </div>
          <div className="md:py-2">
            <a href="https://github.com/SangZhii">
              <FaGithubAlt
                size={20}
                className="w-auto h-8 md:h-6 mx-auto mt-3"
              />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ProfilePage;
