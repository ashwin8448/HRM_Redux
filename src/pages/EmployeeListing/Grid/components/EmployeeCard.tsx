import { IAppEmployee } from "../../../../core/interfaces/interface.js";
import EmployeeCardWrapper from "./employeeCard.ts";
import ActiveDot from "../../../../components/ActiveDot/ActiveDot.tsx";
import Checkbox from "../../../../components/Checkbox/Checkbox.tsx";
import DetailsSection from "../../../../components/Details/Details.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import DummyImg from "../../../../assets/userAvatar.svg";
import Button from "../../../../components/Button/Button.tsx";
import { H3Styles, ParagraphStyles } from "../../../../core/constants/components/text/textStyledComponents.ts";

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
  const navigate = useNavigate();

  const cardEditBtnClick = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    if (e)
      e.stopPropagation();
    navigate(`/edit-employee/${employee.id}`);
  }

  return (
    <EmployeeCardWrapper
      onClick={() => navigate(`/view-employee/${employee.id}`)}
    >
      <div className="common-flex">
        <Checkbox
          employeeId={employee.id}
          deleteCheckBoxesList={deleteCheckBoxesList}
        />
        {/* navigating to edit employee page */}
        <Button icon="edit" onClick={(e) => cardEditBtnClick(e)}
        ></Button>
      </div>
      <div className="title-section">
        <div className="photo-container">
          <img
            src={
              employee.photoId === "" || employee.photoId === undefined
                ? DummyImg
                : employee.photoId
            }
            alt=""
            className="photo"
          />
        </div>
        <div className="common-flex employee-intro">
          <div className="common-flex intro-title">
            <H3Styles className="title">{employee.firstName + " " + employee.lastName}</H3Styles>
            <ActiveDot isActive={employee.isActive}></ActiveDot>
          </div>
          <ParagraphStyles>{employee.role.label}</ParagraphStyles>
        </div>
      </div>
      <div className="details-section ">
        <div className="company-details common-flex">
          <DetailsSection
            title="Department"
            content={employee.department.label ?? "-"}
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
