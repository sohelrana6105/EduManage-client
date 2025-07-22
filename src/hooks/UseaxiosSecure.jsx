import axios from "axios";
// import React, { use } from "react";
// import { AuthContext } from "../contexts/authcontext/AuthContext";
// import { useNavigate } from "react-router";

// setep one go to axios docs and use axios instantce

const axiosSecure = axios.create({
  baseURL: "https://edu-manage-server-swart.vercel.app",
});

const UseaxiosSecure = () => {
  // const { user } = use(AuthContext);
  // const navigate = useNavigate();

  // axios interceptor for attaching JWT token
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      console.log("interceptor", error);
      return Promise.reject(error);
    }
  );

  // axiosSecure.interceptors.response.use(
  //   (res) => {
  //     return res;
  //   },
  //   (error) => {
  //     console.log("inside res inter ", error);
  //     // const status = error.status;
  //     // if (status === 403) {
  //     //   navigate("/forbidden");
  //     // }
  //     return Promise.reject(error);
  //   }
  // );

  return axiosSecure;
};

export default UseaxiosSecure;

//  https://axios-http.com/docs/instance
