import React, { useEffect, useState } from "react";
import { FaUsers, FaBookOpen, FaUserCheck, FaGlobe } from "react-icons/fa";
import UseAxios from "../../hooks/UseAxios";

const DashboardHome = () => {
  const axiosInstance = UseAxios();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClasses: 0,
    totalEnrollments: 0,
  });

  useEffect(() => {
    axiosInstance
      .get("/edumanage-summary")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.error("Failed to load stats", err));
  }, [axiosInstance]);

  const statItems = [
    {
      title: "Total Users",
      count: stats.totalUsers,
      icon: <FaUsers className="text-blue-600 w-8 h-8" />,
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      title: "Total Classes",
      count: stats.totalClasses,
      icon: <FaBookOpen className="text-green-600 w-8 h-8" />,
      bg: "bg-green-50",
      color: "text-green-700",
    },
    {
      title: "Total Enrollments",
      count: stats.totalEnrollments,
      icon: <FaUserCheck className="text-purple-600 w-8 h-8" />,
      bg: "bg-purple-50",
      color: "text-purple-700",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-12">
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="flex justify-center items-center gap-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
          <FaGlobe className="text-blue-500" />
          Welcome to EduManage Dashboard
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          View overall insights of our educational platform. This dashboard is
          public for all roles.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {statItems.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center`}
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="text-md font-medium text-gray-700">{item.title}</h3>
            <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
          </div>
        ))}
      </div>

      {/* Platform Highlight */}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Why EduManage?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          EduManage is an all-in-one platform for students, teachers, and admins
          to manage classes, assignments, enrollments, and feedback efficiently.
          Whether you're here to learn, teach, or manage – EduManage keeps
          everything organized and accessible.
        </p>
        <img
          src="https://i.ibb.co/Xx11bCQh/edumanage-summary-pic.jpg"
          alt="EduManage Overview"
          className="mt-8 w-full max-w-xl mx-auto rounded-xl shadow-md"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
