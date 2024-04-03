"use client";

import { TCreateProducts, createProducts } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useBetween } from "use-between";
import { StateProps } from "../../../lib/StateProps";

const ProductModal = () => {
  const [uploadedImage, setUploadedImage] = useState();
  const { modal, setModal } = useBetween(StateProps);
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
      category: [],
      inStock: true,
      images: "",
      description: "",
    },
  });

  const onSubmit = async (data: TCreateProducts) => {
    // Extract the uploaded image
    const image = data.images[0];
    // Create an instance of form data
    const formData = new FormData();
    // Append the Image to the form data
    formData.append("file", image);
    // Bind the upload the preset and cloud name to form data
    formData.append("upload_preset", "profileupload");
    formData.append("cloud_name", "dvgefuzhi");

    // Make an api request cloudinary

    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dvgefuzhi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadedImageData = await uploadResponse.json();

    const imageUrl = uploadedImageData.secure_url;

    setUploadedImage(imageUrl);
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
          category: data.category,
          images: imageUrl,
          inStock: data.inStock,
          description: data.description,
        }),
      });
      if (response.ok) {
        toast.success("Product created successfully");
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="bg-cyan-500 px-4 py-2 text-white rounded-md"
        onClick={() => setModal(!modal)}
      >
        Add Product
      </button>
      <div
        className={`absolute inset-x-0 bottom-0 -top-14 h-screen z-50  ${
          modal ? "block" : "hidden"
        }`}
      >
        <div className="p-4">
          <div className="w-full m-auto rounded-lg overflow-y-auto">
            <div className="w-full md:w-96 md:max-w-full mx-auto">
              <div className="p-6 border border-gray-300 sm:rounded-md bg-gray-50">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="block mb-6">
                    <span className="text-gray-700">Product name</span>
                    <input
                      {...register("title")}
                      type="title"
                      name="title"
                      className="block w-full mt-1 shadow-sm border border-gray-500 p-2 text-md"
                      placeholder="Product Name"
                    />
                  </label>
                  <label className="block mb-6">
                    <span className="text-gray-700">Price</span>
                    <input
                      {...register("price")}
                      type="price"
                      name="price"
                      className="block w-full mt-1 shadow-sm border border-gray-500 p-2 text-md"
                      placeholder="Price"
                    />
                  </label>
                  <label className="block mb-6">
                    <span className="text-gray-700">Select Category</span>
                    <select
                      {...register("category")}
                      name="category"
                      typeof="category"
                      className="block w-full mt-1 shadow-sm border border-gray-500 p-2 text-md"
                    >
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                  </label>

                  <label className="block mb-6">
                    <span className="text-gray-700">Select Stock</span>
                    <select
                      {...register("inStock")}
                      name="inStock"
                      typeof="inStock"
                      className="block w-full mt-1 shadow-sm border border-gray-500 p-2 text-md"
                    >
                      <option value="instock">InStock</option>
                      <option value="outofstock">Out of Stock</option>
                    </select>
                  </label>
                  <label className="block mb-6">
                    <span className="text-gray-700">Product Image</span>
                    <input
                      {...register("images")}
                      name="images"
                      type="file"
                      className="block w-full mt-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray-500 p-2"
                    />
                  </label>
                  <label className="block mb-6">
                    <span className="text-gray-700">Product description</span>
                    <textarea
                      {...register("description")}
                      name="description"
                      className="block w-full mt-1 shadow-sm border border-gray-500 p-2 text-md"
                      rows={3}
                      placeholder="Product info"
                    ></textarea>
                  </label>
                  <div className="mb-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="h-10 px-5  text-indigo-100  bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline  hover:bg-indigo-800"
                    >
                      Submit
                    </button>

                    <button
                      className="border bg-cyan-500 px-4 py-2 text-white rounded-md"
                      onClick={() => setModal(!modal)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="flex z-40 undefined items-center flex-col justify-center overflow-hidden fixed inset-0">
          <div className="overlay z-40 from-[#374151] absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"></div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
