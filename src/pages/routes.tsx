import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeViewLayout from "./EmployeeView/EmployeeViewLayout.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.tsx";
import Login from "./Login/Login.tsx";
import ProtectedRoute from "./Login/ProtectedRoute.tsx";
import AddEmployeeForm from "./AddEmployee/AddEmployeeForm.tsx";
import EditEmployeeForm from "./EmployeeUpdate/EditEmployeeForm.tsx";

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
          path: "view-employee/:employeeId",
          element: (
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <EmployeeViewLayout />
            </ProtectedRoute>
          ),
        },
        {
          path: "add-employee",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddEmployeeForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-employee/:employeeId",
          element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditEmployeeForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "/",
          element: (
            <ProtectedRoute allowedRoles={["admin", "user"]}>
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
  { basename: "/" }
);

export default router;
