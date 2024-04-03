import getUsers from "@/app/actions/getUser";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import UserItems from "./UserItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "Manage user in this shop",
};

const UserPage = async () => {
  const user = await getUsers();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }

  return <UserItems user={user} />;
};

export default UserPage;
