"use client";

import { StateProps } from "@/lib/StateProps";
import { TCreateProducts, createProducts } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useBetween } from "use-between";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GrSearchAdvanced } from "react-icons/gr";
import Image from "next/image";
import { useRouter } from "next/navigation";

const options = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "running", label: "Running" },
  { value: "sneaker", label: "Sneaker" },
  { value: "training", label: "Training" },
];

const AddProduct = () => {
  const router = useRouter();
  const [productImg, setProductImg] = useState<string>();
  const { drop, setDrop, loading, setLoading } = useBetween(StateProps);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateProducts>({
    resolver: zodResolver(createProducts),
    defaultValues: {
      title: "",
      price: 0,
      discount: 0,
      category: [],
      inStock: true,
      images: "",
      description: "",
    },
  });

  const handleProductImage = (e: any) => {
    const file = e.target.files[0];

    transformFile(file);
  };

  const transformFile = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result as string);
      };
    } else {
      setProductImg("");
    }
  };

  const onSubmit = async (data: TCreateProducts) => {
    setLoading(true);
    try {
      const response = await fetch("/api/addProduct", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          price: data.price,
          discount: data.discount,
          category: data.category,
          images: productImg,
          inStock: data.inStock,
          description: data.description,
        }),
      });
      if (response.ok) {
        toast.success("Product created successfully");
        router.push("/admin/products");
        reset();
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen bg-gray-50 dark:bg-transparent text-black mx-5 min-[1280px]:mx-16 relative mt-5"
    >
      <div className="py-4 w-full h-full md:h-auto">
        <div className=" w-full relative p-4 bg-white dark:bg-navy-700 rounded-lg shadow sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
          </div>
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  {...register("title")}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  {...register("price")}
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product price"
                />
              </div>

              <div>
                <label
                  htmlFor="discount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Discount
                </label>
                <input
                  {...register("discount")}
                  type="text"
                  name="discount"
                  id="discount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Discount"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Stock
                </label>
                <select
                  {...register("inStock")}
                  id="inStock"
                  name="inStock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select Stock</option>
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select Category
                </label>
                <div className="flex items-center justify-between relative">
                  <button
                    className="w-full text-black border-2 border-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:text-white"
                    type="button"
                    onClick={() => setDrop(!drop)}
                  >
                    Select Category
                  </button>
                  <div className="absolute right-2">
                    {drop ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                </div>
                <div
                  className={`z-10 w-full bg-white rounded-md shadow dark:bg-gray-700 ${
                    drop ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {options.map((option) => (
                      <div key={option.value}>
                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            {...register("category")}
                            id="category"
                            type="checkbox"
                            name="category"
                            value={option.value}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <span className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                            {option.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex flex-wrap gap-1">
                  <div
                    className={`${
                      productImg
                        ? "h-24 bg-white shadow-sm rounded-sm border border-gray-200"
                        : ""
                    }`}
                  >
                    {productImg && (
                      <Image
                        src={productImg}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                  <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <div>Add image</div>
                    <input
                      {...register("images")}
                      name="images"
                      type="file"
                      className="hidden"
                      onChange={handleProductImage}
                    />
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            <button
              onClick={() => setLoading(!loading)}
              type="submit"
              className="border bg-cyan-500 dark:border-0 dark:bg-brand-400 dark:hover:bg-brand-200 px-4 py-2 text-white rounded-md"
            >
              {loading ? "Proccessing..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
