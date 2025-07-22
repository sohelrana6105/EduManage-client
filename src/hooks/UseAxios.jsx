import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://edu-manage-server-swart.vercel.app",
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
