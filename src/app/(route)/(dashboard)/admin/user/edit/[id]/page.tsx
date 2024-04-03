import prisma from "@/lib/db";
import EditUser from "./EditUser";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Edit user ${params.id}`,
    description: `Edit user ${params.id}`,
  };
};

const EditUserPage = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return <EditUser user={user} />;
};

export default EditUserPage;
