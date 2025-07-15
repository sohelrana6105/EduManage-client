import React from "react";
import { NavLink, Outlet } from "react-router"; // ← Fix import
import Lottie from "lottie-react";
import Authanimation from "../assets/register.json";
import ProfileLogo from "../components/shared/ProfileLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col p-4 md:p-12">
      {/* Logo */}
      <NavLink
        to="/"
        className="flex justify-center mb-6 hover:scale-110 transition-transform duration-300"
      >
        <ProfileLogo />
      </NavLink>

      {/* Main Content */}
      <div className="flex-1 flex flex-col-reverse md:flex-row-reverse items-center justify-center gap-8">
        {/* Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Lottie
            animationData={Authanimation}
            loop
            className="w-full max-w-md"
          />
        </div>

        {/* Outlet (Login/Register form) */}
        <div className="w-full md:w-1/2">
          <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 w-full max-w-md mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
