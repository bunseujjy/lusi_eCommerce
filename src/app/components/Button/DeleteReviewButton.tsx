"use client";

import { StateProps } from "@/lib/StateProps";
import { usePathname, useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { useBetween } from "use-between";

const DeleteReviewButton = ({ review }: any) => {
  const router = useRouter();
  const { loading, setLoading } = useBetween(StateProps);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rating/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        router.push(`/collection/${review.productId}`);
        router.refresh();
        toast.success("Review deleted successfully");
      } else if (res.status === 401) {
        toast.error("Failed to delete");
      } else if (res.status === 404) {
        toast.error("You're not owner of this review!");
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
        onClick={() => handleDelete(review.id)}
      >
        {loading ? "Loading..." : "Delete"}
      </button>
    </>
  );
};

export default DeleteReviewButton;
