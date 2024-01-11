import React from "react";
import Button from "../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../components/Button/buttonGrpWrapper.ts";
import ListingActionsWrapper from "./listingActions.ts";
import SearchBar from "../../../../components/SearchBar/SearchBar.tsx";
import Sort from "../Sort/Sort.tsx";
import Filter from "../Filter/Filter.tsx";
import MoreActions from "./MoreActions/MoreActions.tsx";
import { useNavigate } from "react-router-dom";
import { gridDisplay, listDisplay } from "../../../../core/config/constants.ts";
import { useAppSelector } from "../../../../hooks/reduxHooks.ts";

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
  const user = useAppSelector((state) => state.userData);

  return (
    <ListingActionsWrapper>
      <ButtonGrpWrapper className=" btn-grp-view">
        <Button
          icon="format_list_bulleted"
          className={listingActive === listDisplay ? "active" : ""}
          onClick={() => handleActiveListing(listDisplay)}
        ></Button>
        <Button
          icon="grid_on"
          className={listingActive === gridDisplay ? "active" : ""}
          onClick={() => handleActiveListing(gridDisplay)}
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
          {user.employeeDetails?.accessControlRole === "admin" && (
            <Button
              icon="add"
              className="invert-style"
              onClick={() => navigate("add-employee")}
            >
              New
            </Button>
          )}
        </div>
      </div>
    </ListingActionsWrapper>
  );
}
export default ListingActions;
