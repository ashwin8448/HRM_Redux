import usePagination, { DOTS } from "./hook/usePagination.js";
import PaginationWrapper from "./pagination.js";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { updateSearchParams } from "../../../../../utils/helper.js";
import { defaultPageSize, recordsPerPage,totalPages } from "../../../../../core/config/constants.ts";
import { useAppSelector } from "../../../../../hooks/reduxHooks.ts";

function Pagination({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {

  // Employees count fetching
  const { count } = useAppSelector((state) => state.employeesData);
  const totalPageSize = totalPages(count);
  
  const [searchParams, setSearchParams] = useSearchParams();

  let currentPageNumber = Number(searchParams.get("page"));

  const paginationRange = usePagination({
    totalPageCount: totalPageSize,
    pageSize: recordsPerPage,
    siblingCount: 1,
    currentPage: currentPageNumber,
  });
  const checkPage = (newPage: number) => {
    return newPage > totalPageSize ? totalPageSize : newPage < 1 ? 1 : newPage;
  };
  const updateParams = (update: number, mode?: string) => {
    deleteCheckBoxesList.setCheckedBoxesList([]);
    currentPageNumber =
      mode === "step"
        ? checkPage(currentPageNumber + update)
        : checkPage(update);
    updateSearchParams(setSearchParams, searchParams, {
      page: String(currentPageNumber),
    });
  };
  useEffect(() => {
    if (!searchParams.get("page"))
      updateSearchParams(setSearchParams, searchParams, defaultPageSize);
  }, [searchParams]);

  return totalPageSize > 1 ? (
    <PaginationWrapper className="pagination-bar">
      <li
        className={`pagination-item ${currentPageNumber === 1 ? "disabled" : ""
          } `}
        onClick={() => {
          updateParams(-1, "step");
        }}
      >
        <span className="material-symbols-outlined arrow">chevron_left</span>
      </li>

      {paginationRange &&
        paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }
          return (
            <li
              className={`pagination-item ${pageNumber === currentPageNumber ? "selected" : ""
                } `}
              key={pageNumber}
              onClick={() => {
                updateParams(Number(pageNumber));
              }}
            >
              {pageNumber}
            </li>
          );
        })}

      <li
        className={`pagination-item ${currentPageNumber === totalPageSize ? "disabled" : ""
          } `}
        onClick={() => {
          updateParams(1, "step");
        }}
      >
        <span className="material-symbols-outlined arrow">chevron_right</span>
      </li>
    </PaginationWrapper>
  ) : null;
}

export default Pagination;
