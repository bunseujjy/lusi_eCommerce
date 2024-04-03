import Register from "@/app/components/Authentication/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to purchase product in this website",
};

const RegisterForm = () => {
  return (
    <div className="w-full">
      <Register />
    </div>
  );
};

export default RegisterForm;
