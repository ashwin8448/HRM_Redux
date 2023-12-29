import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeViewLayout from "./EmployeeView/EmployeeViewLayout.tsx";
import Form from "./EmployeeUpdate/Form.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.tsx";
import Login from "./Login/Login.tsx";
import ProtectedRoute from "./Login/ProtectedRoute.tsx";

const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },

    {
      element: <Layout></Layout>,
      children: [
        {
          path: "view-employee/:employeeId",
          element: <EmployeeViewLayout />,
        },
        {
          path: "add-employee",
          element: <Form />,
        },
        {
          path: "edit-employee/:employeeId",
          element: <Form />,
        },
        {
          path: "/",
          element: <EmployeeListing />,
        },
        {
          path: "/error?statusCode=:statusCode",
          element: <ErrorPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM_Redux/" }
);

export default router;
