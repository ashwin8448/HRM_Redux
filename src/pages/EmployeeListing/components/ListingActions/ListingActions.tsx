import React from "react";
import Button from "../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../components/Button/buttonGrpWrapper.ts";
import ListingActionsWrapper from "./listingActions.ts";
import SearchBar from "../../../../components/SearchBar/SearchBar.tsx";
import Sort from "../Sort/Sort.tsx";
import Filter from "../Filter/Filter.tsx";
import StyledLink from "../../../../components/StyledLink.ts";
import MoreActions from "./MoreActions/MoreActions.tsx";

function ListingActions({
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
  return (
    <ListingActionsWrapper className="">
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
      <div className="common-flex main-actions">
        <div className="common-flex action-grp">
          <SearchBar />
          <Filter />
          <Sort />
        </div>
        <div className="common-flex action-grp">
          <MoreActions deleteCheckBoxesList={deleteCheckBoxesList} />
          <StyledLink to="add-employee">
            <Button icon="add" className="add-new-btn">New</Button>
          </StyledLink>
        </div>
      </div>
    </ListingActionsWrapper>
  );
}
export default ListingActions;
