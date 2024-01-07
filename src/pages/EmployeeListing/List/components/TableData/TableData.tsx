import { IAppEmployee } from "../../../../../core/interfaces/interface.ts";
import TableDataWrapper from "./tableData.ts";
import Button from "../../../../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { concatenateNames } from "../../../../../utils/helper.ts";
import SkillsChip from "../../../../../components/Skills/SkillsChip.tsx";
import Checkbox from "../../../../../components/Checkbox/Checkbox.tsx";
import React from "react";
import { TableDataStyles } from "../../../../../core/constants/components/text/textStyledComponents.ts";
import useAuth from "../../../../Login/useAuth.ts";

function TableData({
  employee,
  index,
  deleteCheckBoxesList,
}: {
  employee: IAppEmployee;
  index: number;
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleEmployeeDetailsView = () => {
    navigate(`/view-employee/${employee.id}`);
  };

  return (
    <TableDataWrapper
      key={employee.id}
      className={index % 2 !== 0 ? "alternate-table-row-color" : ""} // alternate colour for each row
    >
      {user.employeeDetails?.accessControlRole === "admin" && (
        <TableDataStyles className="employee-data">
          <Checkbox
            employeeId={employee.id}
            deleteCheckBoxesList={deleteCheckBoxesList}
          />
        </TableDataStyles>
      )}

      <TableDataStyles className="employee-data">{employee.id}</TableDataStyles>
      {/* navigating to view employee page */}
      <TableDataStyles
        className="employee-data  employee-view"
        onClick={handleEmployeeDetailsView}
      >
        {employee.lastName
          ? concatenateNames(employee.firstName, employee.lastName)
          : employee.firstName}
      </TableDataStyles>
      <TableDataStyles className="employee-data">
        {employee.designation || "-"}
      </TableDataStyles>
      <TableDataStyles className="employee-data">
        {employee.department.label || "-"}
      </TableDataStyles>
      <TableDataStyles className="employee-data">
        {employee.role.label || "-"}
      </TableDataStyles>
      <TableDataStyles className="employee-data skills-data">
        <SkillsChip skills={employee.skills} />
      </TableDataStyles>
      <TableDataStyles className="employee-data">
        <div className=" actions-list common-flex">
          {/* navigating to edit employee page */}
          <Button
            icon="edit"
            onClick={() => navigate(`/edit-employee/${employee.id}`)}
          ></Button>
        </div>
      </TableDataStyles>
    </TableDataWrapper>
  );
}

export default TableData;
