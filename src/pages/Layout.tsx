import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { ToastContainer } from "react-toastify";
import useAuth from "./Login/useAuth.ts";

function Layout() {
  const { user } = useAuth();
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

        {isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to={"/login"} replace={true} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
