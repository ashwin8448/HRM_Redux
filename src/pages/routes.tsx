import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeViewLayout from "./EmployeeView/EmployeeViewLayout.tsx";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "view-employee/:employeeId",
          element: <EmployeeViewLayout />,
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM_Redux/" }
);

export default router;
