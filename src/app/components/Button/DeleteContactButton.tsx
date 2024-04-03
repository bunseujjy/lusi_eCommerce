"use client";

import { StateProps } from "@/lib/StateProps";
import { usePathname, useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { useBetween } from "use-between";

const DeleteContactButton = ({ contact }: any) => {
  const router = useRouter();
  const { loading, setLoading } = useBetween(StateProps);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        router.push("/contact");
        router.refresh();
        toast.success("Contact deleted successfully");
      } else if (res.status === 400) {
        toast.error("You're not owner of this comment");
      } else if (res.status === 404) {
        toast.error("Bad Request");
      }
    } catch (error) {
      return NextResponse.json(error);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
        onClick={() => handleDelete(contact.id)}
      >
        {loading ? "Loading..." : "Delete"}
      </button>
    </>
  );
};

export default DeleteContactButton;
