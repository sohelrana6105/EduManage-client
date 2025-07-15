import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/authcontext/AuthContext";
import UseUserRole from "../hooks/UseUserRole";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = UseUserRole();

  if (loading || roleLoading)
    if (loading || roleLoading)
      //return <div className="text-center mt-10">Loading...</div>;

      return <div>...loading</div>;

  if (!user || role !== "teacher") {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }

  return children;
};

export default TeacherRoute;
