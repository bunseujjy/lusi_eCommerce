"use client";

import { TResetPassword, resetPassword } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ResetPassword = ({ params }: { params: { email: string } }) => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibles, setVisibles] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TResetPassword>({
    resolver: zodResolver(resetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TResetPassword) => {
    // Verify Token
    try {
      const res = await fetch("/api/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: params.email,
        }),
      });

      if (res.ok) {
        if (res.status === 501) {
          toast.error("Invalid Token");
        }
      }
    } catch (error) {
      toast.error("Invalid Token");
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: params.email,
          signature: searchParam.get("signature"),
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });
      if (res.status === 200) {
        toast.success(
          "Password changes successfully. Please login with the new password."
        );
        router.push("/sign-in");
      } else if (res.status === 500) {
        toast.error("Invalid Token or has expired. Please try again");
        reset();
      } else if (res.status === 404) {
        toast.error("Reset url is not correct. Please double check it");
      } else if (res.status === 400) {
        toast.error("Invalid Token or has expired. Please try again ");
        reset();
        setIsLoading(false);
      } else if (res.status === 401) {
        toast.error("Invalid Token or has expired. Please try again ");
        reset();
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      return NextResponse.json(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96 my-20 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-black">
        Change Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            New Password
          </label>
          <div className="relative">
            <div className="md-pt-3 w-1/12 bg-gray-100 bg-opacity-50 flex items-center justify-center absolute right-2 top-4 dark:bg-navy-600">
              {visible ? (
                <FaEye
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <FaEyeSlash
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
            <input
              {...register("password")}
              type={visible ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Enter your new password"
              className="mt-1 p-2 w-full border rounded-md dark:bg-navy-600"
            />
            {errors.password && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Confirm New Password
          </label>

          <div className="relative">
            <div className="md-pt-3 w-1/12 bg-gray-100 bg-opacity-50 flex items-center justify-center absolute right-2 top-4 dark:bg-navy-600">
              {visibles ? (
                <FaEye
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setVisibles(!visibles)}
                />
              ) : (
                <FaEyeSlash
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setVisibles(!visibles)}
                />
              )}
            </div>
            <input
              {...register("confirmPassword")}
              className="mt-1 p-2 w-full border rounded-md dark:bg-navy-600"
              type={visibles ? "password" : "text"}
              name="confirmPassword"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Change Password"}
          </button>
          <Link
            href="/sign-in"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer text-end"
          >
            Back to login?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
