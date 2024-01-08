import React, { useEffect, useState, useRef } from "react";
import EmployeeCard from "../components/EmployeeCard.tsx";
import Loader from "../../../../components/Loader/loader.ts";
import {
  fetchEmployeesData,
  resetEmployeesGrid,
} from "../../../../core/store/actions.ts";
import EmployeeCardListWrapper from "./employeeCardList.ts";
import { useSearchParams } from "react-router-dom";
import { IAppEmployee } from "../../../../core/interfaces/interface.ts";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/reduxHooks.ts";
import {
  defaultSortBy,
  defaultSortDir,
  recordsPerPage,
  totalPages,
} from "../../../../core/config/constants.ts";
import { updateSearchParams } from "../../../../utils/helper.ts";
import { gridDisplay } from "./../../../../core/config/constants";

function EmployeeCardList({
  deleteCheckBoxesList,
  employees,
  loading,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IAppEmployee[];
  loading: boolean;
}) {
  // Employees count fetching
  const { count } = useAppSelector((state) => state.employeesData);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(0);

  const bottomObserver = useRef<IntersectionObserver | null>(null);
  const bottomElement = useRef<HTMLDivElement>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      // When user scrolls to the bottom, load more data
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page <= totalPages(count) || totalPages(count) === 0) {
      const offset = Math.max(0, (page - 1) * recordsPerPage);

      // Adding a delay of 500 milliseconds before dispatching the action
      const delay = 500;
      const timeoutId = setTimeout(() => {
        dispatch(
          fetchEmployeesData(
            {
              limit: recordsPerPage,
              offset,
              sortBy: searchParams.get("sortBy") || defaultSortBy,
              sortDir: searchParams.get("sortDir") || defaultSortDir,
              search: searchParams.get("search") || "",
              skillIds: searchParams.get("skillIds") || "",
            },
            gridDisplay
          )
        );
      }, delay);

      return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
    }
  }, [page]);

  useEffect(() => {
    bottomObserver.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });
    if (bottomElement.current) {
      bottomObserver.current.observe(bottomElement.current);
    }

    return () => {
      if (bottomObserver.current) {
        bottomObserver.current.disconnect();
      }
    };
  }, [searchParams]);

  useEffect(() => {
    updateSearchParams(setSearchParams, searchParams, { page: undefined });
  }, []);

  useEffect(() => {
    setPage(0);
    dispatch(resetEmployeesGrid());
  }, [searchParams]);

  return (
    <>
      <EmployeeCardListWrapper>
        {employees.length > 0 ? (
          employees.map(
            (employee: IAppEmployee) =>
              employee && (
                <EmployeeCard
                  key={employee.id}
                  deleteCheckBoxesList={deleteCheckBoxesList}
                  employee={employee}
                />
              )
          )
        ) : (
          <div className="common-flex">
            {!loading ? "No data available" : null}
          </div>
        )}
      </EmployeeCardListWrapper>
      {loading && (
        <div className="infinite-scroll-loader-div">
          <Loader className="infinite-scroll-loader common-flex" />
        </div>
      )}
      <div ref={bottomElement} style={{ height: "10px" }} />{" "}
      {/* This div is observed for intersection */}
    </>
  );
}

export default EmployeeCardList;
