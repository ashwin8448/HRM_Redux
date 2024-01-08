import { toast } from "react-toastify";
import { deleteData } from "../../core/api/functions.ts";
import Button from "../Button/Button.tsx";
import ButtonGrpWrapper from "../Button/buttonGrpWrapper.ts";
import DeleteModalWrapper from "./../DeleteModal/deleteModal.ts";
import {
  DELETE_MODAL_HEADING,
  CONFIRM_DELETE_TEXT,
  WARNING_HEADING,
  WARNING_TEXT,
} from "./constants/constants.ts";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks.ts";
import { getUrlType, updateSearchParams } from "../../utils/helper.ts";
import {
  H2Styles,
  LabelStyles,
  ParagraphStyles,
} from "../../core/constants/components/text/textStyledComponents.ts";
import { listDisplay, defaultPageSize } from "../../core/config/constants.ts";

function DeleteModal({
  changeDeleteModalOpenStatus,
  employeesToDelete,
}: {
  changeDeleteModalOpenStatus: () => void;
  employeesToDelete: string[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmEmployeesDeletionLoader, setconfirmEmployeesDeletionLoader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const confirmEmployeesDeletion = async () => {
    setconfirmEmployeesDeletionLoader(true);
    try {
      // Use Promise.all to delete all employees concurrently
      await Promise.all(
        employeesToDelete.map(async (employeeId) => {
          const url = `/employee/${employeeId}`;
          await deleteData(url); // deleting employee in firebase
        })
      );

      if (getUrlType(location.pathname) === "view-employee") navigate("/");
      // All deletions successful, display toast with all IDs
      toast.success(
        `Deleted user${
          employeesToDelete.length > 1 ? "s" : ""
        } ${employeesToDelete.join(", ")}`,
        {
          toastId: "delete-toast-id",
        }
      );
    } catch (error) {
      // Error occurred during deletion
      toast.error("Error deleting users", { toastId: "delete-user" });
    } finally {
      setconfirmEmployeesDeletionLoader(false);
      const isdisplayList = searchParams.get("display") === listDisplay;
      if (isdisplayList) {
        updateSearchParams(setSearchParams, searchParams, defaultPageSize);
      }
    }
    changeDeleteModalOpenStatus();
  };

  const { employees } = useAppSelector((state) => state.employeesData);
  const employeesNameList = employees
    .filter((employee) => employeesToDelete.includes(employee.id))
    .map((employee) => employee.firstName);

  return (
    <DeleteModalWrapper>
      <Button
        icon="close"
        className="close-btn"
        onClick={changeDeleteModalOpenStatus}
      ></Button>
      <H2Styles className="delete-modal-heading">
        {DELETE_MODAL_HEADING}
      </H2Styles>
      <LabelStyles className="confirm-delete">
        {CONFIRM_DELETE_TEXT(employeesToDelete)}
      </LabelStyles>
      <ul className="employees-name-list">
        {employeesNameList.map((employeesName, index) => (
          <li key={index}>{employeesName}</li>
        ))}
      </ul>
      <div className="warning-container">
        <div className="warning-heading common-flex">
          <span className="material-icons-round">warning</span>
          <LabelStyles>{WARNING_HEADING}</LabelStyles>
        </div>
        <ParagraphStyles>{WARNING_TEXT}</ParagraphStyles>
      </div>
      <ButtonGrpWrapper className="btn-grp">
        <Button className="cancel-btn" onClick={changeDeleteModalOpenStatus}>
          No, Cancel
        </Button>
        <Button
          className="delete-btn"
          icon="delete"
          onClick={confirmEmployeesDeletion}
          loading={confirmEmployeesDeletionLoader}
        >
          Yes, confirm delete
        </Button>
      </ButtonGrpWrapper>
    </DeleteModalWrapper>
  );
}
export default DeleteModal;
