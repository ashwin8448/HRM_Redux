import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import EmployeeListing from "./EmployeeListing/EmployeeListing.tsx";
import EmployeeView from "./EmployeeView/EmployeeView.tsx";
import Form from "./EmployeeUpdate/Form.tsx";

const router = createBrowserRouter(
  [
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <EmployeeListing></EmployeeListing>,
        },
        {
          path: "view-employee/:employeeId",
          element: <EmployeeView />,
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
