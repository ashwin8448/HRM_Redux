import React, { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import EmployeeTable from "../EmployeeTable/EmployeeTable.tsx";
import EmployeeTableWithActionsWrapper from "./employeeTableWithActions.ts";
import SearchBar from "./../SearchAndFilter/components/SearchBar/SearchBar";
import PaginationResults from "../../../components/PaginationResults/PaginationResults.tsx"

function EmployeeTableWithActions() {

  const [deleteModal, setDeleteModal] = useState(false); // determines whether the modal is open or close

  const changeDltModalOpenStatus = () => {
    setDeleteModal(() => !deleteModal);
  };

  useEffect(() => {
    deleteModal
      ? (document.body.style.overflow = "hidden") // Disable scrolling
      : (document.body.style.overflow = "auto"); // Enable scrolling

    // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteModal]);

  return (
    <EmployeeTableWithActionsWrapper className="global-padding">
      <div className="border-top">
        <div className="common-flex global-padding">
          <SearchBar placeholder="Search by name" />
          <PaginationResults></PaginationResults>
        </div>
        <EmployeeTable
          deleteModal={deleteModal}
          changeDltModalOpenStatus={changeDltModalOpenStatus}
        />
        {deleteModal && (
          <div className="overlay" onClick={() => setDeleteModal(false)}></div>
        )}
      </div>
    </EmployeeTableWithActionsWrapper>
  );
}
export default EmployeeTableWithActions;
