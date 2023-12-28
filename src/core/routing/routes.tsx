import { createBrowserRouter } from "react-router-dom";
import Layout from "../../pages/Layout.tsx";
import EmployeeViewLayout from "../../pages/EmployeeView/EmployeeViewLayout.tsx";
import Form from "../../pages/EmployeeUpdate/Form.tsx";
import { publicRoute } from "./publicRoutes.ts";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        ...publicRoute,
        {
          path: "edit-employee/:employeeId",
          element: <Form />,
        },
      ],
      errorElement: <></>,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM_Redux/" }
);

export default router;
