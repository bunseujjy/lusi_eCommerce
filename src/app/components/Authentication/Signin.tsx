"use client";

import { TSignInForm, signInForm } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";

const SignInForm = ({ extra, variant, state, disabled }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibles, setVisibles] = useState<boolean>(false);
  const { profileImg } = useBetween(StateProps);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (userData: TSignInForm) => {
      setIsLoading(true);
      try {
        const signInData = await signIn("credentials", {
          email: userData.email,
          password: userData.password,
          redirect: false,
        });

        if (!signInData || signInData.ok !== true) {
          setIsLoading(false);
          toast.error("Failed to sign in");
          console.log("Invalid credentials");
          return NextResponse.json("Invalid credentials");
        } else {
          setIsLoading(true);
          toast.success("Sign-in successful");
          router.push("/");
          if (session?.user.image === "/default-pf.jpg") {
            router.push("/");
          }
          if (session?.user.image !== profileImg) {
            router.push("/upload-avatar");
          }
          setIsLoading(false);
          return NextResponse.json("Sign in successfully");
        }
      } catch (error) {
        return NextResponse.json("Failed to sign in");
      }
    },
    [router, session?.user.image, profileImg]
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
                      Sign In
                    </h4>
                    <p className="mb-9 ml-1 text-base text-gray-600">
                      Enter your email and password to sign in!
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
                    {/* Checkbox */}
                    <div className="mb-4 flex items-center justify-between px-2">
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white pt-2"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <button
                      className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                      type="submit"
                    >
                      Sign In
                    </button>
                    <div className="mt-4">
                      <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                        Not registered yet?
                      </span>
                      <Link
                        href="/sign-up"
                        className="ml-1 text-sm font-medium text-[#422AFB] hover:text-brand-600 dark:text-white"
                      >
                        Create an account
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

export default SignInForm;
