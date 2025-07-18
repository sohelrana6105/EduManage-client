import React, { use, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../../context/authcontext/AuthContext";

const ClassDetails = () => {
  // class id
  const { id } = useParams();
  const { user } = use(AuthContext);
  const axiosSecure = UseaxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { data: classData = {} } = useQuery({
    queryKey: ["class-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-class/${id}`);
      return res.data;
    },
  });
  // console.log(classData);

  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/class/assignments/${id}?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: submissionCount = 0 } = useQuery({
    queryKey: ["submission-count", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/count/${id}`);
      console.log(res);
      return res?.data;
    },
  });

  // assignment data sent in the server
  const { mutateAsync: createAssignment } = useMutation({
    mutationFn: async (data) => {
      const assignment = {
        classId: id,
        assignmentCreator: user.email,
        ...data,
        submissionCount: 0,
        createdAt: new Date().toISOString(), // use ISO format
        updatedAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/assignments", assignment);
      return res.data;
    },

    onSuccess: (data) => {
      console.log(data);
      if (data?.result?.insertedId) {
        Swal.fire(" Success", "Assignment created!", "success");

        // ✅ Refetch assignments after creating
        queryClient.invalidateQueries(["assignments", id]);

        reset();
        setIsModalOpen(false);
      }
    },

    onError: (err) => {
      console.error("Assignment creation failed:", err);
      Swal.fire(" Error", "Something went wrong.", "error");
    },
  });

  const onSubmit = async (data) => {
    await createAssignment(data);
  };

  const StatCard = ({ title, value }) => (
    <div className="bg-white shadow-md rounded-2xl p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-indigo-600">{value}</p>
    </div>
  );

  return (
    <div className="p-6 space-y-10">
      {/* Create Assignment Button */}
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary rounded-full"
        >
          <FaPlus /> Create Assignment
        </button>
      </div>

      {/* Class Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Enrollments" value={classData.enrolled} />
        <StatCard title="Total Assignments" value={assignments.length} />
        <StatCard title="Total Submissions" value={submissionCount} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("title", { required: true })}
                placeholder="Assignment Title"
                className="input input-bordered w-full"
              />
              <input
                {...register("deadline", { required: true })}
                type="date"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Assignment Description"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
