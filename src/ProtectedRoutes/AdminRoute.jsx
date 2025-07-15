import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/authcontext/AuthContext";
import UseUserRole from "../hooks/UseUserRole";
import LoadingDashboard from "../components/shared/LoadingDashboard";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = UseUserRole();

  // if (loading || roleLoading) return <LoadingDashboard></LoadingDashboard>;
  if (loading || roleLoading) return <div>...loading</div>;

  if (!user || role !== "admin") {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }

  return children;
};

export default AdminRoute;
