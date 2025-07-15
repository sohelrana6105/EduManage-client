import { useMutation } from "@tanstack/react-query";
import UseAxios from "./UseAxios";

const useJwtToken = () => {
  const axiosInstance = UseAxios();
  const { mutateAsync: getJwtToken } = useMutation({
    mutationFn: async (email) => {
      const res = await axiosInstance.post("/jwt", {
        email,
      });
      console.log("in the mutation hook res jwt", res);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      console.log(data);
    },
    onError: (err) => {
      console.error("JWT fetch failed", err);
    },
  });
  return getJwtToken;
};

export default useJwtToken;
