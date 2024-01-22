import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import Button from "../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../components/Button/buttonGrpWrapper.ts";
import DummyImg from "../../../../assets/userAvatar.svg";
import { useRef, useState } from "react";
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
import TooltipComponent from "../../../../components/Tooltip/Tooltip.tsx";
import { useAppSelector } from "../../../../hooks/reduxHooks.ts";
import { AES } from "crypto-js";
import ProgressiveImg from "../../../../components/ProgressiveImg/ProgressiveImg.tsx";
import useOverflowCheck from "../../../../hooks/overflowHook.ts";

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
  const user = useAppSelector((state) => state.userData);
  const { employeeId } = useParams();
  const handleDeleteButtonClick = () => {
    setDeleteModal((prev) => !prev);
  };

  const nameRef = useRef<HTMLDivElement | null>(null);
  const nameOverflow = useOverflowCheck(nameRef);

  const employeeName = <H2Styles className="overflow-ellipsis" ref={nameRef}>
    {employee.firstName + " " + employee.lastName}
  </H2Styles>;

  return (
    <>
      <EmployeeIntroSectionWrapper className="common-flex " $nameOverflow={nameOverflow}>
        <div className="photo-container">
          <ProgressiveImg
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
            className="photo"
          />
        </div>
        <div className="employee-intro">
          <div className="common-flex intro-title">
            {nameOverflow ?
              <TooltipComponent
                title={employee.firstName + " " + employee.lastName}
              >
                {employeeName}
              </TooltipComponent> : employeeName}
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
                onClick={() => {
                  const encryptedId = AES.encrypt(
                    `${employee.id}`,
                    import.meta.env.VITE_ENCRYPTION_SECRET
                  ).toString();
                  navigate(`/edit-employee/${encodeURIComponent(encryptedId)}`);
                }}
              >
                {(matchesWithMobile || matchesWithTab) && (
                  <>
                    {matchesWithMobile &&
                      `${user.employeeDetails?.isNew
                        ? "Complete Profile"
                        : "Edit Profile"
                      }`}
                    {matchesWithTab &&
                      `${user.employeeDetails?.isNew
                        ? "Complete Profile"
                        : "Edit Profile"
                      }`}
                  </>
                )}
              </Button>
              {user.employeeDetails?.id != employeeId && (
                <Button
                  className="delete-btn"
                  icon="delete"
                  onClick={() => handleDeleteButtonClick()}
                >
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
