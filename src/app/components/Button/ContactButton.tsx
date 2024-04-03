"use client";

import Link from "next/link";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useBetween } from "use-between";
import { StateProps } from "@/lib/StateProps";
import EditContact from "../Homepage/EditContact";

const ContactButton = ({ contact, user }: any) => {
  const { modal, setModal } = useBetween(StateProps);
  return (
    <>
      <div className="px-2">
        <FaRegEdit
          className="cursor-pointer"
          onClick={() => setModal(!modal)}
        />
      </div>
      <div className={`${modal ? "block" : "hidden"}`}>
        <EditContact contact={contact} user={user} />
      </div>
    </>
  );
};

export default ContactButton;
