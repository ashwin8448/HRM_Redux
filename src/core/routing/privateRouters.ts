import EmployeeViewLayout from "../../pages/EmployeeView/EmployeeViewLayout";
import Form from "../../pages/EmployeeUpdate/Form";
import EmployeeListing from "../../pages/EmployeeListing/EmployeeListing.tsx";

const privateRoute = [
  { path: "/view-employee/:id", element: EmployeeViewLayout },
  { path: "/edit-employee/:id", element: Form },
  { path: "/add-employee/", element: Form },
    { path: "/", element: EmployeeListing },
];

export default privateRoute;
