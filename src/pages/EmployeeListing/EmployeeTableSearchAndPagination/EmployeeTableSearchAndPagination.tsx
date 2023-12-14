import React from "react";
import EmployeeTable from "../EmployeeTable/EmployeeTable.tsx";
import EmployeeTableSearchAndPaginationWrapper from "./employeeTableSearchAndPagination.ts";
import SearchBar from "../SearchAndFilter/components/SearchBar/SearchBar.tsx";
import PaginationResults from "../../../components/PaginationResults/PaginationResults.tsx";

function EmployeeTableSearchAndPagination({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  return (
    <EmployeeTableSearchAndPaginationWrapper>
      <div className="border">
        <div className="common-flex global-padding">
          <SearchBar placeholder="Search by name" />
          <PaginationResults></PaginationResults>
        </div>
        <EmployeeTable deleteCheckBoxesList={deleteCheckBoxesList} />
      </div>
    </EmployeeTableSearchAndPaginationWrapper>
  );
}
export default EmployeeTableSearchAndPagination;
