import { useSelector } from "react-redux";
import usePagination, { DOTS } from "../hook/usePagination.ts";
import PaginationWrapper from "./pagination.ts";
import { IData } from "../../../../core/interfaces/interface.ts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Pagination({
  rowsPerPage,
  updateSearchParams,
  totalPages
}: {
  rowsPerPage: number;
  updateSearchParams: ({
    page,
    sortBy,
    sortDir,
  }: {
    page?: string | undefined;
    sortBy?: string | undefined;
    sortDir?: string | undefined;
  }) => void;
  totalPages:number
}) {

  const [searchParams] = useSearchParams();
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
    currentPageNumber =
      mode === "step"
        ? checkPage(currentPageNumber + update)
        : checkPage(update);
    updateSearchParams({ page: String(currentPageNumber) });
  };
  useEffect(() => {
    if (!searchParams.get("page"))
      updateSearchParams({ page: searchParams.get("page") || "1" });
  }, []);

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
