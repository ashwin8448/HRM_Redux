import React, { useState } from "react";
import Button from "../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../components/Button/buttonGrpWrapper.ts";
import EmployeeTableActionsWrapper from "./employeeTableActions.ts";

function EmployeeTableActions({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  const deleteCount = 2;

  const [activeBtn, setActiveBtn] = useState("List");
  const handleButtonClick = (button: string) => {
    setActiveBtn(button);
  };

  return (
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
        {deleteCheckBoxesList.checkedBoxesList.length.toString()} items selected{" "}
        <Button icon="delete" className="delete-btn">
          Delete
        </Button>{" "}
      </div>
    </EmployeeTableActionsWrapper>
  );
}
export default EmployeeTableActions;
