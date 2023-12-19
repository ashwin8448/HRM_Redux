import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button.tsx";
import Checkbox from "../../components/Checkbox/Checkbox.tsx";
import Loader from "../../components/Loader/loader.ts";
import { IData, IEmployee } from "../../core/interfaces/interface";
import { fetchEmployeesData, resetEmployeesGrid } from "../../core/store/actions.ts";
import EmployeeCard from "../EmployeeCard/EmployeeCard.tsx";
import SearchBar from "../EmployeeListing/SearchAndFilter/components/SearchBar/SearchBar";
import EmployeeCardListWrapper from "./employeeCardList.ts";
import store from "../../core/store/configureStore.ts";
import { useSearchParams } from "react-router-dom";

function EmployeeCardList({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  // Select all
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const changeBtnText = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const cardsPerPage = 10;
  const { employees, count,loading } = useSelector(
    (state: IData) => state.employeesData
  );

  const [page, setPage] = useState<number>(0);

  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const bottomObserver = useRef<IntersectionObserver | null>(null);
  const bottomElement = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(count / cardsPerPage);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      // When user scrolls to the bottom, load more data
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    console.log(page)
    if (page <= totalPages) {
      setInfiniteLoading(true);

      // Adding a delay of 500 milliseconds before dispatching the action
      const delay = 500;
      const timeoutId = setTimeout(() => {
        store.dispatch(
          fetchEmployeesData({
            limit: cardsPerPage,
            offset: (page-1) * cardsPerPage,
            sortBy: "id",
            sortDir: "asc",
          },"Grid")
        );
      }, delay);

      return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
    }
    setInfiniteLoading(false);
  }, [page]);

  useEffect(() => {
    bottomObserver.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (bottomElement.current) {
      bottomObserver.current.observe(bottomElement.current);
    }

    return () => {
      if (bottomObserver.current) {
        bottomObserver.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    store.dispatch(resetEmployeesGrid());

  }, []); 

  return (
    <>
      <div className="common-flex global-padding">
        <SearchBar placeholder="Search by name" />
        <Button className="select-all" onClick={changeBtnText}>
          {selectAll ? "Select All" : "Unselect All"}
          <Checkbox
            deleteCheckBoxesList={deleteCheckBoxesList}
            employeesIdList={employees.map((employee) => employee.id)}
          />
        </Button>
      </div>
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
      {infiniteLoading && (
        <div className="infinite-scroll-loader-div">
          <Loader className="infinite-scroll-loader common-flex" />
        </div>
      )}
      <div ref={bottomElement} style={{ height: "100px" }} />{" "}
      {/* This div is observed for intersection */}
    </>
  );
}

export default EmployeeCardList;
