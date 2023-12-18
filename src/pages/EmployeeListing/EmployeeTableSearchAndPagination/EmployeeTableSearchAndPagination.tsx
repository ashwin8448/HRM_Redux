import React, { useEffect } from "react";
import EmployeeTable from "../EmployeeTable/EmployeeTable.tsx";
import EmployeeTableSearchAndPaginationWrapper from "./employeeTableSearchAndPagination.ts";
import SearchBar from "../SearchAndFilter/components/SearchBar/SearchBar.tsx";
import PaginationResults from "../../../components/PaginationResults/PaginationResults.tsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../EmployeeTable/Pagination/Pagination.tsx";
import { IData, IEmployee } from "../../../core/interfaces/interface.ts";
import { useSelector } from "react-redux";
import { fetchEmployeesData } from "../../../core/store/actions.ts";
import store from "../../../core/store/configureStore.ts";

function EmployeeTableSearchAndPagination({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  // Employees data fetching
  const employeesData = useSelector((state: IData) => state.employeesData);
  const employees: IEmployee[] = employeesData.employees;
  const loading: boolean = employeesData.loading;

  // Pagination
  const rowsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    sortBy: "id",
    sortDir: "asc",
  });

  const updateSearchParams = (params: {
    page?: string;
    sortBy?: string;
    sortDir?: string;
  }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  const employeesCount = useSelector(
    (state: IData) => state.employeesData.count
  );
  const totalPages = Math.ceil(employeesCount / rowsPerPage);

  useEffect(() => {
    store.dispatch(
      fetchEmployeesData({
        limit: rowsPerPage,
        offset: (Number(searchParams.get("page") || "1") - 1) * rowsPerPage,
        sortBy: searchParams.get("sortBy") || "id",
        sortDir: searchParams.get("sortDir") || "asc",
      })
    );
  }, [searchParams, rowsPerPage]);

  return (
    <>
      <EmployeeTableSearchAndPaginationWrapper>
        <div className="border">
          <div className="common-flex global-padding">
            <SearchBar placeholder="Search by name" />
            {/* <PaginationResults
              updateSearchParams={updateSearchParams}
              totalPages={totalPages}
            ></PaginationResults> */}
            Showing {rowsPerPage} of {employeesCount} results
          </div>
          <EmployeeTable
            deleteCheckBoxesList={deleteCheckBoxesList}
            employees={employees}
            loading={loading}
          />
        </div>
      </EmployeeTableSearchAndPaginationWrapper>
      <Pagination
        updateSearchParams={updateSearchParams}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
      />
    </>
  );
}
export default EmployeeTableSearchAndPagination;
