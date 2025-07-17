import { useParams, useNavigate } from "react-router";

import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";
import { FaDollarSign } from "react-icons/fa";

const ClassInfo = () => {
  const { id } = useParams();
  console.log(id);
  const axiosInstance = UseAxios();
  const navigate = useNavigate();

  const { data: classDetails = {}, isLoading } = useQuery({
    queryKey: ["class-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/class/${id}`);
      return res.data;
    },
  });

  //   console.log(classDetails);

  const handlePay = () => {
    navigate(`/payment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        {/* Image skeleton */}
        <div className="skeleton h-64 w-full rounded-xl"></div>

        {/* Title */}
        <div className="skeleton h-8 w-2/3 mt-4"></div>

        {/* Description */}
        <div className="skeleton h-4 w-full mt-2"></div>
        <div className="skeleton h-4 w-3/4 mt-2"></div>

        {/* Instructor info */}
        <div className="skeleton h-4 w-1/2 mt-4"></div>

        {/* Price */}
        <div className="skeleton h-4 w-1/4 mt-2"></div>

        {/* Button */}
        <div className="skeleton h-10 w-32 mt-6"></div>
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
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={image}
        alt={title}
        className="rounded-xl w-full max-h-[400px]"
      />
      <h2 className="text-3xl font-bold mt-4">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="mt-2">
        Instructor: <strong>{instructorName}</strong> ({instructorEmail})
      </p>
      <p className="flex items-center">
        Price: <FaDollarSign /> <strong> {price}</strong>
      </p>
      <p>Enrolled: {enrolled} student(s)</p>

      <button
        onClick={handlePay}
        className="btn btn-primary mt-4"
        disabled={status !== "approved"}
      >
        Pay Now
      </button>
    </div>
  );
};

export default ClassInfo;
