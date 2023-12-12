import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <EmployeeListing></EmployeeListing>,
        },
      ],
      errorElement: <></>,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
