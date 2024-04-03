"use client";

import moment from "moment";
import Image from "next/image";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { StyledRating } from "./AddRating";
import { useForm } from "react-hook-form";
import { TUpdateReview, updateReview } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";

interface ReviewProps {
  review: any;
  products: any;
  user: any;
}

const EditReview: React.FC<ReviewProps> = ({ review, products, user }) => {
  const { modal, setModal, loading, setLoading } = useBetween(StateProps);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TUpdateReview>({
    resolver: zodResolver(updateReview),
    defaultValues: {
      comment: review.comment,
      rating: review.rating,
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleEdit = async (data: TUpdateReview | any) => {
    setLoading(true);
    try {
      const ratingData = { ...data, userId: user.id, product: products };

      const res = await fetch(`/api/rating/${review.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      if (res.status === 200) {
        router.push(`/collection/${review.productId}`);
        router.refresh();
        reset();
        setModal(false);
        toast.success("Review edited successfully");
      } else if (res.status === 401) {
        toast.error("Failed to edit");
      } else if (res.status === 404) {
        toast.error("You're not owner of this review!");
      }
    } catch (error) {
      return NextResponse.json(error);
    }
    setLoading(false);
  };

  return (
    <div className="h-80">
      <form onSubmit={handleSubmit(handleEdit)}>
        <div className="fixed inset-0 z-10 bg-secondary-700/50"></div>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl">
            <div className="relative p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <FaEdit className="text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-secondary-900">
                    Edit {review?.id}
                  </h3>
                </div>
              </div>
              <section className="py-4 lg:py-10">
                <div className="py-4 relative">
                  <div className="lg:grid-cols-[1fr] grid grid-cols-1 gap-6">
                    <div>
                      <div className="p-6 mb-6 bg-gray-100 rounded-md lg:p-6 dark:bg-gray-900">
                        <div className="items-center justify-between block mb-4 lg:flex">
                          <div className="flex flex-wrap items-center mb-4 lg:mb-0">
                            <Image
                              src={review.user.image}
                              alt="Profile avatar"
                              className="object-cover mb-1 mr-2 rounded-full shadow w-14 h-14 lg:mb-0"
                              width={100}
                              height={100}
                            />
                            <div>
                              <h2 className="mr-2 text-lg font-medium text-gray-700 dark:text-gray-400">
                                {review.user.name}
                              </h2>
                              <p className="text-sm font-medium text-gray-400 dark:text-gray-400">
                                {moment(review?.createdDate).format("LL")}
                              </p>
                            </div>
                          </div>
                          <div>
                            <StyledRating
                              defaultValue={review.rating}
                              precision={0.5}
                              className="mb-1"
                              onChange={(event, newValue) => {
                                setCustomValue("rating", newValue);
                              }}
                            />
                            <p className="text-xs font-thin text-gray-400 dark:text-gray-400">
                              {moment(review?.createdDate).fromNow()}
                            </p>
                          </div>
                        </div>

                        <label
                          htmlFor="firstname"
                          className="block mb-2 font-medium text-gray-700 dark:text-gray-400"
                        >
                          <textarea
                            typeof="message"
                            className="w-full mb-4 text-sm text-gray-600 dark:text-gray-400 resize-none bg-transparent outline-none"
                            {...register("comment")}
                            name="comment"
                          ></textarea>
                        </label>
                        {/* <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    {review.comment}
                                  </p> */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex mr-3 text-sm text-gray-700 dark:text-gray-400">
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="w-4 h-4 mr-1 text-blue-800 dark:text-blue-500 bi bi-hand-thumbs-up-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"></path>
                                </svg>
                              </a>
                              <span>Like</span>
                            </div>
                            <div className="flex text-sm text-gray-700 dark:text-gray-400">
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="w-4 h-4 mr-1 text-blue-800 dark:text-blue-500 bi bi-chat"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                </svg>
                              </a>
                              <span>Reply</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  onClick={() => setModal(!modal)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
                >
                  {loading ? "Loading..." : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
