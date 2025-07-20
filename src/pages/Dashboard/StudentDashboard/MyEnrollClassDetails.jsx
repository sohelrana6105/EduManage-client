import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import Swal from "sweetalert2";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../../../context/authcontext/AuthContext";

const MyEnrollClassDetails = () => {
  const { classId } = useParams();
  const axiosSecure = UseaxiosSecure();
  const [assignments, setAssignments] = useState([]);
  const [enrolledClass, setEnrolledClass] = useState([]);
  const [rating, setRating] = useState(0);
  const [showTERModal, setShowTERModal] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure
      .get(`/class/assignments/${classId}?email=${user.email}`)
      .then((res) => {
        // console.log(res);
        setAssignments(res.data);
      });
  }, [classId, axiosSecure, user]);

  // console.log(assignments);

  useEffect(() => {
    axiosSecure.get(`/class/${classId}`).then((res) => {
      // console.log(res);
      setEnrolledClass(res.data);
    });
  }, [classId, axiosSecure, user]);

  console.log("myenrolled", enrolledClass);

  // Catch Rating value
  const handleRating = (rate) => {
    if (rate === rating) return;
    setRating(rate);
    console.log("rate inside the funcion", rate);
  };

  // console.log("rating ", rating);

  const handleSubmitAssignment = async (e, assignmentId, title) => {
    e.preventDefault();
    const submission = e.target.submission.value;
    // console.log(submission);

    const submissionData = {
      assignmentId,
      classId,
      title,
      submission: submission,
      studentName: user?.displayName,
      studentEmail: user?.email,

      submittedAt: new Date().toISOString(),
    };
    // console.log("button index", index + 1, submissionData);

    try {
      const res = await axiosSecure.post("/submissions", submissionData);
      // console.log(res);

      if (res.data?.insertResult.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: `Your submission for "${title}" was successful.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
      const errorMassage = err.response?.data?.message;

      if (err.response?.data) {
        Swal.fire({
          icon: "error",
          title: errorMassage,
          text: "Submission Failed",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: err.message || "Something went wrong. Please try again.",
        });
      }
    }
    e.target.reset();
    // console.log(e.target);
  };

  const handleSendTER = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;

    if (rating <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Please rate the class",
        text: "Select at least 1 star before submitting.",
      });
      return;
    }

    const feedback = {
      classId,
      classImage: enrolledClass?.image,
      classTitle: enrolledClass?.title,
      studentName: user?.displayName,
      studentEmail: user?.email,
      studentImage: user?.photoURL,
      feedback: description,
      rating,
      submittedAt: new Date().toISOString(),
    };

    // console.log(feedback);
    try {
      const res = await axiosSecure.post("/feedback", feedback);

      setShowTERModal(false);
      setRating(0);

      if (res?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Success! Your feedback has been submitted",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      // console.log(res);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          err.message ||
          "Something went wrong. Failed to submit feedback. Please try again",
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>

      {assignments.length === 0 ? (
        <div className="bg-gray-50 text-center text-gray-600 py-10">
          <p className="text-xl  font-bold">
            No assignments have been posted by the teacher yet.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please check back later for new assignments.
          </p>
        </div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Deadline</th>
              <th className="p-2">Submission</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, index) => (
              <tr key={a._id} className="border-t">
                <td className="p-2">{a.title}</td>
                <td className="p-2">{a.description}</td>
                <td className="p-2">
                  {new Date(a.deadline).toLocaleDateString()}
                </td>

                {/* Form for this row */}
                <td className="p-2" colSpan={2}>
                  <form
                    onSubmit={(e) => {
                      handleSubmitAssignment(e, a._id, a.title, index);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      name="submission"
                      className="border p-1 w-full"
                      placeholder="Repo link or live link"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Submit
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* TER Button */}
      <div className="mt-6 text-center">
        <button
          disabled={assignments.length === 0}
          className={` text-white px-6 py-2 rounded transition duration-200 ${
            assignments.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={() => setShowTERModal(true)}
        >
          Teaching Evaluation Report
        </button>
      </div>

      {/* Modal */}
      {showTERModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSendTER} className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              Teaching Evaluation Report
            </h3>

            <textarea
              rows="4"
              className="w-full border p-2 mb-4"
              placeholder="Write your feedback..."
              name="description"
              required
            />

            <p className="mb-2">Rate the class:</p>
            <div className="bg-yellow-100 border border-red-500 p-2 rounded">
              <Rating
                onClick={handleRating}
                initialValue={rating}
                size={25}
                transition
                allowHover
                SVGstyle={{ display: "inline" }}
                fillColor="orange"
                emptyColor="gray"
              />
            </div>

            <p className="mt-1 text-sm text-gray-500">
              You selected: {rating} star(s)
            </p>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => {
                  setShowTERModal(false);
                  setRating(0);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ------------*/}
    </div>
  );
};

export default MyEnrollClassDetails;
