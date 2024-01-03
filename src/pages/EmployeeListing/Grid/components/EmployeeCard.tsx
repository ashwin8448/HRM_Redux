import { IAppEmployee } from "../../../../core/interfaces/interface.js";
import EmployeeCardWrapper from "./employeeCard.ts";
import { concatenateNames } from "../../../../utils/helper.js";
import ActiveDot from "../../../../components/ActiveDot/ActiveDot.tsx";
import Checkbox from "../../../../components/Checkbox/Checkbox.tsx";
import DetailsSection from "../../../../components/Details/Details.tsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DummyImg from "../../../../assets/userAvatar.svg";

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


  return (
    <EmployeeCardWrapper
      onClick={() => navigate(`/view-employee/${employee.id}`)}
    >
      <Checkbox
        employeeId={employee.id}
        deleteCheckBoxesList={deleteCheckBoxesList}
      />
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
        <div className="name-container">
          <DetailsSection
            title={concatenateNames(
              employee.firstName,
              employee.lastName ? employee.lastName : ""
            )}
            content={employee.designation ? employee.designation : "-"}
            newline
          />
          <ActiveDot isActive={employee.isActive}></ActiveDot>
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
