import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeViewLayout from "./EmployeeView/EmployeeViewLayout.tsx";
import Form from "./EmployeeUpdate/Form.tsx";

const router = createBrowserRouter(
  [
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
      ],
      errorElement: <></>,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/HRM-App-React/" }
);

export default router;
