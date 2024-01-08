import { useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button/Button.tsx";
import {
  SortByDropdownItem,
  DropdownWrapper,
  SortOrderDropdownItemWrapper,
} from "./sort.ts";
import { SortDirection, defaultSortBy, defaultSortDir, sortOptions } from "../../../../core/config/constants.ts";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useAppSelector } from "../../../../hooks/reduxHooks.ts";
import { updateSearchParams } from "../../../../utils/helper.ts";
import { SpanStyles } from "../../../../core/constants/components/text/textStyledComponents.ts";

function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortDir");

  //responsive
  const matches = useMediaQuery("(min-width: 768px)");

  const { loading } = useAppSelector((state) => state.employeesData);

  //sort dropdown open on click
  const [sortDropdown, setSortDropdown] = useState(false); // determines whether the modal is open or close
  const changeSortDropdownOpenStatus = () => {
    setSortDropdown(() => !sortDropdown);
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Set the type explicitly
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setSortDropdown(false);
    }
  };


  //sort by
  const [sortBySelection, setSortBySelection] = useState<string>(
    sortBy ?? defaultSortBy
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

  useEffect(() => {
    setSortBySelection(sortBy ?? defaultSortBy);
    setSortOrderSelection(getSortOrderFromParams(sortOrder ?? "asc"));
  }, [sortBy, sortOrder]);

  // Update URL parameters when local state changes
  useEffect(() => {
    updateSearchParams(setSearchParams, searchParams, {
      sortBy: sortBySelection ?? defaultSortBy,
      sortDir: sortOrderSelection ?? defaultSortDir,
    });
  }, [sortBySelection, sortOrderSelection]);

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  return (
    <div className="dropdown-container" ref={dropdownRef}>
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
              <SpanStyles>{option.label}</SpanStyles>
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
            <span className="order common-flex">
              <span className="material-symbols-outlined">arrow_downward</span>
              <SpanStyles>Ascending</SpanStyles>
            </span>
            <span className="material-symbols-outlined sort-enable-icon">
              done
            </span>
          </SortOrderDropdownItemWrapper>
          <SortOrderDropdownItemWrapper
            className="common-flex"
            onClick={() => handleOrderSelection(SortDirection.DESC)}
            $sortOrderSelection={sortOrderSelection === SortDirection.DESC}
          >
            <span className="order common-flex">
              <span className="material-symbols-outlined">arrow_upward</span>
              <SpanStyles>Descending</SpanStyles>
            </span>
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
