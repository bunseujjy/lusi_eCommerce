"use client";

import { TCreateReview, createReview } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "rgb(239 68 68)",
  },
  "& .MuiRating-iconHover": {
    color: "rgb(239 68 68)",
  },
  "& .MuiRating-iconEmpty": {
    color: "rgb(239 68 68)",
  },
});

const AddRating = ({ user, products }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TCreateReview>({
    resolver: zodResolver(createReview),
    defaultValues: {
      comment: "",
      rating: 0,
      name: "",
      email: "",
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: TCreateReview) => {
    setIsLoading(true);
    try {
      if (data.rating === 0) return toast.error("No rating selected");
      const ratingData = { ...data, userId: user.id, product: products };

      const res = await fetch("/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      if (res.status === 200) {
        toast.success("Review Posted");
        reset();
        router.refresh();
      } else if (res.status === 404) {
        toast.error("Error");
      } else if (res.status === 500) {
        toast.error("Cannot post more than one review on this product");
      }
    } catch (error: any) {
      toast.error("Need to login to review this product!", error);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-md dark:bg-navy-700">
        <h2 className="px-2 mb-6 text-2xl font-semibold text-left text-gray-600 dark:text-gray-400">
          Leave a comment
        </h2>
        <h2 className="px-2 mb-6 text-lg font-semibold text-left text-gray-600 dark:text-gray-400">
          Be the first one to review {`"${products.title}"`}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-2 mb-6">
            <label
              htmlFor="rating"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-400"
            >
              Rating Product *
            </label>
            <StyledRating
              precision={0.5}
              onChange={(event, newValue) => {
                setCustomValue("rating", newValue);
              }}
              style={{ outlineColor: "red" }} // Change 'red' to the color you desire
            />
          </div>
          <div className="px-2 mb-6">
            <label
              htmlFor="firstname"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-400"
            >
              Your review *
            </label>
            <textarea
              typeof="message"
              placeholder="Write a review"
              className="block w-full px-4 leading-tight text-gray-700 border rounded bg-gray-50 dark:placeholder-white py-7 dark:text-white dark:border-navy-600 dark:bg-navy-600"
              {...register("comment")}
              name="comment"
            ></textarea>
          </div>
          <div className="px-2 mb-6">
            <label
              htmlFor="firstname"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-400"
            >
              Name *
            </label>
            <input
              {...register("name")}
              type="text"
              name="name"
              placeholder="Name"
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border rounded bg-gray-50 lg:mb-0 dark:placeholder-white dark:text-white dark:border-navy-600 dark:bg-navy-600"
            />
          </div>
          <div className="px-2 mb-6">
            <label
              htmlFor="firstname"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-400"
            >
              Email *
            </label>
            <input
              {...register("email")}
              name="email"
              type="text"
              placeholder="abc@gmail.com"
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border rounded bg-gray-50 dark:placeholder-white dark:text-white dark:border-navy-600 dark:bg-navy-600"
            />
          </div>
          <div className="px-2">
            <button
              className="px-4 py-2 font-medium text-gray-100 bg-blue-800 rounded shadow hover:bg-blue-700 dark:bg-brand-400 dark:hover:bg-brand-200"
              type="submit"
            >
              {isLoading ? "Processing..." : "Submit Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRating;
