import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IData } from "../../core/interfaces/interface";
import useAuth from "./useAuth";


const ProtectedRoute = () => {
  const { user } = useAuth();

  return <>{user.isAuthenticated ? <Navigate to="/" /> : <Outlet />}</>;
};
export default ProtectedRoute;
