import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../context/authcontext/AuthContext";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import { motion } from "framer-motion";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseaxiosSecure();
  const navigate = useNavigate();

  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-classes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-classes?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/my-class/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Class has been deleted.", "success");
          refetch();
        }
      }
    });
  };

  const handleUpdate = (id) => {
    // Optionally open modal or navigate
    navigate(`/dashboard/update-class/${id}`);
  };

  const handleSeeDetails = (id, status) => {
    if (status !== "approved") return;
    navigate(`/dashboard/my-class/${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📚 My Classes</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {classes.map((cls, index) => (
            <motion.div
              key={cls._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow rounded-xl p-3 flex flex-col justify-between"
            >
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <div className="space-y-1 text-sm">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {cls.title}
                </h3>
                <p className="text-gray-600">
                  <strong>Name:</strong> {cls.instructorName}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {cls.instructorEmail}
                </p>
                <p className="text-gray-600">
                  <strong>Price:</strong> ৳{cls.price}
                </p>
                <p className="">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      cls.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : cls.status === "denied"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {cls.status}
                  </span>
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {cls.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => handleUpdate(cls._id)}
                  className="flex items-center btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                >
                  <FaEdit className="mr-1" /> Update
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="flex items-center btn btn-xs bg-red-500 text-white hover:bg-red-600"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
                <button
                  disabled={cls.status !== "approved"}
                  onClick={() => handleSeeDetails(cls._id, cls.status)}
                  className={`flex items-center btn btn-xs ${
                    cls.status === "approved"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <FaEye className="mr-1" /> Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClasses;
