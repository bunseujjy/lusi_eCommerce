import Image from "next/image";
import AddRating, { StyledRating } from "./AddRating";
import moment from "moment";
import EditReview from "./EditReview";
import ReviewButton from "../Button/ReviewButton";
import toast from "react-hot-toast";
import LikeDislikeButton from "../Button/LikeDislikeButton";
import { TDislikeReview, TLikeReview } from "@/types/type";
import { useRouter } from "next/navigation";

interface ListRatingProps {
  products: any;
  user: any;
  modal: any;
  setModal: any;
}

const Review: React.FC<ListRatingProps> = ({ products, user, modal }) => {
  const router = useRouter();

  const like = async (review: any, data: TLikeReview) => {
    const likeData = { ...data, userId: user.id, product: products };

    const res = await fetch(`/api/rating/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: likeData as any,
    });
    if (res.status === 200) {
      router.refresh();
      toast.success("Review liked successfully");
    } else if (res.status === 201) {
      router.refresh();
      toast.success("You unliked this review");
    } else if (res.status === 401) {
      router.refresh();
      toast.success("Invalid User");
    } else if (res.status === 401) {
      router.refresh();
      toast.success("Review not found");
    } else if (res.status === 500) {
      toast.success("Internal Server Error");
      router.refresh();
    } else if (res.status === 505) {
      toast.success("You have already disliked this review, undo to like");
      router.refresh();
    }
  };

  const dislike = async (review: any, data: TDislikeReview) => {
    const dislikeData = { ...data, userId: user.id, product: products };
    const res = await fetch(`/api/rating/${review.id}/dislike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: dislikeData as any,
    });
    if (res.status === 200) {
      router.refresh();
      toast.success("Review disliked successfully");
    } else if (res.status === 201) {
      router.refresh();
      toast.success("You undisliked this review");
    } else if (res.status === 401) {
      router.refresh();
      toast.success("Invalid User");
    } else if (res.status === 401) {
      router.refresh();
      toast.success("Review not found");
    } else if (res.status === 500) {
      toast.success("Internal Server Error");
      router.refresh();
    } else if (res.status === 505) {
      toast.success("You have already liked this review, undo to dislike");
      router.refresh();
    }
  };
  return (
    <section className="py-10 bg-gray-50 dark:bg-navy-700 grid grid-cols-1 md:grid-cols-2 mt-4">
      <div className="py-24 md:py-0 md:px-6 relative">
        {products.reviews?.length > 0 ? (
          <div className="lg:grid-cols-[1fr] grid grid-cols-1 gap-6">
            {products.reviews &&
              products.reviews.map((review: any) => (
                <div key={review.id}>
                  <div className="p-6 mb-6 bg-gray-100 rounded-md lg:p-6 dark:bg-navy-600">
                    <div className="items-center justify-between block mb-4 lg:flex">
                      <div className="flex flex-wrap items-center mb-4 lg:mb-0">
                        <Image
                          src={review?.user.image}
                          alt="Profile avatar"
                          className="object-cover mb-1 mr-2 rounded-full shadow w-14 h-14 lg:mb-0"
                          width={100}
                          height={100}
                        />
                        <div>
                          <h2 className="mr-2 text-lg font-medium text-gray-700 dark:text-gray-400">
                            {review?.user.name}
                          </h2>
                          <p className="text-sm font-medium text-gray-400 dark:text-gray-400">
                            {moment(review?.createdDate).format("LL")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <StyledRating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          className="flex mb-1"
                        />
                        <p className="text-xs font-thin text-gray-400 dark:text-gray-400">
                          {moment(review?.createdDate).fromNow()}
                        </p>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      {review.comment}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <LikeDislikeButton
                          like={(data: any) => like(review, data)}
                          dislike={(data: any) => dislike(review, data)}
                          review={review}
                        />
                      </div>
                      <div className="flex">
                        <ReviewButton review={review} products={products} />
                      </div>
                    </div>
                  </div>

                  <div className={`${modal ? "block" : "hidden"}`}>
                    <EditReview
                      review={review}
                      products={products}
                      user={user}
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-full absolute top-[50%] text-center">
            <p>There are no reviews yet. 😥</p>
          </div>
        )}
      </div>
      <div className="flex-1">
        <AddRating products={products} user={user} />
      </div>
    </section>
  );
};

export default Review;
