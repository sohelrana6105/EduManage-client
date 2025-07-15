import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/authcontext/AuthContext";
import LoadingDashboard from "../components/shared/LoadingDashboard";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingDashboard></LoadingDashboard>;
    // return <div> ...loading</div>;
  }

  if (!user) {
    // Not logged in → Redirect to login, and remember the current path
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;
//Protect any route that should only be accessed by logged-in users, regardless of role.
