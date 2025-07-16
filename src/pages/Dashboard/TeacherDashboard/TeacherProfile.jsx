import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import { AuthContext } from "../../../context/authcontext/AuthContext";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const TeacherProfile = () => {
  const { user } = React.useContext(AuthContext);
  const axiosSecure = UseaxiosSecure();

  const { data: profile = {} } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:flex items-center gap-6 relative lg:p-40">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={profile.profilePic}
            alt={profile.name}
            className="w-36 h-36  lg:w-64  lg:h-64  rounded-full object-cover border-4 border-indigo-500"
          />
          {/* Role Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
            {profile.role || "Teacher"}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold text-indigo-700">{profile.name}</h2>

          <div className="text-gray-600 space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-indigo-400" />{" "}
              <a
                className="hover:text-indigo-600  hover:underline"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-indigo-400" />
              {profile.phone || (
                <span className="text-gray-400">Not provided</span>
              )}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-indigo-400" />
              Joined:{" "}
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-indigo-400" />
              Last Login:{" "}
              {profile.lastLogin
                ? new Date(profile.lastLogin).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
