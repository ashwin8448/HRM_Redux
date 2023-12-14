import React, { useState } from "react";
import Button from "../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../components/Button/buttonGrpWrapper.ts";
import EmployeeTableActionsWrapper from "./employeeTableActions.ts";
import DeleteModal from "../../../components/DeleteModal/DeleteModal.tsx";

function EmployeeTableActions({
  deleteCheckBoxesList,
  deleteModal,
  changeDltModalOpenStatus,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  deleteModal: boolean;
  changeDltModalOpenStatus: () => void;
}) {
  const [activeBtn, setActiveBtn] = useState("List");
  const handleButtonClick = (button: string) => {
    setActiveBtn(button);
  };

  return (
    <>
      <EmployeeTableActionsWrapper className="common-flex global-padding">
        <ButtonGrpWrapper className=" btn-grp-view">
          <Button
            icon="format_list_bulleted"
            className={activeBtn === "List" ? "active" : ""}
            onClick={() => handleButtonClick("List")}
            $noTransition={true}
          >
            List
          </Button>
          <Button
            icon="grid_on"
            className={activeBtn === "Grid" ? "active" : ""}
            onClick={() => handleButtonClick("Grid")}
            $noTransition={true}
          >
            Grid
          </Button>
        </ButtonGrpWrapper>
        <div className="common-flex delete-btn-grp">
          {deleteCheckBoxesList.checkedBoxesList.length.toString()} items
          selected{" "}
          <Button
            icon="delete"
            onClick={changeDltModalOpenStatus}
            className="delete-btn"
          >
            Delete
          </Button>{" "}
        </div>
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
