import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";

import Swal from "sweetalert2";
import UseAxios from "../../hooks/UseAxios";
import { AuthContext } from "../../context/authcontext/AuthContext";
import SocialLogin from "../SocialLogin";
import axios from "axios";
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useJwtToken from "../../hooks/useJwtToken";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const axiosInstance = UseAxios(); // Optional axios instance for secure post
  const getJwtToken = useJwtToken();

  const [succes, setSucces] = useState("");
  const [err, setErr] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Show/Hide toggle

  const navigate = useNavigate();

  // step 1 : Define mutation before your form handler

  //  Setup TanStack mutation to POST user data to MongoDB
  const { mutateAsync: saveUserToDb } = useMutation({
    // ✅ This is the function that actually runs (POST to server)
    mutationFn: async (userInfo) => {
      const res = await axiosInstance.post("/users", userInfo);
      return res.data;
    },

    // ✅ Runs when mutation is successful
    onSuccess: (data) => {
      console.log(" Mutation Success:", data);
      toast.success("User saved to database successfully!");
    },

    // ❌ Runs if mutation fails (e.g. user exists, server error)
    onError: (error) => {
      console.error(" Mutation Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to save user in database"
      );
    },
  });

  // Register form submit handler
  const RegisterFormHandler = (data) => {
    console.log(data);
    const { name, email, password } = data;

    setSucces("");
    setErr("");

    createUser(email, password)
      .then(async () => {
        // console.log(result);

        // Step 1: Save user in DB (Optional)
        const userInfo = {
          name: name,
          email: email,
          profilePic,
          role: "student", // default role
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        console.log(userInfo);

        // Step 3: Update profile in Firebase
        updateUser(name, profilePic)
          .then(() => {
            setSucces("User has created successfully");
            Swal.fire({
              icon: "success",
              title: "User created successfully",
              text: "Profile Updated!",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            });
            navigate(
              location.state && location.state.from ? location.state.from : "/"
            );
          })
          .catch((err) => {
            setErr(err.message);
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: err.message,
            });
          });

        //  Call mutation to save user in MongoDB
        const sendUser = await saveUserToDb(userInfo);
        console.log("send user in the database", sendUser);

        //token genetate after sending email
        const tokenres = await getJwtToken(email);
        console.log(" after login token response", tokenres);
      })
      .catch((err) => {
        setErr(err.message);
        console.log(err.message);
      });

    reset();
  };

  // Upload image to imgbb and set profilePic
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    // Checking purpose to get formData
    console.log(formData.get("image"));
    console.log([...formData.entries()]);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      // console.log(res);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      setErr("Failed to upload image.");
    }
  };

  // console.log(profilePic); // for debugging

  return (
    <form
      onSubmit={handleSubmit(RegisterFormHandler)}
      className="text-gray-700 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Register at EduManage
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Profile upload */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Profile Picture
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="file-input file-input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters",
              },
            })}
            placeholder="Password"
          />
          {/* Toggle Show/Hide */}
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <BsEye size={20} />}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="text-right text-sm">
        <a href="#" className="text-blue-500 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Register Button */}
      <button className="btn btn-primary w-full">Register</button>

      {/* Divider */}
      <div className="divider text-sm text-gray-500">OR</div>

      {/* Social Login */}
      <div className="flex justify-center">
        <SocialLogin />
      </div>

      {/* Already have account */}
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <NavLink
          to={"/login"}
          className="text-blue-600 underline font-semibold"
        >
          Login
        </NavLink>
      </p>

      {/* Success & Error Messages */}
      {succes && (
        <p className="text-green-500 text-center font-bold">{succes}</p>
      )}
      {err && <p className="text-red-500 text-center font-bold">{err}</p>}
    </form>
  );
};

export default Register;
