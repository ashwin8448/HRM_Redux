import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { fetchDropdownData } from "../core/store/actions.ts";
import useAuth from "../hooks/useAuth.ts";
import { useAppDispatch } from "../hooks/reduxHooks.ts";
import { useEffect } from "react";

function Layout() {
    const {isAuthenticated} = useAuth()
    const dispatch = useAppDispatch();
    useEffect(() => {
       if(isAuthenticated) dispatch(fetchDropdownData()) 
    },[isAuthenticated])
    return (
        <>
            <Header />
            <main className="main-section global-width global-padding">

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
