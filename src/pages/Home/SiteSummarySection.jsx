import React, { useEffect, useState } from "react";
import { FaChartPie } from "react-icons/fa";
import { FaUsers, FaBookOpen, FaUserCheck } from "react-icons/fa";
import UseAxios from "../../hooks/UseAxios";

const SiteSummarySection = () => {
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
        console.log("API Response:", res);
        setStats(res.data); // Or res.data.data if nested
      })
      .catch((err) => console.error("Failed to load stats", err));
  }, [axiosInstance]);

  console.log("stats", stats);

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
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12 items-center">
      {/* Left - Text and Stats */}
      <div>
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 leading-tight flex items-center gap-x-2">
          <FaChartPie className="text-blue-500" /> Platform Overview
        </h2>
        <p className="text-gray-600 text-lg mb-10 max-w-xl">
          Our platform is constantly growing. Here's a quick snapshot of user
          engagement and activity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center`}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-md font-medium text-gray-700">
                {item.title}
              </h3>
              <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="w-full">
        <img
          src="https://i.ibb.co/Xx11bCQh/edumanage-summary-pic.jpg"
          alt="Educational Platform"
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default SiteSummarySection;
