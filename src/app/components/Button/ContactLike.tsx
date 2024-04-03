"use client";

import { TDislikeReview, TLikeReview } from "@/types/type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

const ContactLike = ({ item, user }: any) => {
  const router = useRouter();
  const like = async (data: TLikeReview) => {
    const likeData = { ...data, userId: user?.id };

    try {
      const res = await fetch(`/api/contact/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likeData),
      });

      if (res.status === 200) {
        router.refresh();
        toast.success("Comment liked successfully");
      } else if (res.status === 201) {
        router.refresh();
        toast.success("You unliked this comment");
      } else if (res.status === 401) {
        router.refresh();
        toast.success("Comment not found");
      } else if (res.status === 500) {
        toast.success("Internal Server Error");
        router.refresh();
      } else if (res.status === 505) {
        toast.success("You have already disliked this comment, undo to like");
        router.refresh();
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const dislike = async (data: TDislikeReview) => {
    const dislikeData = { ...data, userId: user?.id };

    try {
      const res = await fetch(`/api/contact/${item.id}/dislike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dislikeData),
      });

      if (res.status === 200) {
        router.refresh();
        toast.success("Comment disliked successfully");
      } else if (res.status === 201) {
        router.refresh();
        toast.success("You undisliked this comment");
      } else if (res.status === 401) {
        router.refresh();
        toast.success("Comment not found");
      } else if (res.status === 500) {
        toast.success("Internal Server Error");
        router.refresh();
      } else if (res.status === 505) {
        toast.success("You have already liked this comment, undo to dislike");
        router.refresh();
      }
    } catch (error) {
      console.error("Error disliking comment:", error);
    }
  };
  return (
    <>
      {item.like === 0 ? (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => like(item.id)}
        >
          <BiLike />
          <span className="pl-2">
            Like
            <span className={`${item.like === 0 ? "hidden" : item.like}`}>
              ({item.like})
            </span>
          </span>
        </button>
      ) : (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => like(item.id)}
        >
          <BiSolidLike />
          <span className="pl-2">
            Like
            <span className={`${item.like === 0 ? "hidden" : item.like}`}>
              ({item.like})
            </span>
          </span>
        </button>
      )}

      {item.dislike === 0 ? (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => dislike(item.id)}
        >
          <BiDislike />
          <span className="pl-2">
            Dislike
            <span className={`${item.dislike === 0 ? "hidden" : item.dislike}`}>
              ({item.dislike})
            </span>
          </span>
        </button>
      ) : (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => dislike(item.id)}
        >
          <BiSolidDislike />
          <span className="pl-2">
            Dislike
            <span className={`${item.dislike === 0 ? "hidden" : item.dislike}`}>
              ({item.dislike})
            </span>
          </span>
        </button>
      )}
    </>
  );
};

export default ContactLike;
