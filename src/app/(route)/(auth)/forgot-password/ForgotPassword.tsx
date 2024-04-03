"use client";

import { TForgotPassword, forgotPassword } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { NextResponse } from "next/server";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPassword>({
    resolver: zodResolver(forgotPassword),
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: TForgotPassword) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      if (res.status === 200) {
        toast.success("Email sent successfully. please check your email.");
      } else if (res.status === 404) {
        toast.error("No user found with this email.");
      } else if (res.status === 500) {
        toast.error("Something went wrong.please try again!");
      }
    } catch (error) {
      return NextResponse.json(error);
    }
    setIsLoading(false);
  };
  return (
    <div className="max-w-lg mx-auto my-[240px] relative bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium dark:text-black">Reset password</h1>
      <p className="text-slate-500">Fill up the form to reset the password</p>

      <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-navy-600"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.email?.message}
              </p>
            )}
          </label>

          <button
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>{isLoading ? "Loading..." : "Reset password"}</span>
          </button>
          <p className="text-center dark:text-black">
            Not registered yet?
            <Link
              href="/sign-up"
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
            >
              <span className="pl-2">Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
