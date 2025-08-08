import React from "react";
import { NavLink, Outlet } from "react-router";
import UseUserRole from "../hooks/UseUserRole";

import {
  FaHome,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaClipboardList,
  FaUserClock,
  FaUserShield,
  FaPlusCircle,
  FaBookOpen,
  FaUserTie,
} from "react-icons/fa";
import ProfileLogo from "../components/shared/ProfileLogo";

const DashboardLayout = () => {
  const { role, roleLoading } = UseUserRole();
  // console.log(role);

  if (roleLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col px-4">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-200 lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost drawer-button"
          >
            ☰
          </label>
          <h2 className="text-lg font-bold ml-2">EduManage Dashboard</h2>
        </div>

        {/* Main Content */}
        <div className="py-6">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Logo with name */}
          <li>
            <NavLink to="/">
              <ProfileLogo></ProfileLogo>
            </NavLink>
          </li>
          {/* Shared Dashboard Home */}
          <li>
            <NavLink to="/dashboard">
              <FaHome /> Dashboard Home
            </NavLink>
          </li>
          {/* 👨‍🎓 Student Links */}
          {role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/my-enroll-classes">
                  <FaClipboardList className="mr-2" /> Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student-profile">
                  <FaUserGraduate className="mr-2" /> Profile
                </NavLink>
              </li>
            </>
          )}
          {/* 👨‍🏫 Teacher Links */}
          {role === "teacher" && (
            <>
              <li>
                <NavLink to="/dashboard/teacher/add-class">
                  <FaPlusCircle className="mr-2" /> Add Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/teacher/my-class">
                  <FaBookOpen className="mr-2" /> My Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/teacher/profile">
                  <FaUserTie className="mr-2" /> My profile
                </NavLink>
              </li>
            </>
          )}

          {/* =========== 🛡️ Admin Links ============ */}
          {/* 🛡️ Admin Links */}
          {role === "admin" && (
            <>
              {/* 👨‍🏫 Teacher Requests */}
              <li>
                <NavLink to="/dashboard/teacher-requests">
                  <FaUserClock /> Teacher Requests
                </NavLink>
              </li>

              {/* 👥 Manage Users */}
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers /> Users
                </NavLink>
              </li>

              {/* 📚 All Classes */}
              <li>
                <NavLink to="/dashboard/manage-classes">
                  <FaClipboardList /> All Classes
                </NavLink>
              </li>

              {/* 🙍‍♂️ Profile */}
              <li>
                <NavLink to="/dashboard/admin-profile">
                  <FaUserShield /> Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
