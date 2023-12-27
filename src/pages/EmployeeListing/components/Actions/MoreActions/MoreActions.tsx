import React, { useEffect, useState } from "react";
import Button from "../../../../../components/Button/Button.tsx";
import { useSelector } from "react-redux";
import { IData } from "../../../../../core/interfaces/interface.ts";
import {
  SortByDropdownItem,
  DropdownWrapper,
  SortOrderDropdownItemWrapper,
} from "../../Sort/sort.ts";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import Checkbox from "../../../../../components/Checkbox/Checkbox.tsx";
import SelectAllWrapper from "./moreActions.ts";
import DeleteBtnWrapper from "./moreActions.ts";
import DeleteModal from "../../../../../components/DeleteModal/DeleteModal.tsx";
import Tooltip from "../../../../../components/Tooltip/Tooltip.tsx";

function MoreActions({
  deleteCheckBoxesList,
  handleActiveListing,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  handleActiveListing: (button: string) => void;
}) {
  //more actions dropdown open on click
  const [moreActionsDropdown, setMoreActionsDropdown] = useState(false); // determines whether the modal is open or close
  const changeMoreActionsDropdownOpenStatus = () => {
    setMoreActionsDropdown(() => !moreActionsDropdown);
  };

  const { employees, loading } = useSelector(
    (state: IData) => state.employeesData
  );

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

  return (
    <div className="dropdown-container">
      <Button
        className=""
        onClick={changeMoreActionsDropdownOpenStatus}
        icon="more_horiz"
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
          <DeleteBtnWrapper
            className="common-flex"
            $disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
          >
            <>
              <Button
                className="item"
                onClick={changeDltModalOpenStatus}
                disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
                $noTransition
              >
                Delete
                {deleteCheckBoxesList.checkedBoxesList.length > 0 && (
                  <p className="message-text">
                    ({deleteCheckBoxesList.checkedBoxesList.length.toString()})
                  </p>
                )}
              </Button>{" "}
              {deleteCheckBoxesList.checkedBoxesList.length == 0 && (
                <Tooltip
                  className="dlt-btn-tooltip"
                  message=" Do select the employees to delete the necessary ones"
                />
              )}
            </>
          </DeleteBtnWrapper>
        </DropdownWrapper>
      )}
      {deleteModal && (
        <div className="overlay" onClick={changeDltModalOpenStatus}></div>
      )}
      {deleteModal && (
        <DeleteModal
          changeDltModalOpenStatus={changeDltModalOpenStatus}
          idArrayToDlt={deleteCheckBoxesList.checkedBoxesList}
          handleActiveListing={handleActiveListing}
        />
      )}
    </div>
  );
}
export default MoreActions;
