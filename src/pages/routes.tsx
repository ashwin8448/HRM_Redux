import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
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
