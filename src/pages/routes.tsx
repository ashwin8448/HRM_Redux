import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.tsx";
import Login from "./Login/Login.tsx";
import ProtectedRoute from "./Login/ProtectedRoute.tsx";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <ProtectedRoute element={<EmployeeListing />} />,
        },
        {
          path: "/",
          element: <EmployeeListing />,
        },
        {
          path: "/error?statusCode=:statusCode",
          element: <ErrorPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
      errorElement: <ErrorPage />,
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
