import React, { useEffect, useState, useRef } from "react";
import { IReceivingEmployee } from "../../../../core/interfaces/interface";
import EmployeeCard from "../components/EmployeeCard.tsx";
import Loader from "../../../../components/Loader/loader.ts";
import {
  fetchEmployeesData,
  resetEmployeesGrid,
} from "../../../../core/store/actions.ts";
import EmployeeCardListWrapper from "./employeeCardList.ts";
import store from "../../../../core/store/configureStore.ts";
import { useSearchParams } from "react-router-dom";

function EmployeeCardList({
  deleteCheckBoxesList,
  employees,
  loading,
  cardsPerPage,
  totalPages,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IReceivingEmployee[];
  loading: boolean;
  cardsPerPage: number;
  totalPages: number;
}) {
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
    if (page <= totalPages) {
      const offset = Math.max(0, (page - 1) * cardsPerPage);

      // Adding a delay of 500 milliseconds before dispatching the action
      const delay = 500;
      const timeoutId = setTimeout(() => {
        store.dispatch(
          fetchEmployeesData(
            {
              limit: cardsPerPage,
              offset,
              sortBy: searchParams.get("sortBy") || "id",
              sortDir: searchParams.get("sortDir") || "asc",
              search: searchParams.get("search") || "",
              skillIds: searchParams.get("skillIds") || "",
            },
            "Grid"
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
    searchParams.delete("page");
    setSearchParams(() => searchParams)
    store.dispatch(resetEmployeesGrid());
  }, []);

  useEffect(() => {
    setPage(0);
    store.dispatch(resetEmployeesGrid());
  }, [searchParams]);

  return (
    <>
      <EmployeeCardListWrapper>
        {employees.length > 0 ? (
          employees.map((employee: IReceivingEmployee) => (
            <EmployeeCard
              key={employee.id}
              deleteCheckBoxesList={deleteCheckBoxesList}
              employee={employee}
            />
          ))
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
