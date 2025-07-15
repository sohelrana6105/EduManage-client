import React from "react";
import { useNavigate } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-md">
        <div className="flex justify-center mb-4 text-red-500 text-5xl">
          <FaBan />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
