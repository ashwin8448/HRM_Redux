import { IReceivingEmployee } from "../../../../core/interfaces/interface.js";
import EmployeeCardWrapper from "./employeeCard.ts";
import { concatenateNames } from "../../../../utils/helper.js";
import ActiveChip from "../../../../components/ActiveChip/ActiveChip.tsx";
import Checkbox from "../../../../components/Checkbox/Checkbox.tsx";
import DetailsSection from "../../../../components/Details/Details.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeCard({
  deleteCheckBoxesList,
  employee,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employee: IReceivingEmployee;
}) {
  const navigate = useNavigate();
  const photoId = employee.moreDetails
    ? employee.moreDetails.photoId
      ? employee.moreDetails.photoId
      : null
    : null;

  return (
    <EmployeeCardWrapper
      onClick={() => navigate(`/view-employee/${employee.id}`)}
    >
      <div className="actions-section common-flex">
        <Checkbox
          employeeId={employee.id}
          deleteCheckBoxesList={deleteCheckBoxesList}
        />
        <ActiveChip isActive={employee.isActive ?? true}></ActiveChip>
      </div>
      <div className="title-section">
        {photoId ? (
          <div className="photo-container">
            <img src={photoId} alt="" className="photo" />
          </div>
        ) : (
          <div className="photo-container"></div>
        )}
        <DetailsSection
          title={concatenateNames(
            employee.firstName,
            employee.lastName ? employee.lastName : ""
          )}
          content={employee.designation ? employee.designation : "-"}
          newline
        />
      </div>
      <div className="details-section ">
        <div className="company-details common-flex">
          <DetailsSection
            title="Department"
            content={employee.department?.department.toString() ?? "-"}
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
