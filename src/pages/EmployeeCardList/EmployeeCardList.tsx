import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button.tsx";
import Checkbox from "../../components/Checkbox/Checkbox.tsx";
import Loader from "../../components/Loader/loader.ts";
import { IData, IEmployee } from "../../core/interfaces/interface";
import {
  fetchEmployeesData,
  resetEmployeesGrid,
} from "../../core/store/actions.ts";
import EmployeeCard from "../EmployeeCard/EmployeeCard.tsx";
import SearchBar from "../EmployeeListing/SearchAndFilter/components/SearchBar/SearchBar";
import EmployeeCardListWrapper from "./employeeCardList.ts";
import store from "../../core/store/configureStore.ts";
import { useSearchParams } from "react-router-dom";

function EmployeeCardList({
  deleteCheckBoxesList,
  employees,
  employeesCount,
  loading,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IEmployee[];
  employeesCount: number;
  loading: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    sortBy: "id",
    sortDir: "asc",
    search: "",
    skillIds: "",
  });

  const updateSearchParams = (params: {
    page?: string;
    sortBy?: string;
    sortDir?: string;
    search?: string;
    skillIds?: string;
  }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  const cardsPerPage = 10;

  const [page, setPage] = useState<number>(0);

  const bottomObserver = useRef<IntersectionObserver | null>(null);
  const bottomElement = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(employeesCount / cardsPerPage);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    console.log("intersecting")
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
    updateSearchParams({ page: "" });
    store.dispatch(resetEmployeesGrid());
  }, []);

  useEffect(() => {
    console.log("search parans changing")
    setPage(0);
    store.dispatch(resetEmployeesGrid());    
  }, [searchParams]);

  return (
    <>
      <EmployeeCardListWrapper>
        {employees.length > 0 ? (
          employees.map((employee: IEmployee) => (
            <EmployeeCard
              key={employee.id}
              deleteCheckBoxesList={deleteCheckBoxesList}
              employee={employee}
            />
          ))
        ) : (
          <div className="common-flex">No data Available</div>
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
