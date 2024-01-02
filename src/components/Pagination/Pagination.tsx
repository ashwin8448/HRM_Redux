import usePagination, { DOTS } from "./hook/usePagination.ts";
import PaginationWrapper from "./pagination.ts";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { updateSearchParams } from "../../utils/helper.ts";

function Pagination({
  rowsPerPage,
  totalPages,
  deleteCheckBoxesList,
}: {
  rowsPerPage: number;
  totalPages: number;
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  let currentPageNumber = Number(searchParams.get("page"));

  const paginationRange = usePagination({
    totalPageCount: totalPages,
    pageSize: rowsPerPage,
    siblingCount: 1,
    currentPage: currentPageNumber,
  });
  const checkPage = (newPage: number) => {
    return newPage > totalPages ? totalPages : newPage < 1 ? 1 : newPage;
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
      updateSearchParams(setSearchParams, searchParams, {
        page: searchParams.get("page") || "1",
      });
  }, [searchParams]);

  return totalPages > 1 ? (
    <PaginationWrapper className="pagination-bar">
      <li
        className={`pagination-item ${
          currentPageNumber === 1 ? "disabled" : ""
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
              className={`pagination-item ${
                pageNumber === currentPageNumber ? "selected" : ""
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
        className={`pagination-item ${
          currentPageNumber === totalPages ? "disabled" : ""
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
