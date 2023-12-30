import { IAppEmployee } from "../../../../core/interfaces/interface.js";
import EmployeeCardWrapper from "./employeeCard.ts";
import { concatenateNames } from "../../../../utils/helper.js";
import ActiveChip from "../../../../components/ActiveChip/ActiveChip.tsx";
import Checkbox from "../../../../components/Checkbox/Checkbox.tsx";
import DetailsSection from "../../../../components/Details/Details.tsx";
import React from "react";
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
      <div className="actions-section common-flex">
        <Checkbox
          employeeId={employee.id}
          deleteCheckBoxesList={deleteCheckBoxesList}
        />
        <ActiveChip
          isActive={employee.isActive === "Yes" ? true : false}
        ></ActiveChip>
      </div>
      <div className="title-section">
        {
          <div className="photo-container">
            <img
              src={
                employee.photoId === "" || employee.photoId === undefined
                  ? DummyImg
                  : typeof employee.photoId === "string"
                  ? employee.photoId
                  : URL.createObjectURL(employee.photoId[0])
              }
              alt=""
              className="photo"
            />
          </div>
        }
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
