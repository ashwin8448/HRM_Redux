import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { ToastContainer, toast } from "react-toastify";
import {
  convertIGetEmployeeToIAppEmployee,
  getCookie,
} from "../utils/helper.ts";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import useAuth from "./Login/useAuth.ts";
import { useAppDispatch } from "../hooks/reduxHooks.ts";
import { getData } from "../core/api/functions.ts";
import { IAccessToken } from "../core/interfaces/interface.ts";
import { apiURL } from "../core/config/constants.ts";
import { setlogin } from "../core/store/actions.ts";
import Loader from "../components/Loader/Loader.tsx";

const Layout = () => {
  const { logout, setAuthLoading, authLoading } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authToken = getCookie("accessToken");
    if (authToken) {
      const decodedToken = jwtDecode(authToken); // jwt-decode npm package
      const currentTime = Math.floor(Date.now() / 1000);
      // Check token expiry
      if (decodedToken && decodedToken.exp! < currentTime) {
        logout();
      } else {
        const fetchCurrentUser = async (accessToken: string) => {
          setAuthLoading(true);
          try {
            const currentEmployeeId = (jwtDecode(accessToken) as IAccessToken)
              .username;
            const currentEmployee = (
              await getData(apiURL.employee + `/${currentEmployeeId}`)
            ).data.data;
            dispatch(
              setlogin(convertIGetEmployeeToIAppEmployee(currentEmployee))
            );
          } catch (error) {
            console.error(error);
            toast.error("An error occurred during sign in.", {
              toastId: "fetch-user-data-error",
            });
          } finally {
            setAuthLoading(false);
          }
        };
        fetchCurrentUser(authToken);
      }
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="main-section global-width global-padding">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={1}
          closeOnClick
          pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
        />
        {/* This element will render either 
                    <EmployeeListing /> when URL is '/'
                    <Form /> when URL is 'edit-employee' or 'add-employee'
                    <EmployeeView /> when URL is 'view-employee' 
                */}
        {authLoading ? (
          <div className="center-loader">
            <Loader />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
