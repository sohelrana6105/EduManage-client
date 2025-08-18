// import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseaxiosSecure from "../../hooks/UseaxiosSecure";
import { AuthContext } from "../../context/authcontext/AuthContext";
import { FiDollarSign, FiUsers } from "react-icons/fi";
import { FaUserCheck, FaChalkboardTeacher } from "react-icons/fa";
import UseUserRole from "../../hooks/UseUserRole";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const AllClasses = () => {
  const axiosSecure = UseaxiosSecure();
  // const { user } = useContext(AuthContext);
  const userRole = UseUserRole();
  const Navigate = useNavigate();

  const limit = 10;
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / limit);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  // console.log("total count", totalCount, "current page", currentPage);

  // 1st step for pagination
  useEffect(() => {
    axiosSecure.get("/allclass/approved-count").then((res) => {
      // console.log(res);
      setTotalCount(res.data);
    });
  }, [axiosSecure]);

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approved-classes", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allclass/approved?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  // Sort classes by price
  const sortedClasses = [...classes].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  //   `/allclass/approved?email=${user.email}`

  const handleEnroll = async (classId, userRole) => {
    if (userRole?.role !== "student") {
      return Swal.fire(
        "Access Denied",
        "Only students can enroll. Please login as a student.",
        "warning"
      );
    }
    Navigate(`/allclass/class/${classId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-10 flex justify-center items-center gap-2">
        <FaUserCheck className="text-blue-600 text-4xl" />
        Explore Approved Classes
      </h1>

      {/* Sorting Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex flex-col group"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
            />

            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {cls.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FaChalkboardTeacher className="text-green-600" />
                  <strong className="font-medium">Instructor:</strong>{" "}
                  {cls.instructorName}
                </p>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {cls.description.slice(0, 90)}...
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-center text-sm text-gray-700 font-medium mb-3">
                  <span className="flex items-center gap-1">
                    <FiDollarSign className="text-green-600" /> ${cls.price}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers className="text-blue-600" /> {cls.enrolled || 0}
                  </span>
                </div>

                <button
                  onClick={() => handleEnroll(cls._id, userRole)}
                  disabled={userRole?.role !== "student"}
                  className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300
                    ${
                      userRole?.role !== "student"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                    }`}
                >
                  <FaUserCheck className="text-lg" />
                  {userRole?.role === "student"
                    ? "Enroll Now"
                    : "Student Allowed"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* this is the pagination button */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === num + 1 ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {num + 1} ....
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
