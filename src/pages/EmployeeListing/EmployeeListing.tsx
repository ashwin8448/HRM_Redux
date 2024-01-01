import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeTable from "./List/EmployeeTable/EmployeeTable.tsx";
import { useEffect, useState } from "react";
import EmployeeCardList from "./Grid/EmployeeCardList/EmployeeCardList.tsx";
import { useSearchParams } from "react-router-dom";
import ListingActions from "./components/ListingActions/ListingActions.tsx";
import EmployeeListingWrapper from "./employeeListing.ts";
import { useAppSelector } from "../../hooks/reduxHooks.ts";
import Snackbar from "../../components/Snackbar/Snackbar.tsx";
import { useMediaQuery } from "usehooks-ts";
import { updateSearchParams } from "../../utils/helper.ts";

function EmployeeListing() {
  const matches = useMediaQuery("(min-width: 768px)");

  // Employees data fetching
  const { employees, loading, count } = useAppSelector(
    (state) => state.employeesData
  );

  //checkbox click action
  const [checkedBoxesList, setCheckedBoxesList] = useState<string[]>([]);
  const deleteCheckBoxesList = { checkedBoxesList, setCheckedBoxesList };

  //search params for display
  const [searchParams, setSearchParams] = useSearchParams();

  const displayValue = searchParams.get("display");

  //toggle between list and grid
  const [listingActive, setListingActive] = useState(displayValue ?? "List");
  const handleActiveListing = (buttonTxt: string) => {
    updateSearchParams(setSearchParams, searchParams,{ display: buttonTxt });
    deleteCheckBoxesList.setCheckedBoxesList([]);
    setListingActive(buttonTxt);
  };

  //pagination/infiinite loading
  const recordsPerPage = 10;
  const totalPages = Math.ceil(Number(count) / recordsPerPage);

  useEffect(() => {
    updateSearchParams(setSearchParams, searchParams, {
      display: displayValue ?? "List",
      page: "1",
    });
  }, [listingActive]);

  return (
    <EmployeeListingWrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        closeOnClick
        pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
      />
      <h1 className={matches ? `page-title` : `page-title-mobile`}>
        Employee Management
      </h1>
      <ListingActions
        listingActive={listingActive}
        handleActiveListing={handleActiveListing}
        deleteCheckBoxesList={deleteCheckBoxesList}
      />
      <Snackbar deleteCheckBoxesList={deleteCheckBoxesList} />
      {listingActive == "List" && (
        <EmployeeTable
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
          rowsPerPage={recordsPerPage}
          totalPages={totalPages}
        />
      )}
      {listingActive == "Grid" && (
        <EmployeeCardList
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
          cardsPerPage={recordsPerPage}
          totalPages={totalPages}
        />
      )}
    </EmployeeListingWrapper>
  );
}
export default EmployeeListing;
