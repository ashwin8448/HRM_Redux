import React, { useEffect } from "react";
import EmployeeTable from "../EmployeeTable/EmployeeTable.tsx";
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
  employees,
  loading,
  employeesCount
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IEmployee[],
  loading: boolean,
  employeesCount: number
}) {

  // Pagination
  const rowsPerPage = 10;
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
    search?: "",
    skillIds?: "",
  }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  const totalPages = Math.ceil(employeesCount / rowsPerPage);

  useEffect(() => {
    store.dispatch(
      fetchEmployeesData({
        limit: rowsPerPage,
        offset: (Number(searchParams.get("page") || "1") - 1) * rowsPerPage,
        sortBy: searchParams.get("sortBy") || "id",
        sortDir: searchParams.get("sortDir") || "asc",
        search: searchParams.get("search") || "",
        skillIds: searchParams.get("skillIds") || "",
      }, "List")
    );
  }, [searchParams, rowsPerPage]);

  return (
    <>
      <EmployeeTable
        deleteCheckBoxesList={deleteCheckBoxesList}
        employees={employees}
        loading={loading}
      />
      <Pagination
        updateSearchParams={updateSearchParams}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
      />
    </>
  );
}
export default EmployeeTableSearchAndPagination;
