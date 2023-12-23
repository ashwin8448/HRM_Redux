import TableDataWrapper from "./tableData.ts";
import Button from "../../../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledLink from "../../../../components/StyledLink.ts";
import Tooltip from "../../../../components/Tooltip/Tooltip.tsx";
import SkillsChip from "../../../../components/Skills/SkillsChip.tsx"

function TableData({
    employee,
    index,
    changeDltModalOpenStatus,
    idToDltProp,
}: {
    employee: IEmployee;
    index: number;
    changeDltModalOpenStatus: () => void;
    idToDltProp: {
        idToDlt: string;
        addIdToDlt: (idToDlt: string) => void;
    };
}) {
    const navigate = useNavigate();

    const handleEmployeeDetailsView = () => {
        navigate(`/view-employee/${employee.id}`);
    };

    const handleCancelBtn = () => {
        changeDltModalOpenStatus();
        idToDltProp.addIdToDlt(employee.id);//id is set to have the employee of that id to be deleted inside the delete modal
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
                {employee.id}
            </td>
            {/* navigating to view employee page */}
            <td
                className="employee-data  employee-view"
                onClick={handleEmployeeDetailsView}
            >
                {employee.lastName ? concatenateNames(employee.firstName, employee.lastName) : employee.firstName}
            </td>
            <td className="employee-data">{employee.designation || '-'}</td>
            <td className="employee-data">{employee.department?.department || '-'}</td>
            <td className="employee-data">{employee.role?.role || '-'}</td>
            <td className="employee-data" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {(Array.isArray(employee.skills) && employee.skills.length > 0) ? (
                    <>
                        <SkillsChip className="overflow-ellipsis" skills={employee.skills} handleSkillsOverflow={handleSkillsOverflow} />
                        {hover && skillsOverflow && <Tooltip message={employee.skills} />}
                    </>
                ) : (
                    '-'
                )}
            </td>
            <td className="employee-data">
                <div className=" actions-list common-flex">
                    {/* navigating to edit employee page */}
                    <StyledLink to={`/edit-employee?employeeId=${employee.id}`}>
                        <Button icon="edit"></Button>
                    </StyledLink>
                    {/* opens the modal on click */}
                    <Button icon="delete" onClick={handleCancelBtn}></Button>
                </div>
            </td>
        </TableDataWrapper>
    );
}

export default TableData;
