import React, { use } from "react";

import { AuthContext } from "../context/authcontext/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxios from "../hooks/UseAxios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useJwtToken from "../hooks/useJwtToken";

const SocialLogin = () => {
  const { googleSignIn } = use(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = UseAxios();
  const getJwtToken = useJwtToken();

  // Setup TanStack mutation for saving user in DB
  const { mutateAsync: saveSocialUser } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosInstance.post("/users", userInfo);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "User handled successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to save social user"
      );
    },
  });

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;

        // console.log(user, "result is user");
        // update in the database

        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "student", //default role
          profilePic: user.photoURL,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        // console.log(userInfo);

        // updatde databse api
        // 🔁 Call mutation to save or update user in DB
        const res = await saveSocialUser(userInfo);
        // console.log("save user after reg sociallogin", res);

        if (
          res?.result?.modifiedCount ||
          res?.result?.message === "User already exists"
        ) {
          // Existing user logged in again
          Swal.fire({
            icon: "success",
            title: "Welcome back!",
            text: "Logged in successfully.",
            confirmButtonColor: "#3085d6",
          });
        }

        if (user && res.result.insertedId) {
          Swal.fire({
            icon: "success",
            title: `${res.message}`,
            text: "User has created succesfully.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        }

        const tokenres = await getJwtToken(user.email);
        console.log(" after login token response", tokenres);
        navigate(location?.state?.from ? location.state.from : "/");
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          icon: "error",
          title: `${err.message}`,
          text: "something went wrong",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
