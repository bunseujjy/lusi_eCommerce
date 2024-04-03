"use client";

import { deleteUser } from "@/app/actions/deleteUserById";
import { StateProps } from "@/lib/StateProps";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useBetween } from "use-between";

const DeleteUserButton = ({ user }: any) => {
  const router = useRouter();
  const { loading, setLoading } = useBetween(StateProps);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteUser(id);
      router.push("/admin/user");
    } catch (error) {
      return NextResponse.json(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Link
        href="/admin/user"
        type="button"
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
      >
        Cancel
      </Link>
      <button
        type="button"
        className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
        onClick={() => handleDelete(user.id)}
      >
        {loading ? "Loading..." : "Delete"}
      </button>
    </>
  );
};

export default DeleteUserButton;
