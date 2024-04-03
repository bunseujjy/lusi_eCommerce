import { getCurrentUser } from "@/app/actions/getCurrentUser";
import AddUser from "./AddUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add user",
  description: "Add user for this website",
};

const AddUserPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return <AddUser />;
};

export default AddUserPage;
