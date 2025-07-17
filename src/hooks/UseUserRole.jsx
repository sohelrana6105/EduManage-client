import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UseaxiosSecure from "./UseaxiosSecure";
import { AuthContext } from "../context/authcontext/AuthContext";

const UseUserRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = UseaxiosSecure();
  // console.log(user);

  const {
    // data: role = "student",
    data: role = "student",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      // console.log(res);
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default UseUserRole;
