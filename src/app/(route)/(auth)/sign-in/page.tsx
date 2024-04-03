import SignInForm from "@/app/components/Authentication/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to purchase product in this website",
};

const page = () => {
  return (
    <div className="w-full">
      <SignInForm />
    </div>
  );
};

export default page;
