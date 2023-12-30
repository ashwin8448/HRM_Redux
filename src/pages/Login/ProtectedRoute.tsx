import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();

  return <>{user.isAuthenticated ? <Navigate to="/" /> : <Outlet />}</>;
};
export default ProtectedRoute;
