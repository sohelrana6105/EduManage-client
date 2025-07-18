import { useQuery } from "@tanstack/react-query";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../context/authcontext/AuthContext";

import { Link } from "react-router";

const MyEnrollClasses = () => {
  const axiosSecure = UseaxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolled-classes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-classes/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((classItem) => (
          <div
            key={classItem._id}
            className="rounded-2xl overflow-hidden shadow-lg border"
          >
            <img
              src={classItem.image}
              alt={classItem.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{classItem.title}</h3>
              <p className="text-gray-600 mb-4">
                Instructor: {classItem.instructorName}
              </p>
              <Link to={`/dashboard/myenroll-class/${classItem.classId}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClasses;
