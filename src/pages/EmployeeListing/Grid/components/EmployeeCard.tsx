import { IAppEmployee } from "../../../../core/interfaces/interface.js";
import EmployeeCardWrapper from "./employeeCard.ts";
import ActiveDot from "../../../../components/ActiveDot/ActiveDot.tsx";
import Checkbox from "../../../../components/Checkbox/Checkbox.tsx";
import DetailsSection from "../../../../components/Details/Details.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import DummyImg from "../../../../assets/userAvatar.svg";
import Button from "../../../../components/Button/Button.tsx";
import {
  H3Styles,
  ParagraphStyles,
} from "../../../../core/constants/components/text/textStyledComponents.ts";
import TooltipComponent from "../../../../components/Tooltip/Tooltip.tsx";
import { useAppSelector } from "../../../../hooks/reduxHooks.ts";
import { AES } from "crypto-js";
import ProgressiveImg from "../../../../components/ProgressiveImg/ProgressiveImg.tsx";

function EmployeeCard({
  deleteCheckBoxesList,
  employee,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employee: IAppEmployee;
}) {
  const user = useAppSelector((state) => state.userData);
  const navigate = useNavigate();

  const encryptedId = AES.encrypt(
    `${employee.id}`,
    import.meta.env.VITE_ENCRYPTION_SECRET
  ).toString();

  const cardEditBtnClick = (
    e: React.MouseEvent<HTMLButtonElement> | undefined
  ) => {
    if (e) e.stopPropagation();
    navigate(`/edit-employee/${encodeURIComponent(encryptedId)}`);
  };

  return (
    <EmployeeCardWrapper
      onClick={() =>
        navigate(`/view-employee/${encodeURIComponent(encryptedId)}`)
      }
    >
      {user.employeeDetails?.accessControlRole === "admin" ||
      (user.employeeDetails?.accessControlRole === "user" &&
        user.employeeDetails.id === employee.id) ? (
        <div className="common-flex">
          <Checkbox
            employeeId={employee.id}
            deleteCheckBoxesList={deleteCheckBoxesList}
            disabled={employee.id === user.employeeDetails?.id}
          />
          {/* navigating to edit employee page */}
          <Button
            className="edit-btn"
            icon="edit"
            onClick={(e) => cardEditBtnClick(e)}
          ></Button>
        </div>
      ) : (
        <></>
      )}

      <div className="title-section">
        <div className="photo-container">
          <ProgressiveImg
            src={
              employee.photoId === "" || employee.photoId === undefined
                ? DummyImg
                : employee.photoId
            }
            alt="Employee image"
            className="photo"
          />
        </div>
        <div className="common-flex employee-intro">
          <div className="common-flex intro-title">
            <TooltipComponent
              title={employee.firstName + " " + employee.lastName}
            >
              <H3Styles className="title overflow-ellipsis">
                {employee.firstName + " " + employee.lastName}
              </H3Styles>
            </TooltipComponent>
            <ActiveDot isActive={employee.isActive}></ActiveDot>
          </div>
          <ParagraphStyles>{employee.role.label}</ParagraphStyles>
        </div>
      </div>
      <div className="details-section ">
        <div className="company-details common-flex">
          <DetailsSection
            title="Department"
            content={
              employee.department.label && employee.department.label != ""
                ? employee.department.label
                : "-"
            }
            newline
          />
          <DetailsSection
            title="Date of Joining"
            content={employee.dateOfJoining ?? "-"}
            newline
          />
        </div>
        <DetailsSection title="Skills" content={employee.skills ?? []} />
      </div>
    </EmployeeCardWrapper>
  );
}
export default EmployeeCard;
