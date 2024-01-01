import {  createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeViewLayout from "./EmployeeView/EmployeeViewLayout.tsx";
import Form from "./EmployeeUpdate/Form.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.tsx";
import Login from "./Login/Login.tsx";
import SignUp from "./SignUp/SignUp.tsx";
import ProtectedRoute from "./Login/ProtectedRoute.tsx";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "view-employee/:employeeId",
          element: (
            <ProtectedRoute>
              <EmployeeViewLayout />
            </ProtectedRoute>
          ),
        },
        {
          path: "add-employee",
          element: (
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-employee/:employeeId",
          element: (
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          ),
        },
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <EmployeeListing />
            </ProtectedRoute>
          ),
        },
        {
          path: "/error?statusCode=:statusCode",
          element: <ErrorPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM_Redux/" }
);

export default router;
