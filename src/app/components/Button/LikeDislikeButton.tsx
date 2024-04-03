"use client";

import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

const LikeDislikeButton = ({ like, dislike, review }: any) => {
  return (
    <>
      {review.like === 0 ? (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => like(review.id)}
        >
          <BiLike />
          <span className="pl-2">
            Like
            <span className={`${review.like === 0 ? "hidden" : review.like}`}>
              ({review.like})
            </span>
          </span>
        </button>
      ) : (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => like(review.id)}
        >
          <BiSolidLike />
          <span className="pl-2">
            Like
            <span className={`${review.like === 0 ? "hidden" : review.like}`}>
              ({review.like})
            </span>
          </span>
        </button>
      )}

      {review.dislike === 0 ? (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => dislike(review.id)}
        >
          <BiDislike />
          <span className="pl-2">
            Dislike
            <span
              className={`${review.dislike === 0 ? "hidden" : review.dislike}`}
            >
              ({review.dislike})
            </span>
          </span>
        </button>
      ) : (
        <button
          className="flex items-center mr-3 text-sm text-gray-700 dark:text-gray-400"
          onClick={() => dislike(review.id)}
        >
          <BiSolidDislike />
          <span className="pl-2">
            Dislike
            <span
              className={`${review.dislike === 0 ? "hidden" : review.dislike}`}
            >
              ({review.dislike})
            </span>
          </span>
        </button>
      )}
    </>
  );
};

export default LikeDislikeButton;
