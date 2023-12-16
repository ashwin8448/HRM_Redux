import React, { useState } from "react";
import Button from "../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../components/Button/buttonGrpWrapper.ts";
import {
  EmployeeTableActionsWrapper,
  DeleteBtnWrapper,
} from "./employeeTableActions.ts";
import DeleteModal from "../../../components/DeleteModal/DeleteModal.tsx";

function EmployeeTableActions({
  deleteCheckBoxesList,
  deleteModal,
  changeDltModalOpenStatus,
  handleActiveListing,
  listingActive,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  deleteModal: boolean;
  changeDltModalOpenStatus: () => void;
  handleActiveListing: (button: string) => void;
  listingActive: string;
}) {
  return (
    <>
      <EmployeeTableActionsWrapper className="common-flex global-padding">
        <ButtonGrpWrapper className=" btn-grp-view">
          <Button
            icon="format_list_bulleted"
            className={listingActive === "List" ? "active" : ""}
            onClick={() => handleActiveListing("List")}
            $noTransition={true}
          >
            List
          </Button>
          <Button
            icon="grid_on"
            className={listingActive === "Grid" ? "active" : ""}
            onClick={() => handleActiveListing("Grid")}
            $noTransition={true}
          >
            Grid
          </Button>
        </ButtonGrpWrapper>
        <DeleteBtnWrapper
          className="common-flex"
          $disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
        >
          {deleteCheckBoxesList.checkedBoxesList.length > 0 && (
            <p className="message-text">
              {deleteCheckBoxesList.checkedBoxesList.length.toString()} items
              selected
            </p>
          )}
          <Button
            icon="delete"
            onClick={changeDltModalOpenStatus}
            className="delete-btn"
            disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
            $noTransition={deleteCheckBoxesList.checkedBoxesList.length == 0}
          >
            Delete
          </Button>{" "}
        </DeleteBtnWrapper>
      </EmployeeTableActionsWrapper>
      {deleteModal && (
        <div className="overlay" onClick={changeDltModalOpenStatus}></div>
      )}
      {deleteModal && (
        <DeleteModal
          changeDltModalOpenStatus={changeDltModalOpenStatus}
          idArrayToDlt={deleteCheckBoxesList.checkedBoxesList}
        />
      )}
    </>
  );
}
export default EmployeeTableActions;
