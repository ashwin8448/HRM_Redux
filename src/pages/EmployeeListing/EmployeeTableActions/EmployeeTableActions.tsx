import React from "react";
import Button from "../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../components/Button/buttonGrpWrapper.ts";

function EmployeeTableActions() {
  const deleteCount = 2;

  return (
    <div className="border-top common-flex global-padding">
      <ButtonGrpWrapper className=" btn-grp-view">
        <Button icon="format_list_bulleted">List</Button>
        <Button icon="grid_on">Grid</Button>
      </ButtonGrpWrapper>
      <div className="common-flex delete-btn-grp">
        {deleteCount} items selected <Button icon="delete">Delete</Button>
      </div>
    </div>
  );
}
export default EmployeeTableActions;
