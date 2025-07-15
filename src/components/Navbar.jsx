import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";

import ProfileLogo from "./shared/ProfileLogo";
import { AuthContext } from "../context/authcontext/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser, loading } = use(AuthContext);
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-blue-600" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allclasses"
          className={({ isActive }) => (isActive ? "text-blue-600" : "")}
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teachEdumanage"
          className={({ isActive }) => (isActive ? "text-blue-600" : "")}
        >
          Teach on EduManage
        </NavLink>
      </li>

      {/* 
      <li>{user && <NavLink to={"/dashboard"}>Dashboard</NavLink>}</li>
      <li>{user && <NavLink to={"/BeARider"}>Be a Rider</NavLink>}</li> */}
    </>
  );

  const signOutHandler = () => {
    signOutUser()
      .then((result) => {
        console.log(result, "signout");
        Swal.fire({
          icon: "success",
          title: "User logout!",
          text: "You succesfully logout.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <NavLink to="/">
            <ProfileLogo></ProfileLogo>
          </NavLink>
        </div>
        {/*  only large */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* navbar end */}
        <div className="navbar-end">
          {loading ? (
            // Show black circle placeholder while loading
            <div className="w-10 h-10 rounded-full border border-2-black animate-pulse"></div>
          ) : user ? (
            // Show actual user profile
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="tooltip tooltip-left btn btn-ghost btn-circle avatar"
                data-tip={user.displayName}
              >
                <div className=" w-10 rounded-full border border-black">
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                    }
                    alt="User"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="  menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <p className=" text-2xl font-semibold text-center ">
                  <span>{user.displayName || "User Name"}</span>
                </p>
                <li>
                  <NavLink
                    className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 rounded-md hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                    onClick={signOutHandler}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Not loading and no user: show login/register
            <>
              <button className="btn">
                <NavLink to={"/login"}> Login </NavLink>
              </button>
              <button className="btn">
                <NavLink to={"/register"}> Register </NavLink>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
