import { getCurrentUser } from "@/app/actions/getCurrentUser";
import DeleteUserButton from "@/app/components/Button/DeleteUserButton";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Delete user ${params.id}`,
    description: `Delete user ${params.id}`,
  };
};

const DeleteModal = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/error");
  }
  return (
    <>
      <div className="h-80">
        <div>
          <div className="fixed inset-0 z-10 bg-secondary-700/50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl">
              <div className="relative p-6 dark:bg-navy-800">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-secondary-900">
                      Delete {user?.name}
                    </h3>
                    <div className="mt-2 text-sm text-secondary-500">
                      Are you sure you want to delete this user account? This
                      action cannot be undone.
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <DeleteUserButton user={JSON.parse(JSON.stringify(user))} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
