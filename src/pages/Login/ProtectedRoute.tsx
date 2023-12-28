import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IData } from "../../core/interfaces/interface";
import useAuth from "./useAuth";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../../utils/helper";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const user = useSelector((state: IData) => state.userData);

  return <>{user.isAuthenticated ? <Navigate to="/" /> : <Outlet />}</>;
};
export default ProtectedRoute;
