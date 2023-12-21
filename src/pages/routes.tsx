import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.tsx";
import OnboardPage from "./Login/Login.tsx";

const router = createBrowserRouter
(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <OnboardPage />,
        },    
        {
          path: "/error?statusCode=:statusCode",
          element: <ErrorPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
