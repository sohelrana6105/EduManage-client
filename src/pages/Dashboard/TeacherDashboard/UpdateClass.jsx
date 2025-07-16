import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

import axios from "axios";
import { FaEdit } from "react-icons/fa";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";

const UpdateClass = () => {
  const { id } = useParams();
  const axiosSecure = UseaxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // ✅ Track current image

  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch class data manually
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axiosSecure.get(`/my-class/${id}`);
        const data = res.data;

        const { title, price, description } = data;
        reset({ title, price, description }); // ✅ Pre-fill form

        setImagePreviewUrl(data.image); // ✅ Set image for preview & backup
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch class:", error);
        Swal.fire("Error", "Failed to load class data", "error");
        setLoading(false);
      }
    };
    fetchClass();
  }, [id, axiosSecure, reset]);

  console.log(import.meta.env.VITE_image_upload_key); // ✅okkk

  // ✅ Submit handler
  const onSubmit = async (data) => {
    // console.log("data at firs", data);

    const { title, price, description } = data;
    try {
      let imageUrl = imagePreviewUrl; // ✅ Start with existing image
      // console.log("File to upload:", data.image?.[0]);

      // ✅ Upload new image if selected
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`;

        const imageRes = await axios.post(imageUploadUrl, formData);
        console.log(imageUrl);
        const imgbb = imageRes.data.data.url;
        setImagePreviewUrl(imgbb);
      }

      const updatedClass = {
        title: title,
        price: parseFloat(price),
        description: description,
        image: imageUrl, // ✅ Always send image (old or new)
      };
      console.log("Update class", updatedClass);

      const res = await axiosSecure.put(`/update-class/${id}`, updatedClass);

      if (res.data?.modifiedCount > 0) {
        Swal.fire("Updated!", "Class updated successfully.", "success");
        navigate("/dashboard/teacher/my-class");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (loading) return <p>Loading class info...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaEdit className="text-primary" /> Update Class
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("title")}
          placeholder="Class Title"
          className="input input-bordered w-full"
        />

        <input
          {...register("price")}
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
        />

        {/* ✅ Show current or newly uploaded image */}
        {imagePreviewUrl && (
          <>
            <p className="text-sm text-gray-600">Image Preview:</p>
            <img
              src={imagePreviewUrl}
              alt="Class Preview"
              className="w-32 h-20 object-cover rounded mb-2"
            />
          </>
        )}

        <input
          {...register("image")}
          type="file"
          accept="image/*"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("description")}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button className="btn btn-primary w-full">Update Class</button>
      </form>
    </div>
  );
};

export default UpdateClass;
