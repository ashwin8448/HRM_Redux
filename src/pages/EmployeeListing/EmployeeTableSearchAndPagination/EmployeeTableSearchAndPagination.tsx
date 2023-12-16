import React from "react";
import EmployeeTable from "../EmployeeTable/EmployeeTable.tsx";
import EmployeeTableSearchAndPaginationWrapper from "./employeeTableSearchAndPagination.ts";
import SearchBar from "../SearchAndFilter/components/SearchBar/SearchBar.tsx";
import PaginationResults from "../../../components/PaginationResults/PaginationResults.tsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../EmployeeTable/Pagination/Pagination.tsx";
import { IEmployee } from "../../../core/interfaces/interface.ts";

function EmployeeTableSearchAndPagination({
  deleteCheckBoxesList,
  employees,
  loading,
  updateSearchParams,
  totalPages
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees:IEmployee[];
  loading:boolean
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

  return (
    <EmployeeTableSearchAndPaginationWrapper>
      <div className="border">
        <div className="common-flex global-padding">
          <SearchBar placeholder="Search by name" />
          <PaginationResults updateSearchParams={updateSearchParams} totalPages={totalPages}></PaginationResults>
        </div>
        <EmployeeTable
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
        />
      </div>
    </EmployeeTableSearchAndPaginationWrapper>
  );
}
export default EmployeeTableSearchAndPagination;
