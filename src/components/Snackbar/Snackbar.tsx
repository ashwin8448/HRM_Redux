import React, { useState } from "react";
import Button from "./../Button/Button.tsx";
import SnackbarWrapper from "./snackbar.ts";
import DeleteModal from "../DeleteModal/DeleteModal.tsx";
import { handleCheckboxChange } from "../../utils/helper.ts";

const Snackbar = ({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) => {

  const employeeCount = deleteCheckBoxesList.checkedBoxesList.length;

  //delte modal open on click
  const [deleteModal, setDeleteModal] = useState(false); // determines whether the modal is open or close
  const changeDltModalOpenStatus = () => {
    setDeleteModal(
      () => deleteCheckBoxesList.checkedBoxesList.length !== 0 && !deleteModal
    );
  };

  const handleClose = () => {
    handleCheckboxChange({ deleteCheckBoxesList, employeesIdList: [] });
  };

  const handleDelete = () => {
    changeDltModalOpenStatus();
  };

  return (
    <>
      {employeeCount != 0 && (
        <SnackbarWrapper className="open">
          <Button icon="close" onClick={handleClose} $noTransition></Button>
          <p>{employeeCount.toString()} employee selected</p>
          <Button
            onClick={handleDelete}
            className="deleteBtn"
            icon="delete"
            $noTransition
          ></Button>
        </SnackbarWrapper>
      )}
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
};

export default Snackbar;
