import { IAppEmployee } from "../../../../../../core/interfaces/interface.ts";
import TableDataWrapper from "./tableData.ts";
import Button from "../../../../../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { concatenateNames } from "../../../../../../utils/helper.ts";
import StyledLink from "../../../../../../components/StyledLink.ts";
import SkillsChip from "../../../../../../components/Skills/SkillsChip.tsx";
import Checkbox from "../../../../../../components/Checkbox/Checkbox.tsx";
import React from "react";

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

  const handleEmployeeDetailsView = () => {
    navigate(`/view-employee/${employee.id}`);
  };

  return (
    <TableDataWrapper
      key={employee.id}
      className={index % 2 !== 0 ? "alternate-table-row-color" : ""} // alternate colour for each row
    >
      <td className="employee-data">
        <Checkbox
          employeeId={employee.id}
          deleteCheckBoxesList={deleteCheckBoxesList}
        />
      </td>

      <td className="employee-data">{employee.id}</td>
      {/* navigating to view employee page */}
      <td
        className="employee-data  employee-view"
        onClick={handleEmployeeDetailsView}
      >
        {employee.lastName
          ? concatenateNames(employee.firstName, employee.lastName)
          : employee.firstName}
      </td>
      <td className="employee-data">{employee.designation || "-"}</td>
      <td className="employee-data">
        {employee.department.label || "-"}
      </td>
      <td className="employee-data">{employee.role.label || "-"}</td>
      <td className="employee-data skills-data">
        <SkillsChip skills={employee.skills} />
      </td>
      <td className="employee-data">
        <div className=" actions-list common-flex">
          {/* navigating to edit employee page */}
          <StyledLink to={`/edit-employee?employeeId=${employee.id}`}>
            <Button icon="edit"></Button>
          </StyledLink>
        </div>
      </td>
    </TableDataWrapper>
  );
}

export default TableData;
