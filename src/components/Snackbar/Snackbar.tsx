import React, { useEffect, useRef, useState } from "react";
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

  const snackbarRef = useRef<HTMLDivElement | null>(null); // Set the type explicitly
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      snackbarRef.current &&
      !snackbarRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [employeeCount,snackbarRef]); // Empty dependency array ensures that the effect runs only once

  return (
    <>
      {employeeCount != 0 && (
        <SnackbarWrapper className="open" ref={snackbarRef}>
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
