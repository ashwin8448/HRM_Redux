import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../../components/Button/Button.tsx";
import { DropdownWrapper } from "../../Sort/sort.ts";
import Checkbox from "../../../../../components/Checkbox/Checkbox.tsx";
import DeleteBtnWrapper from "./moreActions.ts";
import DeleteModal from "../../../../../components/DeleteModal/DeleteModal.tsx";
import { useAppSelector } from "../../../../../hooks/reduxHooks.ts";
import { ParagraphStyles } from "../../../../../core/constants/components/text/textStyledComponents.ts";
import TooltipComponent from "../../../../../components/Tooltip/Tooltip.tsx";

function MoreActions({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  //more actions dropdown open on click
  const [moreActionsDropdown, setMoreActionsDropdown] = useState(false); // determines whether the modal is open or close
  const changeMoreActionsDropdownOpenStatus = () => {
    setMoreActionsDropdown(() => !moreActionsDropdown);
  };
  const moreActionsRef = useRef<HTMLDivElement | null>(null); // Set the type explicitly
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      moreActionsRef.current &&
      !moreActionsRef.current.contains(event.target as Node)
    ) {
      setMoreActionsDropdown(false);
    }
  };

  const { employees, loading } = useAppSelector((state) => state.employeesData);

  const selectAll =
    deleteCheckBoxesList.checkedBoxesList.length == 0 ||
    deleteCheckBoxesList.checkedBoxesList.length !== employees.length;

  //delte modal open on click
  const [deleteModal, setDeleteModal] = useState(false); // determines whether the modal is open or close
  const changeDltModalOpenStatus = () => {
    setDeleteModal(
      () => deleteCheckBoxesList.checkedBoxesList.length !== 0 && !deleteModal
    );
  };
  const dltBtnClick = () => {
    changeDltModalOpenStatus();
    changeMoreActionsDropdownOpenStatus();
  };
  //body static on delete modal/side filter opening
  useEffect(() => {
    deleteModal
      ? (document.body.style.overflow = "hidden") // Disable scrolling
      : (document.body.style.overflow = "auto"); // Enable scrolling

    // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteModal]);

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  const deleteButton = (
    <DeleteBtnWrapper
      className="common-flex"
      $disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
    >
      <Button
        className="item"
        onClick={dltBtnClick}
        disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
        $noTransition
      >
        Delete
        {deleteCheckBoxesList.checkedBoxesList.length > 0 && (
          <ParagraphStyles>
            ({deleteCheckBoxesList.checkedBoxesList.length.toString()})
          </ParagraphStyles>
        )}
      </Button>
    </DeleteBtnWrapper>
  );

  return (
    <div className="dropdown-container" ref={moreActionsRef}>
      <Button
        className=""
        onClick={changeMoreActionsDropdownOpenStatus}
        icon="more_horiz"
        $noTransition
      ></Button>
      {!loading && moreActionsDropdown && (
        <DropdownWrapper>
          <Button className="select-all item" $noTransition>
            {selectAll ? "Select All" : "Unselect All"}
            <Checkbox
              deleteCheckBoxesList={deleteCheckBoxesList}
              employeesIdList={employees.map((employee) => employee.id)}
            />
          </Button>
          {deleteCheckBoxesList.checkedBoxesList.length == 0 ? (
            <TooltipComponent 
              title=" Do select the employees to delete the necessary ones"
            >
              {deleteButton}
            </TooltipComponent>
          ) : (
            deleteButton
          )}
        </DropdownWrapper>
      )}
      {deleteModal && <div className="overlay" onClick={dltBtnClick}></div>}
      {deleteModal && (
        <DeleteModal
          changeDltModalOpenStatus={dltBtnClick}
          idArrayToDlt={deleteCheckBoxesList.checkedBoxesList}
        />
      )}
    </div>
  );
}
export default MoreActions;
