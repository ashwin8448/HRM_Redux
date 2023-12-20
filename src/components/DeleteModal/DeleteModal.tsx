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
import store from "../../core/store/configureStore.ts";
import { fetchEmployeesData } from "../../core/store/actions.ts";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function DeleteModal({
  changeDltModalOpenStatus,
  idArrayToDlt,
  handleActiveListing,
}: {
  changeDltModalOpenStatus: () => void;
  idArrayToDlt: string[];
  handleActiveListing: (button: string) => void;
}) {
  const rowsPerPage = 10;
  const [searchParams] = useSearchParams();
  const [confirmDeleteLoader, setConfirmDeleteLoader] = useState(false);

  const confirmDlt = async () => {
    setConfirmDeleteLoader(true);
    try {
      // Use Promise.all to delete all employees concurrently
      await Promise.all(
        idArrayToDlt.map(async (employeeId) => {
          const url = `/employee/${employeeId}`;
          await deleteData(url); // deleting employee in firebase
        })
      );

      // All deletions successful, display toast with all IDs
      toast.success(
        `Deleted user${idArrayToDlt.length > 1 ? "s" : ""} ${idArrayToDlt.join(
          ", "
        )}`,
        {
          toastId: "delete-toast-id",
        }
      );
    } catch (error) {
      // Error occurred during deletion
      toast.error("Error deleting users", { toastId: "delete-user" });
    } finally {
      setConfirmDeleteLoader(false);
      // Fetch employee data after all deletions
      store.dispatch(
        fetchEmployeesData(
          {
            limit: rowsPerPage,
            offset: 0,
            sortBy: searchParams.get("sortBy") || "id",
            sortDir: searchParams.get("sortDir") || "asc",
            search: searchParams.get("search") || "",
            skillIds: searchParams.get("skillIds") || "",
          },
          "List"
        )
      );
      handleActiveListing("List");
    }
    changeDltModalOpenStatus();
  };

  return (
    <DeleteModalWrapper>
      <Button
        icon="close"
        className="close-btn"
        onClick={changeDltModalOpenStatus}
      ></Button>
      <h2 className="delete-modal-heading">{DELETE_MODAL_HEADING}</h2>
      <p className="confirm-delete">{CONFIRM_DELETE_TEXT(idArrayToDlt)}</p>
      <div className="warning-container">
        <div className="warning-heading common-flex">
          <span className="material-icons-round">warning</span>
          <p className="title">{WARNING_HEADING}</p>
        </div>
        <p className="warning-text">{WARNING_TEXT}</p>
      </div>
      <ButtonGrpWrapper>
        <Button className="cancel-btn" onClick={changeDltModalOpenStatus}>
          No, Cancel
        </Button>
        <Button
          className="delete-btn"
          icon="delete"
          onClick={confirmDlt}
          loading={confirmDeleteLoader}
        >
          Yes, confirm delete
        </Button>
      </ButtonGrpWrapper>
    </DeleteModalWrapper>
  );
}
export default DeleteModal;
