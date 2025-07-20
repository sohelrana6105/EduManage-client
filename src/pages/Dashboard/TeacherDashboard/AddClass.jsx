import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/authcontext/AuthContext";
import { use } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AddClass = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseaxiosSecure();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔄 React Query Mutation logic to add class
  const { mutateAsync: addClassMutation } = useMutation({
    mutationFn: async (newClass) => {
      const res = await axiosSecure.post("/add-class", newClass);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Class Added!",
        text: "Your class has been submitted for review.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      reset();
      navigate("/dashboard/teacher/my-class");
    },
    onError: (err) => {
      console.error(err);
      Swal.fire({
        title: "Oops!",
        html: `<p>${err?.response?.data?.message} and ${err.message}</p>`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    },
  });

  const onSubmit = async (data) => {
    const { title, price, description, image } = data;
    setUploading(true);

    // 1️⃣ Upload image to imgbb
    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      const imgbbURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const imgbbRes = await axios.post(imgbbURL, formData);
      const imageUrl = imgbbRes.data.data.url;

      // 2️⃣ Build class data
      const newClass = {
        title,
        instructorName: user.displayName,
        instructorEmail: user.email,
        price: parseFloat(price),
        description,
        image: imageUrl,
        status: "pending",
        enrolled: 0,
        feedback: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      console.log(newClass);

      // // 3️⃣ Send to backend
      // const backendRes = await axiosSecure.post("/add-class", newClass);
      // console.log(backendRes);

      // if (backendRes.data?.data.insertedId) {
      //   // inside your add class handler (after successful response):
      //   Swal.fire({
      //     title: "Class Added!",
      //     text: "Your class has been submitted for review.",
      //     icon: "success",
      //     confirmButtonText: "OK",
      //     confirmButtonColor: "#3085d6",
      //   });
      //   reset();
      // }

      const addclassRes = await addClassMutation(newClass);
      console.log(addclassRes);
    } catch (err) {
      console.error(err);

      const textHtml = `<p>${err.message}</p>Failed to add class`;

      Swal.fire({
        title: "Oops!",
        html: textHtml || "Failed to add class. Please try again. ",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 max-w-4xl mx-auto my-10">
      <p></p>

      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Add a New Class
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="col-span-1">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Enter class title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="col-span-1">
          <label className="block mb-2 font-medium">Price (BDT)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
            className="input input-bordered w-full"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Instructor Name */}
        <div className="col-span-1">
          <label className="block mb-2 font-medium">Instructor Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="text-xl text-black font-bold  input input-bordered w-full bg-gray-700"
            disabled
          />
        </div>

        {/* Instructor Email */}
        <div className="col-span-1">
          <label className="block mb-2 font-medium">Instructor Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="text-xl text-black font-bold input input-bordered w-full bg-gray-700"
            disabled
          />
        </div>

        {/* Image */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium">Class Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows="4"
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Write something about this class..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="btn btn-primary w-full text-white"
            disabled={uploading}
          >
            {uploading ? "Adding..." : "Add Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
