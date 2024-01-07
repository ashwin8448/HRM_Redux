import React from "react";
import Button from "../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../components/Button/buttonGrpWrapper.ts";
import ListingActionsWrapper from "./listingActions.ts";
import SearchBar from "../../../../components/SearchBar/SearchBar.tsx";
import Sort from "../Sort/Sort.tsx";
import Filter from "../Filter/Filter.tsx";
import MoreActions from "./MoreActions/MoreActions.tsx";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <ListingActionsWrapper>
      <ButtonGrpWrapper className=" btn-grp-view">
        <Button
          icon="format_list_bulleted"
          className={listingActive === "List" ? "active" : ""}
          onClick={() => handleActiveListing("List")}
        ></Button>
        <Button
          icon="grid_on"
          className={listingActive === "Grid" ? "active" : ""}
          onClick={() => handleActiveListing("Grid")}
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
          <Button
            icon="add"
            className="invert-style"
            onClick={() => navigate("add-employee")}
          >
            New
          </Button>
        </div>
      </div>
    </ListingActionsWrapper>
  );
}
export default ListingActions;
