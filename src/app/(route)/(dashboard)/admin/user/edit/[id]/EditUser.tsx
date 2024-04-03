"use client";

import { StateProps } from "@/lib/StateProps";
import { TCreateUser, createUser } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useBetween } from "use-between";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddUser = ({ user }: any) => {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<string>();
  const { loading, setLoading } = useBetween(StateProps);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateUser>({
    resolver: zodResolver(createUser),
    defaultValues: {
      name: user.name,
      email: user.email,
      image: "",
      password: "",
      confirmPassword: "",
      role: user.role,
      public_id: "",
    },
  });

  const handleProfileImg = (e: any) => {
    const file = e.target.files[0];

    transformFile(file);
  };

  const transformFile = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
    } else {
      setProfileImg("");
    }
  };

  const onSubmit = async (data: TCreateUser) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/addUser/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          image: profileImg,
          role: data.role,
          public_id: data.public_id,
        }),
      });
      if (response.ok) {
        toast.success("User updated successfully");
        router.push("/admin/user");
        router.refresh();
        reset();
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen bg-gray-50 dark:bg-transparent text-black mx-5 min-[1280px]:mx-16 relative"
    >
      <div className="py-4 w-full h-full md:h-auto">
        <div className="w-full relative p-4 bg-white dark:bg-navy-700 rounded-lg shadow sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-navy-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit User
            </h3>
          </div>
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={user.name}
                />
                {errors.name && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={user.email}
                />
                {errors.email && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="User password"
                />

                {errors.password && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Confirm Password"
                />

                {errors.confirmPassword && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Stock
                </label>
                <select
                  {...register("role")}
                  id="role"
                  name="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="" disabled>
                    Select Roles
                  </option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-1 my-7">
                <div
                  className={`${
                    profileImg
                      ? "h-24 bg-white shadow-sm rounded-sm border border-gray-200"
                      : ""
                  }`}
                >
                  {profileImg ? (
                    <Image
                      src={profileImg}
                      alt="Product Image"
                      className="w-24 h-24 object-cover"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image
                      src={user.image}
                      alt="Product Image"
                      className="w-24 h-24 object-cover"
                      width={50}
                      height={50}
                    />
                  )}
                </div>
                <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div>Add image</div>
                  <input
                    {...register("image")}
                    name="image"
                    type="file"
                    className="hidden"
                    onChange={handleProfileImg}
                  />
                </label>
              </div>
            </div>
            <button
              onClick={() => setLoading(false)}
              type="submit"
              className="border bg-cyan-500 dark:border-0 dark:bg-brand-400 dark:hover:bg-brand-200 px-4 py-2 text-white rounded-md"
            >
              {loading ? "Proccessing..." : "Update User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
