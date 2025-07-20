import React, { useContext } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import { FaBookOpen } from "react-icons/fa";
import { AuthContext } from "../../../context/authcontext/AuthContext";

const ClassProgress = () => {
  const { id } = useParams();
  const axiosSecure = UseaxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: classDetails, isLoading } = useQuery({
    queryKey: ["class-progress", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });

  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/class/assignments/${id}?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: TotalSubmission } = useQuery({
    queryKey: ["submission-count", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/count/${id}`);
      return res.data;
    },
  });
  console.log("totalsubmission", TotalSubmission, "assignments", assignments);

  if (isLoading) {
    return <p className="text-center">Loading class progress...</p>;
  }

  const {
    title,
    instructorName,
    instructorEmail,
    price,
    description,
    image,
    status,
    enrolled = 0,
  } = classDetails || {};

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4  flex items-center gap-2">
        <FaBookOpen className="text-indigo-600" /> Class Progress
      </h2>

      {/* ----------- Class Info Section ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-lg border"
        />

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <p>
            <span className="font-semibold">Instructor:</span> {instructorName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {instructorEmail}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ৳{price}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`inline-block px-2 py-1 text-sm rounded ${
                status === "approved"
                  ? "bg-green-200 text-green-800"
                  : status === "pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {status}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Description:</span> {description}
          </p>
        </div>
      </div>

      {/* ----------- Progress Cards Section ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Enrollments */}
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Total Enrollments</h3>
          <p className="text-3xl mt-2 text-blue-600 font-bold">{enrolled}</p>
        </div>

        {/* Total Assignments */}
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Total Assignments </h3>
          <p className="text-3xl mt-2 text-green-600 font-bold">
            {assignments.length || 0}
          </p>
        </div>

        {/* Total Submissions */}
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Total Submissions</h3>
          <p className="text-3xl mt-2 text-purple-600 font-bold">
            {TotalSubmission}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassProgress;
