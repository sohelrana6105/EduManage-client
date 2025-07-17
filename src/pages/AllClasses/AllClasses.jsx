import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseaxiosSecure from "../../hooks/UseaxiosSecure";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { FiDollarSign, FiUsers } from "react-icons/fi"; // ✅ react icons
import UseUserRole from "../../hooks/UseUserRole";
import { useNavigate } from "react-router";

const AllClasses = () => {
  const axiosSecure = UseaxiosSecure();
  const { user } = useContext(AuthContext);
  const userRole = UseUserRole();
  const Navigate = useNavigate();
  // console.log(userRole.role);

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approved-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allclass?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  const handleEnroll = async (classId, userRole) => {
    if (userRole?.role !== "student") {
      return Swal.fire(
        "Access Denied",
        "Only students can enroll. Please login as student.",
        "warning"
      );
    }
    Navigate(`/allclass/class/${classId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6">
        Explore Approved Classes
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-44 object-cover rounded-t-xl"
            />

            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {cls.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Instructor:</strong> {cls.instructorName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {cls.description.slice(0, 80)}...
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <FiDollarSign /> ${cls.price}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers /> {cls.enrolled || 0}
                  </span>
                </div>

                <button
                  onClick={() => handleEnroll(cls._id, userRole)}
                  disabled={userRole?.role !== "student"}
                  className={`w-full py-2 text-white rounded-lg transition font-semibold ${
                    userRole?.role !== "student"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
