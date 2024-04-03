"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Authentication = () => {
  const { data: session, status } = useSession();
  return (
    <main className="flex items-center">
      {session && (
        <div className="flex items-center">
          <div>
            <h2 className="mr-4 hidden sm:block">
              Welcome Back, {session?.user?.name}
            </h2>
          </div>
          <div>
            <Image
              src={session?.user?.image!}
              alt="Profile Pircture"
              width={40}
              height={40}
              className="w-8 h-8 rounded-full cursor-pointer object-cover mr-4"
            />
          </div>
        </div>
      )}
      {status === "authenticated" ? (
        <button
          className="px-5 py-3 bg-white border-2 border-black"
          onClick={() => signOut()}
        >
          Log out
        </button>
      ) : (
        <div className="flex items-center">
          <button
            className="px-5 py-3 bg-white border-2 border-black"
            onClick={() => signIn("google")}
          >
            Login
          </button>
        </div>
      )}
    </main>
  );
};

export default Authentication;
