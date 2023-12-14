import Button from "../../../components/Button/Button.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import { resetFiltersAndSearchBar } from "../../../utils/helper.ts";
import { ITableProps } from "../../../core/interfaces/interface.ts";
import FilterSelectList from "./components/FilterSelect/FilterSelectList.tsx";
import ActionsWrapper from "./actionsBar.ts";
import React from "react";
import ButtonGrpWrapper from "../../../components/Button/buttonGrpWrapper.ts";

function ActionsBar() {
    //TODO: fetch table props
    const onReset = () => {
        const resettedVals: ITableProps = {
            ...resetFiltersAndSearchBar(), // reset the select dropdowns + search bar
            //TODO: maintain sort props as it is and change should reflect on the all other fields according to the value
        };
        //TODO: fire a change to the filter prop
    };

  return (
    <>
      <ActionsWrapper>
        <FilterSelectList />
        <div className="common-flex btn-grp">
          <Button icon="" className="filter-all-btn">
            Apply Filters
          </Button>
          <Button icon="" onClick={onReset}>
            Clear
          </Button>
        </div>
      </ActionsWrapper>
    </>
  );
}
export default ActionsBar;
