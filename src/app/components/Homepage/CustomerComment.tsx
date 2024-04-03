"use client";

import Image from "next/image";
import { StyledRating } from "../product/AddRating";
import { AiTwotoneDelete } from "react-icons/ai";
import Link from "next/link";
import ContactButton from "../Button/ContactButton";
import LikeDislikeButton from "../Button/LikeDislikeButton";
import { TDislikeReview, TLikeReview } from "@/types/type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ContactLike from "../Button/ContactLike";

const CustomerComment = ({ user, contact }: any) => {
  const router = useRouter();

  return (
    <>
      <section className="md:px-10 w-full">
        <div className="bg-[#f1f1ef] dark:bg-navy-700 px-10 py-[94px] w-full">
          <div className="w-full flex items-center flex-wrap flex-col-reverse md:flex-row md:flex-nowrap md:max-w-6xl mx-auto">
            <div className="w-full flex justify-between flex-wrap flex-col md:pr-10 lg:pr-[128px]">
              <div className="mb-6 mt-5 md:mt-0 text-center md:text-start">
                <p className="text-[#a0a5a7] text-lg">
                  Eu eget felis erat mauris aliquam mattis lacus, arcu leo
                  aliquam sapien pulvinar laoreet vulputate sem aliquet
                  phasellus egestas felis, est, vulputate morbi massa mauris
                  vestibulum dui odio.
                </p>
              </div>
              <div className="py-7 mb-6"></div>
              <div className="flex items-center justify-between md:flex-nowrap w-auto h-full">
                <div className="w-auto">
                  <Image
                    src="/recycle-1.svg"
                    alt="recycle images"
                    width={104}
                    height={104}
                  />
                </div>
                <div className="block w-auto">
                  <Image
                    src="/recycle-2.svg"
                    alt="recycle images"
                    width={104}
                    height={104}
                  />
                </div>
                <div className="block w-auto">
                  <Image
                    src="/recycle-3.svg"
                    alt="recycle images"
                    width={104}
                    height={104}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex items-centertext-center">
              <div className="w-full text-center">
                <Image
                  src="/recycle-4.jpg"
                  alt="recyle images"
                  width={320}
                  height={320}
                  className="border-2 rounded-full border-[#6e7051] border-dashed align-middle inline-block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="customer-review" className="px-5 md:px-2 lg:px-10 py-[96px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="w-auto text-4xl pb-10 font-semibold">
              Our Customers speak for us
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {contact.map((item: any) => (
              <div
                className="border-2 border-gray-400 my-6 lg:mr-6 md:mx-2"
                key={item.id}
              >
                <div className="flex items-center justify-between px-5 md:px-2 lg:px-5">
                  <div className="flex items-center">
                    <Image
                      src={item.user.image}
                      alt="jujingyi"
                      width={40}
                      height={40}
                      className="rounded-[50%] object-cover h-10 mt-5"
                    />
                    <div className="pl-3">
                      <h4>{item.user.name}</h4>
                    </div>
                  </div>
                  <StyledRating value={item.rating} precision={0.5} readOnly />
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm md:text-md py-5">{item.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* <LikeDislikeButton
                        like={like}
                        dislike={dislike}
                        review={item}
                      /> */}
                      <ContactLike item={item} user={user} />
                    </div>
                    <div className="flex items-center flex-">
                      <Link
                        href={`/contact/delete/${item.id}`}
                        className="text-red-500"
                      >
                        <AiTwotoneDelete className="cursor-pointer mr-4" />
                      </Link>
                      <ContactButton contact={item} user={user} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerComment;
