import { IAppEmployee } from "../../../../../core/interfaces/interface.ts";
import TableDataWrapper from "./tableData.ts";
import Button from "../../../../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { concatenateNames } from "../../../../../utils/helper.ts";
import Checkbox from "../../../../../components/Checkbox/Checkbox.tsx";
import React, { useState } from "react";
import { TableDataStyles } from "../../../../../core/constants/components/text/textStyledComponents.ts";
import useAuth from "../../../../Login/useAuth.ts";
import SkillsChip from "../../../../../components/Skills/SkillsChip.tsx";
import { ChipWrapper } from "../../../../../components/Skills/chip.ts";
import DeleteModal from "../../../../../components/DeleteModal/DeleteModal.tsx";

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

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteButtonClick = () => {
    setDeleteModal((prev) => !prev);
  };

  return (
    <>
      <TableDataWrapper
        key={employee.id}
        className={index % 2 !== 0 ? "alternate-table-row-color" : ""} // alternate colour for each row
        onClick={handleEmployeeDetailsView}
      >
        {user.employeeDetails?.accessControlRole === "admin" && (
          <TableDataStyles className="employee-data">
            <Checkbox
              employeeId={employee.id}
              deleteCheckBoxesList={deleteCheckBoxesList}
              disabled={employee.id === user.employeeDetails.id}
            />
          </TableDataStyles>
        )}

        <TableDataStyles className="employee-data">
          {employee.id}
        </TableDataStyles>
        {/* navigating to view employee page */}
        <TableDataStyles className="employee-data overflow-ellipsis">
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
        <TableDataStyles className="employee-data">
          <ChipWrapper
            $color={`${employee.isActive ? "GREEN_COLOR" : "RED_COLOR"}`}
            $backgroundColor={`${
              employee.isActive
                ? "GREEN_BACKGROUND_COLOR"
                : "RED_BACKGROUND_COLOR"
            }`}
          >
            {employee.isActive ? "Active" : "Inactive"}
          </ChipWrapper>
        </TableDataStyles>
        <TableDataStyles className="employee-data skills-data">
          <SkillsChip skills={employee.skills} />
        </TableDataStyles>
        {user.employeeDetails?.accessControlRole === "admin" && (
          <TableDataStyles className="employee-data">
            <div className=" actions-list common-flex">
              {/* navigating to edit employee page */}
              <Button
                icon="edit"
                onClick={(e) => {
                  e?.stopPropagation();
                  navigate(`/edit-employee/${employee.id}`);
                }}
              ></Button>
              <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  handleDeleteButtonClick();
                }}
                className="deleteBtn"
                icon="delete"
              ></Button>
            </div>
          </TableDataStyles>
        )}
      </TableDataWrapper>
      {deleteModal && (
        <>
          <div className="overlay" onClick={handleDeleteButtonClick}></div>
          <DeleteModal
            changeDeleteModalOpenStatus={handleDeleteButtonClick}
            employeesToDelete={[employee.id]}
          />
        </>
      )}
    </>
  );
}

export default TableData;
