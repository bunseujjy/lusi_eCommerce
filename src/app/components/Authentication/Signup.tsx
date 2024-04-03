"use client";

import { TSignUpForm, signUpForm } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SpinnerButton from "../Spinner/SpinnerButton";
import Link from "next/link";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Register = ({ variant, extra, state, disabled, color }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibles, setVisibles] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    async (data: TSignUpForm) => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            name: data.name,
            password: data.password,
            image: "/default-pf.jpg",
            ipAddress: data.ipAddress,
          }),
        });

        if (response.ok) {
          router.push("/sign-in");
        } else {
          console.log("failed");
        }

        console.log(response);
        if (response.status === 401) {
          toast.error("User already exists");
        }
        if (response.status === 200) {
          toast.success("Sign-up successfully");
          router.push("/sign-in");
        }
        if (response.status === 500) {
          toast.error("Failed to sign-up");
        }
      } catch (error) {
        return NextResponse.json({ message: "Failed to create user" });
      }
      setIsLoading(false);
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <main className="mx-auto min-h-screen">
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Link href="/admin" className="mt-0 w-max lg:pt-10">
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                        fill="#A3AED0"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-gray-600">
                      Back to Dashboard
                    </p>
                  </div>
                </Link>
                <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                  {/* Sign in section */}
                  <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                      Create an account
                    </h4>
                    <p className="mb-9 ml-1 text-base text-gray-600">
                      Enter your username / email and password to create a new
                      account
                    </p>
                    <div
                      className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F4F7FE] hover:cursor-pointer dark:bg-navy-800"
                      onClick={() => signIn("google")}
                    >
                      <button className="rounded-full text-xl">
                        <FcGoogle />
                      </button>
                      <h5 className="text-sm font-medium text-navy-700 dark:text-white">
                        Sign In with Google
                      </h5>
                    </div>
                    <div className="mb-6 flex items-center  gap-3">
                      <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                      <p className="text-base text-gray-600 dark:text-white">
                        or
                      </p>
                      <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                    </div>
                    {/* Username */}
                    <div className={`${extra}`}>
                      <label
                        className={`text-sm text-navy-700 dark:text-white  ${
                          variant === "auth"
                            ? "ml-1.5 font-medium"
                            : "ml-3 font-bold my-2"
                        }`}
                      >
                        <p className="py-1">Username*</p>
                      </label>
                      <input
                        {...register("name")}
                        name="name"
                        placeholder="Enter your username"
                        id="name"
                        type="name"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                          disabled === true
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                            : "border-gray-200 dark:!border-white/10 dark:text-white"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs italic text-red-500 mt-2">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className={`${extra}`}>
                      <label
                        className={`text-sm text-navy-700 dark:text-white  ${
                          variant === "auth"
                            ? "ml-1.5 font-medium"
                            : "ml-3 font-bold my-2"
                        }`}
                      >
                        <p className="py-1">Email*</p>
                      </label>
                      <input
                        {...register("email")}
                        name="email"
                        placeholder="mail@simmmple.com"
                        id="email"
                        type="email"
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                          disabled === true
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                            : "border-gray-200 dark:!border-white/10 dark:text-white"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs italic text-red-500 mt-2">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className={`relative ${extra}`}>
                      <label
                        className={`text-sm text-navy-700 dark:text-white ${
                          variant === "auth"
                            ? "ml-1.5 font-medium"
                            : "ml-3 font-bold my-2"
                        }`}
                      >
                        <p className="py-1">Password*</p>
                      </label>
                      <input
                        {...register("password")}
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                        type={visibles ? "text" : "password"}
                        className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                          disabled === true
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                            : "border-gray-200 dark:!border-white/10 dark:text-white"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-xs italic text-red-500 mt-2">
                          {errors.password?.message}
                        </p>
                      )}
                      {visibles ? (
                        <FaEye
                          className="absolute right-2 bottom-4 cursor-pointer"
                          onClick={() => setVisibles(!visibles)}
                        />
                      ) : (
                        <FaEyeSlash
                          className="absolute right-2 bottom-4 cursor-pointer"
                          onClick={() => setVisibles(!visibles)}
                        />
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className={`relative ${extra}`}>
                      <label
                        className={`text-sm text-navy-700 dark:text-white ${
                          variant === "auth"
                            ? "ml-1.5 font-medium"
                            : "ml-3 font-bold my-2"
                        }`}
                      >
                        <p className="py-1">Confirm Password*</p>
                      </label>
                      <input
                        {...register("confirmPassword")}
                        name="confirmPassword"
                        placeholder="Enter your confirmPassword"
                        id="confirmPassword"
                        type={visible ? "text" : "password"}
                        className={` mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                          disabled === true
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                            : "border-gray-200 dark:!border-white/10 dark:text-white"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-xs italic text-red-500 mt-2">
                          {errors.password?.message}
                        </p>
                      )}
                      {visible ? (
                        <FaEye
                          className="absolute right-2 bottom-4 cursor-pointer"
                          onClick={() => setVisible(!visible)}
                        />
                      ) : (
                        <FaEyeSlash
                          className="absolute right-2 bottom-4 cursor-pointer"
                          onClick={() => setVisible(!visible)}
                        />
                      )}
                    </div>

                    {/* Terms and Condition */}
                    <div className="flex items-start py-5">
                      <div className="relative flex items-center h-5">
                        <input
                          {...register("terms")}
                          type="checkbox"
                          name="terms"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                          id="blue"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white pt-2"
                        >
                          I accept the the Terms and Conditions
                        </label>
                        {errors.terms && (
                          <p className="text-xs italic text-red-500 mt-2">
                            {errors.terms?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                      type="submit"
                    >
                      {isLoading ? "Processing" : "Create an account"}
                    </button>
                    <div className="mt-4">
                      <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                        Already have an account?
                      </span>
                      <Link
                        href="/sign-in"
                        className="ml-1 text-sm font-medium text-[#422AFB] hover:text-brand-600 dark:text-white"
                      >
                        Login here!
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                    style={{ backgroundImage: "url(auth.png)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </form>
  );
};

export default Register;
