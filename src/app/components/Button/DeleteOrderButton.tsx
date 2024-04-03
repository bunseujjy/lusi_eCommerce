"use client";

import { StateProps } from "@/lib/StateProps";
import { deleteProduct } from "@/app/actions/deleteProductById";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useBetween } from "use-between";
import toast from "react-hot-toast";

const DeleteOrderButton = ({ order }: any) => {
  const router = useRouter();
  const { loading, setLoading } = useBetween(StateProps);

  const deleteOrder = async (id: string) => {
    try {
      const res = await fetch(`/api/checkout/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        toast.success("Deleted successfully");
        router.refresh();
        router.push("/admin/orders");
      } else if (res.status === 401) {
        toast.error("You need to be an admin to delete this order");
        router.refresh();
      } else if (res.status === 500) {
        toast.error("Bad Request");
        router.refresh();
      }
    } catch (error) {}
  };

  return (
    <>
      <Link
        href="/admin/orders"
        type="button"
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
      >
        Cancel
      </Link>
      <button
        type="button"
        className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
        onClick={() => deleteOrder(order.id)}
      >
        {loading ? "Loading..." : "Delete"}
      </button>
    </>
  );
};

export default DeleteOrderButton;
