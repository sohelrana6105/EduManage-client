import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authcontext/AuthContext";
import UseaxiosSecure from "../../hooks/UseaxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import UseUserRole from "../../hooks/UseUserRole";

const TeachOnEduManage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseaxiosSecure();
  const userRole = UseUserRole();
  console.log(userRole.role);

  const {
    isError,
    data: teacherReqData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teacherStatues", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-requests/status/${user.email}`
      );
      return res.data;
    },
  });
  // console.log(teacherReqData);
  // console.log(isError);
  // console.log(error);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const applicationData = {
      name: user?.displayName,
      email: user?.email,
      profilePic: user?.photoURL,
      experience: data.experience,
      title: data.title,
      category: data.category,
      status: "pending",
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };

    const isRejected = teacherReqData?.status === "rejected";
    if (isRejected) {
      try {
        const res = await axiosSecure.patch(
          `/teacher-requests/retry/${user.email}`,
          {
            experience: data.experience,
            title: data.title,
            category: data.category,
          }
        );

        Swal.fire({
          title: "Request Re-submitted!",
          text: "Your application is again pending for admin review.",
          icon: "success",
        });

        refetch();

        console.log(res);
      } catch (error) {
        Swal.fire({
          title: error.message,
          html: `<p>Something went wrong. Try again later.to update</p>`,
          icon: "error",
        });
      }
    }

    if (!isRejected) {
      try {
        const res = await axiosSecure.post(
          "/teacher-requests",
          applicationData
        );
        if (res.data.insertedId) {
          Swal.fire({
            title: "Request Submitted!",
            text: "Your application is now pending for admin review.",
            icon: "success",
          });

          reset();

          refetch();
        }
      } catch (error) {
        const errorMessage1 = error.response?.data.message;
        const errorMessage2 = error.response?.data.error;
        Swal.fire({
          title: error.message,
          html: `<p>Something went wrong. Try again later.<br />${errorMessage1}<br />${errorMessage2}</p>`,
          icon: "error",
        });
      }
    }
  };

  const showForm =
    !teacherReqData?.status || teacherReqData?.status === "rejected";
  const isPending = teacherReqData?.status === "pending";
  const isRejected = teacherReqData?.status === "rejected";
  const isApproved =
    teacherReqData?.status === "approved" || userRole.role === "teacher";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
          Become a Teacher on <span className="text-primary">EduManage</span>
        </h2>

        {/*  Already a teacher */}
        {isApproved && (
          <p className="text-green-600 text-center text-xl font-semibold">
            You are already a teacher. 🎉
          </p>
        )}

        {/* ✅ Show Pending message */}
        {isPending && (
          <p className="text-yellow-500 text-center text-lg font-medium">
            Your request is under review. Please wait for admin approval.
          </p>
        )}

        {/* ✅ If status is rejected, show "request again" button */}
        {isRejected && (
          <div className="text-center mb-6">
            <p className="text-red-500 text-lg mb-2">
              Your request was rejected. You can submit again.
            </p>
          </div>
        )}
        {/* Show form if no request or rejected */}
        {showForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="col-span-1 md:col-span-2">
              <label className="block font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100 text-gray-800"
              />
            </div>
            {/* Email */}
            <div className="col-span-1 md:col-span-2">
              <label className="block font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100 text-gray-800"
              />
            </div>
            {/* Experience */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Experience
              </label>
              <select
                {...register("experience", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="mid-level">Mid-level</option>
                <option value="experienced">Experienced</option>
              </select>
              {errors.experience && (
                <p className="text-sm text-red-500 mt-1">
                  Experience is required.
                </p>
              )}
            </div>
            {/* Title */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="e.g. Frontend Developer"
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">Title is required.</p>
              )}
            </div>
            {/* Category */}
            <div className="col-span-1 md:col-span-2">
              <label className="block font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select category</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Business">Business</option>
                <option value="Data Science">Data Science</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">
                  Category is required.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div
              className={` col-span-1 md:col-span-2  ${
                userRole.role === "admin" ? "cursor-not-allowed  " : ""
              }`}
            >
              <button
                type="submit"
                disabled={userRole.role === "admin"}
                className={`btn btn-primary w-full text-lg font-semibold tracking-wide shadow-md hover:shadow-lg transition-all ${
                  userRole.role === "admin" ? " opacity-50" : ""
                }`}
              >
                {isRejected ? "Request Again" : "Submit for Review"}
              </button>
              <p className="text-center text-gray-400 mt-2 font-bold">
                {userRole.role === "admin" ? "This button not for admin" : ""}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeachOnEduManage;
