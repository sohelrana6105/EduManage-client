import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";

import Swal from "sweetalert2";

const TeacherRequests = () => {
  const axiosSecure = UseaxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacher-requests");
      return res.data;
    },
  });

  const handleApprove = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this teacher request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${email}`);
      console.log(res);
      if (res.data?.requestUpdate?.modifiedCount > 0) {
        Swal.fire("Approved!", "Teacher request has been approved.", "success");
        refetch();
      }
    }
  };

  const handleReject = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this teacher request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/teacher-requests/reject/${email}`);
      console.log(res);
      if (res.data?.result.modifiedCount > 0) {
        Swal.fire("Rejected", "Teacher request has been rejected.", "info");
        refetch();
      }
    }
  };

  console.log(requests);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Teacher Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={item?.profilePic}
                    alt="Teacher"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.experience}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded ${
                      item.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : item.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleApprove(item.email)}
                    disabled={item.status === "rejected"}
                    className={`bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed `}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(item.email)}
                    disabled={item.status === "rejected"}
                    className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No teacher requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequests;
