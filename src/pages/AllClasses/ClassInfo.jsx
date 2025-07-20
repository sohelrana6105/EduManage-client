import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";
import {
  FaDollarSign,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaEnvelope,
} from "react-icons/fa";

const ClassInfo = () => {
  const { id } = useParams();
  const axiosInstance = UseAxios();
  const navigate = useNavigate();

  const { data: classDetails = {}, isLoading } = useQuery({
    queryKey: ["class-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/class/${id}`);
      return res.data;
    },
  });

  const handlePay = () => {
    navigate(`/payment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse space-y-4">
        <div className="skeleton h-64 w-full rounded-xl"></div>
        <div className="skeleton h-8 w-2/3"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-4 w-1/4"></div>
        <div className="skeleton h-10 w-32"></div>
      </div>
    );
  }

  const {
    title,
    instructorName,
    instructorEmail,
    price,
    description,
    image,
    enrolled,
    status,
  } = classDetails;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <img
        src={image}
        alt={title}
        className="rounded-lg w-full max-h-[400px] object-cover"
      />

      <div className="mt-6 space-y-4">
        <h2 className="text-4xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-lg">{description}</p>

        <div className="text-gray-700 space-y-1">
          <p className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-blue-600" />
            <strong>{instructorName}</strong>
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-green-600" />
            {instructorEmail}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-4 text-lg">
          <p className="flex items-center gap-2 text-gray-700">
            <FaDollarSign className="text-green-500" />
            <strong>{price}</strong>
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaUserGraduate className="text-purple-500" />
            {enrolled} enrolled
          </p>
        </div>

        <button
          onClick={handlePay}
          className={`btn btn-primary mt-6 px-6 py-2 text-white font-semibold rounded-lg ${
            status !== "approved" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={status !== "approved"}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default ClassInfo;
