import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import { useEffect, useState } from "react";

const ManageClasses = () => {
  const axiosSecure = UseaxiosSecure();
  const navigate = useNavigate();

  //  Fot pagination
  const limit = 10;
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / limit);
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(currentPage);

  // 1st step for pagination
  useEffect(() => {
    axiosSecure.get("/class-count").then((res) => {
      setTotalCount(res.data.count);
    });
  }, [axiosSecure]);

  // console.log("totalcount", totalCount, "limit", limit);

  // 1. Fetch all classes
  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-classes", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allclass?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  // 2. Approve handler
  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/classes/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Approved!", "The class has been approved.", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  // 3. Reject handler
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/classes/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Rejected!", "The class has been rejected.", "info");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading classes...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Classes</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Instructor Email</th>
              <th>Description</th>
              <th>Actions</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td>{cls.title}</td>
                <td>
                  <img
                    src={cls.image}
                    alt="class"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{cls.instructorEmail}</td>
                <td>{cls.description?.slice(0, 60)}...</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleApprove(cls._id)}
                    disabled={cls.status === "approved"}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(cls._id)}
                    disabled={cls.status === "rejected"}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/class-progress/${cls._id}`)
                    }
                    disabled={cls.status !== "approved"}
                    className="btn btn-xs btn-info"
                  >
                    Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {classes.length === 0 && (
          <p className="text-center font-bold text-2xl mt-4 text-gray-500">
            No classes available.
          </p>
        )}

        {/* this is the pagination button */}
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === num + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;
