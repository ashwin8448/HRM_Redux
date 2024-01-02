import { useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import Button from "../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../components/Button/buttonGrpWrapper.ts";
import DummyImg from "../../../../assets/userAvatar.svg";
import { useState } from "react";
import { IAppEmployee } from "../../../../core/interfaces/interface.ts";
import { FieldValues } from "react-hook-form";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal.tsx";
import EmployeeIntroSectionWrapper from "./employeeIntroSection.ts";
import { getUrlType } from "../../../../utils/helper.ts";
import {
  H2Styles,
  ParagraphStyles,
} from "../../../../core/constants/components/text/textStyledComponents.ts";

function EmployeeIntroSection({
  employee,
}: {
  employee: IAppEmployee | FieldValues;
}) {
  const matches = useMediaQuery("(min-width: 768px)");

  const navigate = useNavigate();
  const location = useLocation();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteButtonClick = () => {
    setDeleteModal((prev) => !prev);
  };

  return (
    <>
      <EmployeeIntroSectionWrapper className="common-flex ">
        <div className="photo-container">
          <img
            src={
              employee.photoId === "" ||
              employee.photoId === undefined ||
              (typeof employee.photoId === "object" && !employee.photoId.length)
                ? DummyImg
                : typeof employee.photoId === "string"
                ? employee.photoId
                : URL.createObjectURL(employee.photoId[0])
            }
            alt="Employee image"
            className=" photo"
          />
        </div>
        <div className="common-flex employee-intro">
          <H2Styles>{employee.firstName + " " + employee.lastName}</H2Styles>
          <ParagraphStyles>{employee.role.label}</ParagraphStyles>
        </div>
        {getUrlType(location.pathname) === "view-employee" && (
          <ButtonGrpWrapper className="btn-grp common-flex">
            <Button
              icon="edit"
              onClick={() => navigate(`/edit-employee/${employee!.id}`)}
            >
              {matches && "Edit Profile"}
            </Button>
            <Button icon="delete" onClick={() => handleDeleteButtonClick()}>
              {matches && "Delete Profile"}
            </Button>
          </ButtonGrpWrapper>
        )}
      </EmployeeIntroSectionWrapper>
      {deleteModal && (
        <>
          <div className="overlay" onClick={handleDeleteButtonClick}></div>
          <DeleteModal
            changeDltModalOpenStatus={handleDeleteButtonClick}
            idArrayToDlt={[employee.id]}
          />
        </>
      )}
    </>
  );
}

export default EmployeeIntroSection;
