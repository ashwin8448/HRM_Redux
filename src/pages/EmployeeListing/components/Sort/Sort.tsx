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
import useOutsideClick from "../../../../hooks/dropdownHook.ts";

function Sort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? defaultSortBy;
  const sortOrder = searchParams.get("sortDir") ?? defaultSortDir;

  //responsive
  const matches = useMediaQuery("(min-width: 768px)");

  const { loading } = useAppSelector((state) => state.employeesData);

  //sort dropdown open on click
  const [sortDropdown, setSortDropdown] = useState(false); // determines whether the modal is open or close
  const changeSortDropdownOpenStatus = () => {
    setSortDropdown(() => !sortDropdown);
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Set the type explicitly
  const closeSortDropdown = () => {
    setSortDropdown(false);
  };

  useOutsideClick(dropdownRef, closeSortDropdown);



  //sort by
  const [sortBySelection, setSortBySelection] = useState<string>(sortBy);
  const handleItemSelection = (criteria: string) => {
        
    updateSearchParams(setSearchParams, searchParams, {
      sortBy: criteria,
      sortDir: sortOrderSelection
    });
    setSortBySelection(criteria);
    changeSortDropdownOpenStatus();
  };

  //sort order
  // Function to convert URL parameter to SortDirection enum
  const getSortOrderFromParams = (order: string) => {
    return order === defaultSortDir ? SortDirection.ASC : SortDirection.DESC;
  };
  const [sortOrderSelection, setSortOrderSelection] = useState<SortDirection>(
    getSortOrderFromParams(sortOrder)
  );
  const handleOrderSelection = (order: SortDirection) => {
    updateSearchParams(setSearchParams, searchParams, {
      sortDir: order,
      sortBy: sortBySelection
    });
    setSortOrderSelection(order);
    changeSortDropdownOpenStatus();
  };

  useEffect(() => {
    setSortBySelection(sortBy);
    setSortOrderSelection(getSortOrderFromParams(sortOrder));
  }, [sortBy, sortOrder]);


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
