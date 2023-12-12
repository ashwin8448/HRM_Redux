import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";
import EmployeeView from "./EmployeeView/EmployeeView.tsx";

const router = createBrowserRouter
(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <EmployeeListing></EmployeeListing>,
        },      {
          path: "view-employee/:employeeId",
          element: <EmployeeView />,
        }
      ],
      errorElement: <></>,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
