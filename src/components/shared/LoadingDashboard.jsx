import React from "react";
import { NavLink, Outlet } from "react-router";
import ProfileLogo from "./ProfileLogo";

const LoadingDashboard = () => {
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
          <NavLink>
            <ProfileLogo></ProfileLogo>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default LoadingDashboard;
