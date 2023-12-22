import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IData } from "../../core/interfaces/interface";
import useAuth from "./useAuth";
import { ToastContainer } from "react-toastify";
import { getCookie } from "../../utils/helper";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = getCookie("accessToken");
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
