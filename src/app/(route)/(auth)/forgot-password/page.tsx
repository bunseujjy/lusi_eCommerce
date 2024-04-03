import { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Sending email to reset to password",
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
