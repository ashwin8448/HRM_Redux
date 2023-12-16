import { useSelector } from "react-redux";
import { IData, IEmployee } from "../../core/interfaces/interface.js";
import EmployeeCardWrapper from "./employeeCard.js";
import { concatenateNames } from "../../utils/helper.js";
import { useEffect, useState } from "react";
import ActiveChip from "../../components/ActiveChip/ActiveChip.tsx";
import Checkbox from "../../components/Checkbox/Checkbox.tsx";
import DetailsSection from "../../components/Details/Details.tsx";

function EmployeeCard({
  deleteCheckBoxesList,
  employee,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employee: IEmployee;
}) {
  const [photo, setPhoto] = useState({ loading: true, currentSrc: " " });

  const photoId = employee.moreDetails
    ? employee.moreDetails.photoId
      ? employee.moreDetails.photoId
      : null
    : null;

  useEffect(() => {
    {
      if (photoId) {
        const src = photoId;
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () =>
          // When image is loaded replace the image's src and set loading to false
          setPhoto({ currentSrc: src, loading: false });
      }
    }
  }, []);
  return (
    <EmployeeCardWrapper>
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
            <img
              src={photo.currentSrc}
              // style={{
              //   opacity: photo.loading ? 0.7 : 1,
              //   transition: "opacity .15s linear",
              // }}
              alt=""
              className="photo"
            />
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
