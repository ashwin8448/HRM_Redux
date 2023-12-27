import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IData } from "../../core/interfaces/interface";
import useAuth from "./useAuth";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../../utils/helper";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = getCookie("accessToken");
  const { logout } = useAuth();
  // const { token } = useSelector((state: IData) => state.userData);
  const currentTime = Math.floor(Date.now() / 1000);
console.log(typeof currentTime)
  const timeInterval = (token ? (Number(jwtDecode(token).exp) - currentTime) : 0);
  setTimeout(logout, 60000)
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        closeOnClick
        pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
      />
      {!token ? <Navigate to="/login" /> : element}
    </>
  );
};
export default ProtectedRoute;
