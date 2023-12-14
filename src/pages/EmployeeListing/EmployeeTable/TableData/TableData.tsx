import { IEmployee } from "../../../../core/interfaces/interface.ts";
import TableDataWrapper from "./tableData.ts";
import Button from "../../../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { concatenateNames } from "../../../../utils/helper.ts";
import StyledLink from "../../../../components/StyledLink.ts";
import Tooltip from "../../../../components/Tooltip/Tooltip.tsx";
import SkillsChip from "../../../../components/Skills/SkillsChip.tsx";
import Checkbox from "../../../../components/Checkbox/Checkbox.tsx";

function TableData({
  employee,
  index,
  deleteCheckBoxesList,
}: {
  employee: IEmployee;
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

  //tooltip on hovering skills
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  //check for skills overflowing the scroll width
  const [skillsOverflow, setSkillsOverflow] = useState(false);
  const handleSkillsOverflow = (isOverflow: boolean) => {
    setSkillsOverflow(isOverflow);
  };

  return (
    <TableDataWrapper
      key={employee.id}
      className={index % 2 !== 0 ? "alternate-table-row-color" : ""} // alternate colour for each row
    >
      <td className="employee-data">
        <Checkbox employeeId={employee.id} deleteCheckBoxesList={deleteCheckBoxesList}  />
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
        {employee.department?.department || "-"}
      </td>
      <td className="employee-data">{employee.role?.role || "-"}</td>
      <td
        className="employee-data"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {Array.isArray(employee.skills) && employee.skills.length > 0 ? (
          <>
            <SkillsChip
              className="overflow-ellipsis"
              skills={employee.skills}
              handleSkillsOverflow={handleSkillsOverflow}
            />
            {hover && skillsOverflow && <Tooltip message={employee.skills} />}
          </>
        ) : (
          "-"
        )}
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
