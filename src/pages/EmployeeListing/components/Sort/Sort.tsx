import { useSelector } from "react-redux";
import { IData } from "../../../../core/interfaces/interface.ts";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button.tsx";
import {
  SortByDropdownItem,
  DropdownWrapper,
  SortOrderDropdownItemWrapper,
} from "./sort.ts";
import { SortDirection } from "../../../../core/config/constants.ts";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortDir");

  //responsive
  const matches = useMediaQuery("(min-width: 768px)");

  const { loading } = useSelector((state: IData) => state.employeesData);

  //sort dropdown open on click
  const [sortDropdown, setSortDropdown] = useState(false); // determines whether the modal is open or close
  const changeSortDropdownOpenStatus = () => {
    setSortDropdown(() => !sortDropdown);
  };

  const sortOptions = [
    { criteria: "id", label: "Id" },
    { criteria: "firstName", label: "Name" },
    { criteria: "department.id", label: "Department" },
    { criteria: "designation", label: "Designation" },
    { criteria: "role.id", label: "Role" },
  ];

  //sort by
  const [sortBySelection, setSortBySelection] = useState<string>(
    sortBy ?? "id"
  );
  const handleItemSelection = (criteria: string) => {
    setSortBySelection(criteria);
    changeSortDropdownOpenStatus();
  };

  //sort order
  // Function to convert URL parameter to SortDirection enum
  const getSortOrderFromParams = (order: string) => {
    return order === "desc" ? SortDirection.DESC : SortDirection.ASC;
  };
  const [sortOrderSelection, setSortOrderSelection] = useState<SortDirection>(
    getSortOrderFromParams(sortOrder ?? "asc")
  );
  const handleOrderSelection = (order: SortDirection) => {
    setSortOrderSelection(order);
    changeSortDropdownOpenStatus();
  };

  // Update URL parameters when local state changes
  const updateSearchParams = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortBy: sortBySelection ?? "id",
      sortDir: sortOrderSelection ?? "asc",
    });
  };

  useEffect(() => {
    setSortBySelection(sortBy ?? "id");
    setSortOrderSelection(getSortOrderFromParams(sortOrder ?? "asc"));
  }, [sortBy, sortOrder]);

  // Update URL parameters when local state changes
  useEffect(() => {
    updateSearchParams();
  }, [sortBySelection, sortOrderSelection]);

  return (
    <div className="dropdown-container">
      <Button onClick={changeSortDropdownOpenStatus} icon="swap_vert">
        {matches && "Sort By"}
      </Button>
      {!loading && sortDropdown && (
        <DropdownWrapper>
          {sortOptions.map((option) => (
            <SortByDropdownItem
              key={option.criteria}
              className="item common-flex"
              onClick={() => handleItemSelection(option.criteria)}
              $sortBySelection={sortBySelection === option.criteria}
            >
              {option.label}
              <span className="material-symbols-outlined sort-enable-icon">
                done
              </span>
            </SortByDropdownItem>
          ))}
          <hr />
          <SortOrderDropdownItemWrapper
            className="common-flex"
            onClick={() => handleOrderSelection(SortDirection.ASC)}
            $sortOrderSelection={sortOrderSelection === SortDirection.ASC}
          >
            Ascending
            <span className="material-symbols-outlined">arrow_downward</span>
            <span className="material-symbols-outlined sort-enable-icon">
              done
            </span>
          </SortOrderDropdownItemWrapper>
          <SortOrderDropdownItemWrapper
            className="common-flex"
            onClick={() => handleOrderSelection(SortDirection.DESC)}
            $sortOrderSelection={sortOrderSelection === SortDirection.DESC}
          >
            Descending
            <span className="material-symbols-outlined">arrow_upward</span>
            <span className="material-symbols-outlined sort-enable-icon">
              done
            </span>
          </SortOrderDropdownItemWrapper>
        </DropdownWrapper>
      )}
    </div>
  );
}
export default Sort;
