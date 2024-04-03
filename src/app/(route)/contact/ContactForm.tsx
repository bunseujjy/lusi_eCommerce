"use client";

import { StyledRating } from "@/app/components/product/AddRating";
import { StateProps } from "@/lib/StateProps";
import { TCreateContact, createContact } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useBetween } from "use-between";

const ContactForm = () => {
  const router = useRouter();
  const { loading, setLoading } = useBetween(StateProps);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<TCreateContact>({
    resolver: zodResolver(createContact),
    defaultValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: TCreateContact) => {
    setLoading(true);
    try {
      const contactData = { ...data };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      if (res.status === 200) {
        reset();
        router.refresh();
        toast.success("Message sent successfully");
      } else if (res.status === 400) {
        toast.error("You need to login to contact us");
      } else if (res.status === 404) {
        toast.error("Failed to create user");
      } else if (res.status === 500) {
        toast.error("Bad request");
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Bad request" });
    }
    setLoading(false);
  };

  return (
    <form
      className="md:pl-[64px] md:border-l-2 md:border-[#e4e6e7] w-full md:w-[66.666%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-start flex-col pb-5">
        <label
          htmlFor="email"
          className="text-[#979a9b] text-lg font-semibold pb-2"
        >
          Rating <span className="text-red-500">*</span>
        </label>
        <StyledRating
          precision={0.5}
          onChange={(event, newValue) => {
            setCustomValue("rating", newValue);
          }}
        />
      </div>
      <div className="flex items-start flex-col pb-5">
        <label
          htmlFor="email"
          className="text-[#979a9b] text-lg font-semibold pb-2"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          type="text"
          name="email"
          className="w-full p-2 dark:placeholder-white dark:text-white dark:border-navy-600 dark:bg-navy-600"
        />
        {errors.email && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="flex items-start flex-col pb-5">
        <label
          htmlFor="name"
          className="text-[#979a9b] text-lg font-semibold pb-2"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          name="name"
          className="w-full p-2 dark:placeholder-white dark:text-white dark:border-navy-600 dark:bg-navy-600"
        />

        {errors.name && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="flex items-start flex-col pb-5">
        <label
          htmlFor="subject"
          className="text-[#979a9b] text-lg font-semibold pb-2"
        >
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          {...register("subject")}
          type="text"
          name="subject"
          className="w-full p-2 dark:placeholder-white dark:text-white dark:border-navy-600 dark:bg-navy-600"
        />

        {errors.subject && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.subject?.message}
          </p>
        )}
      </div>
      <div className="flex items-start flex-col pb-5">
        <label
          htmlFor="message"
          className="text-[#979a9b] text-lg font-semibold pb-2"
        >
          Comment or Message <span className="text-red-500">*</span>
        </label>

        <textarea
          {...register("message")}
          typeof="message"
          className="w-full h-[120px] p-3 mb-4 text-sm text-gray-600  dark:placeholder-white dark:text-white dark:border-navy-600 dark:bg-navy-600"
          name="message"
        ></textarea>

        {errors.message && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.message?.message}
          </p>
        )}
        {isSubmitSuccessful && (
          <div>
            <p>Message is sent. Check your contact info?</p>
            <Link
              href="/#customer-review"
              className="uppercase text-blue-500 underline underline-offset-4"
            >
              Click here!
            </Link>
          </div>
        )}
      </div>
      <div className="mb-4">
        <button
          className="uppercase text-white bg-[#6e7051] px-7 py-3"
          type="submit"
        >
          {loading ? "Processing..." : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
