import React, { useState } from "react";
import Button from "./../Button/Button.tsx";
import SnackbarWrapper from "./snackbar.ts";
import DeleteModal from "../DeleteModal/DeleteModal.tsx";
import { handleCheckboxChange } from "../../utils/helper.ts";
import { ParagraphStyles } from "../../core/constants/components/text/textStyledComponents.ts";

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
          <Button icon="close" onClick={handleClose} ></Button>
          <ParagraphStyles>{employeeCount.toString()} employee selected</ParagraphStyles>
          <Button
            onClick={handleDelete}
            className="deleteBtn"
            icon="delete"
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
