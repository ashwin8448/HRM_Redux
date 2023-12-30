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

function EmployeeListing() {
  // Employees data fetching
  const { employees, loading, count } = useAppSelector(
    (state) => state.employeesData
  );

  //checkbox click action
  const [checkedBoxesList, setCheckedBoxesList] = useState<string[]>([]);
  const deleteCheckBoxesList = { checkedBoxesList, setCheckedBoxesList };

  //search params for display
  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParams = (params: { display?: string }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };
  const displayValue = searchParams.get("display");

  //toggle between list and grid
  const [listingActive, setListingActive] = useState(displayValue ?? "List");
  const handleActiveListing = (buttonTxt: string) => {
    updateSearchParams({ display: buttonTxt });
    deleteCheckBoxesList.setCheckedBoxesList([]);
    setListingActive(buttonTxt);
  };

  //pagination/infiinite loading
  const recordsPerPage = 10;
  const totalPages = Math.ceil(Number(count) / recordsPerPage);

  useEffect(() => {
    updateSearchParams({ display: displayValue ?? "List" });
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
      <ListingActions
        listingActive={listingActive}
        handleActiveListing={handleActiveListing}
        deleteCheckBoxesList={deleteCheckBoxesList}
      />
      <Snackbar deleteCheckBoxesList={deleteCheckBoxesList} />
      {listingActive == "List" ? (
        <EmployeeTable
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
          rowsPerPage={recordsPerPage}
          totalPages={totalPages}
        />
      ) : (
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
