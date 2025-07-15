import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/authcontext/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useJwtToken from "../../hooks/useJwtToken";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const getJwtToken = useJwtToken();

  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginFormHandler = (data) => {
    setSuccess("");
    setErr("");

    const { email, password } = data;

    signIn(email, password)
      .then(async () => {
        setSuccess("Login successful");
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "You're logged in!",
          confirmButtonColor: "#2563eb",
        });
        navigate(
          location.state && location.state.from ? location.state.from : "/"
        );

        const tokenres = await getJwtToken(email);
        console.log(" after login token response", tokenres);
      })
      .catch((err) => {
        setErr(err.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <div className="text-gray-700">
      <form
        onSubmit={handleSubmit(loginFormHandler)}
        className="space-y-6"
        noValidate
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Login to EduManage
        </h2>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
          />

          {/* Icon button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 text-gray-500 hover:text-blue-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={22} />
            ) : (
              <AiFillEye size={22} />
            )}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <div className="text-right text-sm">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center justify-center gap-4">
        <span className="h-px w-full bg-gray-300"></span>
        <span className="text-sm text-gray-500">OR</span>
        <span className="h-px w-full bg-gray-300"></span>
      </div>

      {/* Social login */}
      <div className="flex justify-center">
        <SocialLogin location={location} />
      </div>

      {/* Register prompt */}
      <p className="text-center mt-6 text-sm">
        New to EduManage?{" "}
        <NavLink to="/register" className="text-blue-500 hover:underline">
          Create an account
        </NavLink>
      </p>

      {/* Feedback messages */}
      {success && (
        <p className="text-green-600 text-center mt-4 font-medium">{success}</p>
      )}
      {err && (
        <p className="text-red-600 text-center mt-4 font-medium">{err}</p>
      )}
    </div>
  );
};

export default Login;
