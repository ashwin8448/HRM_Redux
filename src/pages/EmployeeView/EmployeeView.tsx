import { IAppEmployee } from "../../core/interfaces/interface";
import { getDateView, getWorkExp } from "../../utils/helper.ts";
import { FieldValues } from "react-hook-form";
import EmployeeViewWrapper from "./employeeView.ts";
import EmployeeDetailsSection from "./components/EmployeeDetailsSection/EmployeeDetailsSection.tsx";
import EmployeeIntroSection from "./components/EmployeeIntroSection/EmployeeIntroSection.tsx";

const EmployeeView = ({
  employee,
}: {
  employee: IAppEmployee | FieldValues;
}) => {
  return (
    <>
      <EmployeeViewWrapper className="employee-view-page">
        <EmployeeIntroSection employee={employee} />
        <EmployeeDetailsSection
          title="Personal Information"
          details={[
            {
              title: "First Name",
              content: employee.firstName ? employee.firstName : "-",
            },
            {
              title: "Last Name",
              content: employee.lastName ? employee.lastName : "-",
            },
            {
              title: "Phone Number",
              content: employee.phone ? employee.phone : "-",
            },
            {
              title: "Email",
              content: employee.email ? employee.email : "-",
            },
            {
              title: "Date of Birth",
              content: employee.dob ? getDateView(employee.dob) : "-",
            },
            {
              title: "Address",
              content: employee.address ? employee.address : "-",
            },
          ]}
        />
        <EmployeeDetailsSection
          title="Work Information"
          details={[
            {
              title: "Employee ID",
              content: employee.id ? employee.id.toString() : "-",
            },
            {
              title: "Date hired",
              content: employee.dateOfJoining
                ? getDateView(employee.dateOfJoining)
                : "-",
            },
            {
              title: "Work Experience",
              content: employee.dateOfJoining
                ? getWorkExp(employee.dateOfJoining)
                : "-",
            },
            {
              title: "Salary",
              content: employee.salary ? employee.salary : "-",
            },
            {
              title: "Department",
              content: employee.department
                ? employee.department.label
                  ? employee.department.label
                  : "-"
                : "",
            },
            {
              title: "Designation",
              content: employee.designation ? employee.designation : "-",
            },
            {
              title: "Skills",
              content: employee.skills ? employee.skills : "-",
            },
          ]}
        />
      </EmployeeViewWrapper>
    </>
  );
};

export default EmployeeView;
