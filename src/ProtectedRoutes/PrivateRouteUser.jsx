import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/authcontext/AuthContext";

const PrivateRouteUser = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (!user) {
    // Not logged in → Redirect to login, and remember the current path
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRouteUser;
//Protect any route that should only be accessed by logged-in users, regardless of role.
