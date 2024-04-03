"use client";

import Link from "next/link";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";

const ReviewButton = ({ review }: any) => {
  const { modal, setModal } = useBetween(StateProps);
  return (
    <>
      <div className="px-2">
        <FaRegEdit
          className="cursor-pointer"
          onClick={() => setModal(!modal)}
        />
      </div>
      <Link
        href={`/product-category/delete/${review.id}`}
        className="text-red-500 px-2"
      >
        <AiTwotoneDelete
          className="cursor-pointer"
          onClick={() => setModal(!modal)}
        />
      </Link>
    </>
  );
};

export default ReviewButton;
