import React from "react";
import Button from "../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../components/Button/buttonGrpWrapper.ts";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal.tsx";
import Tooltip from "../../../../components/Tooltip/Tooltip.tsx";
import { ActionsWrapper } from "./actions.ts";
import SearchBar from "../../../../components/SearchBar/SearchBar.tsx";
import Sort from "../Sort/Sort.tsx";
import Filter from "../Filter/Filter.tsx";
import StyledLink from "../../../../components/StyledLink.ts";
import { useMediaQuery } from "usehooks-ts";
import MoreActions from "./MoreActions/MoreActions.tsx";

function Actions({
  deleteCheckBoxesList,
  handleActiveListing,
  listingActive,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  handleActiveListing: (button: string) => void;
  listingActive: string;
}) {
  //responsive
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <ActionsWrapper className="common-flex">
      <ButtonGrpWrapper className=" btn-grp-view">
        <Button
          icon="format_list_bulleted"
          className={listingActive === "List" ? "active" : ""}
          onClick={() => handleActiveListing("List")}
          $noTransition={true}
        ></Button>
        <Button
          icon="grid_on"
          className={listingActive === "Grid" ? "active" : ""}
          onClick={() => handleActiveListing("Grid")}
          $noTransition={true}
        ></Button>
      </ButtonGrpWrapper>
      <div className="common-flex action-grp">
        <SearchBar />
        <Filter />
        <Sort />
      </div>
      <div className="common-flex action-grp">
        <MoreActions
          deleteCheckBoxesList={deleteCheckBoxesList}
          handleActiveListing={handleActiveListing}
        />
        <StyledLink to="add-employee">
          <Button icon="add_circle">{matches ? "Add New" : ""}</Button>
        </StyledLink>
      </div>
    </ActionsWrapper>
  );
}
export default Actions;
