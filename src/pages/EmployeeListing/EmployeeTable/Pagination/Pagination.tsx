import { useSelector } from "react-redux";
import usePagination, { DOTS } from "../hook/usePagination.ts";
import PaginationWrapper from "./pagination.ts";
import { IData } from "../../../../core/interfaces/interface.ts";
import { useEffect, useState } from "react";

function Pagination({
  rowsPerPage,
  searchParams,
  updateSearchParams,
}: {
  rowsPerPage: number;
  searchParams: URLSearchParams;
  updateSearchParams: ({
    page,
    sortBy,
    sortDir,
  }: {
    page?: string | undefined;
    sortBy?: string | undefined;
    sortDir?: string | undefined;
  }) => void;
}) {
  const count = useSelector((state: IData) => state.employeesData.count);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => setTotalPages(Math.ceil(count / rowsPerPage)), [count]);
  let pageNumber = Number(searchParams.get("page"));

  const paginationRange = usePagination({
    totalPageCount: totalPages,
    pageSize: rowsPerPage,
    siblingCount: 1,
    currentPage: pageNumber,
  });

  const checkPage = (newPage: number) => {
    return newPage > totalPages ? totalPages : newPage < 1 ? 1 : newPage;
  };
  const updateParams = (update: number, mode?: string) => {
    pageNumber =
      mode === "step" ? checkPage(pageNumber + update) : checkPage(update);
    updateSearchParams({ page: String(pageNumber) });
  };
  useEffect(() => {
    if (!searchParams.get("page"))
      updateSearchParams({ page: searchParams.get("page") || "1" });
  }, []);

  return totalPages > 1 ? (
    <PaginationWrapper>
      <li
        className={`pagination-item ${pageNumber === 1 ? "disabled" : ""} `}
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
                pageNumber  ? "selected" : ""
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
          pageNumber === totalPages ? "disabled" : ""
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
