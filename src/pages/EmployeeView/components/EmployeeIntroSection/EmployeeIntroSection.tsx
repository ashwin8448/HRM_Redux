import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
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
import ActiveDot from "../../../../components/ActiveDot/ActiveDot.tsx";
import useAuth from "../../../Login/useAuth.ts";
import TooltipComponent from "../../../../components/Tooltip/Tooltip.tsx";

function EmployeeIntroSection({
  employee,
}: {
  employee: IAppEmployee | FieldValues;
}) {
  const matchesWithTab = useMediaQuery("(min-width: 768px)");
  const matchesWithMobile = useMediaQuery("(max-width: 480px)");

  const navigate = useNavigate();
  const location = useLocation();
  const [deleteModal, setDeleteModal] = useState(false);
  const { user } = useAuth();
  const { employeeId } = useParams();
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
        <div className="employee-intro">
          <div className="common-flex intro-title">
            <TooltipComponent
              title={employee.firstName + " " + employee.lastName}
            >
              <H2Styles className="overflow-ellipsis">
                {employee.firstName + " " + employee.lastName}
              </H2Styles>
            </TooltipComponent>
            <ActiveDot isActive={employee.isActive}></ActiveDot>
          </div>
          <ParagraphStyles>
            {employee.role ? employee.role.label : "-"}
          </ParagraphStyles>
        </div>

        {getUrlType(location.pathname) === "view-employee" &&
          (user.employeeDetails?.accessControlRole === "admin" ||
            user.employeeDetails?.id === employeeId) && (
            <ButtonGrpWrapper className="btn-grp common-flex">
              <Button
                icon="edit"
                onClick={() => navigate(`/edit-employee/${employee!.id}`)}
              >
                {(matchesWithMobile || matchesWithTab) && (
                  <>
                    {matchesWithMobile &&
                      `${
                        user.employeeDetails?.isNew
                          ? "Complete Profile"
                          : "Edit Profile"
                      }`}
                    {matchesWithTab &&
                      `${
                        user.employeeDetails?.isNew
                          ? "Complete Profile"
                          : "Edit Profile"
                      }`}
                  </>
                )}
              </Button>
              {user.employeeDetails?.id != employeeId && (
              <Button className="delete-btn" icon="delete" onClick={() => handleDeleteButtonClick()}>
                  {(matchesWithMobile || matchesWithTab) && (
                    <>
                      {matchesWithMobile && "Delete Profile"}
                      {matchesWithTab && "Delete Profile"}
                    </>
                  )}
                </Button>
              )}
            </ButtonGrpWrapper>
          )}
      </EmployeeIntroSectionWrapper>
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

export default EmployeeIntroSection;
