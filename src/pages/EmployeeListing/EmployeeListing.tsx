import "react-toastify/dist/ReactToastify.css";
import EmployeeTable from "./List/EmployeeTable/EmployeeTable.tsx";
import { useEffect, useState } from "react";
import EmployeeCardList from "./Grid/EmployeeCardList/EmployeeCardList.tsx";
import { useSearchParams } from "react-router-dom";
import ListingActions from "./components/ListingActions/ListingActions.tsx";
import EmployeeListingWrapper from "./employeeListing.ts";
import { useAppSelector } from "../../hooks/reduxHooks.ts";
import Snackbar from "../../components/Snackbar/Snackbar.tsx";
import { updateSearchParams } from "../../utils/helper.ts";
import { TitleStyle } from "../../core/constants/components/text/textStyledComponents.ts";
import {
  defaultPageSize,
  gridDisplay,
  listDisplay,
} from "../../core/config/constants.ts";
import { Helmet } from "react-helmet";

function EmployeeListing() {
  // Employees data fetching
  const { employees, loading } = useAppSelector((state) => state.employeesData);

  //checkbox click action
  const [checkedBoxesList, setCheckedBoxesList] = useState<string[]>([]);
  const deleteCheckBoxesList = { checkedBoxesList, setCheckedBoxesList };

  //search params for display
  const [searchParams, setSearchParams] = useSearchParams();

  const displayValue = searchParams.get("display");

  let pageValue: string | undefined = undefined;

  if (displayValue === "List") {
    pageValue = searchParams.get("page") ?? defaultPageSize.page;
  }

  //toggle between list and grid
  const [listingActive, setListingActive] = useState(
    displayValue ?? listDisplay
  );
  const handleActiveListing = (buttonTxt: string) => {
    updateSearchParams(setSearchParams, searchParams, { display: buttonTxt });
    deleteCheckBoxesList.setCheckedBoxesList([]);
    setListingActive(buttonTxt);
  };

  useEffect(() => {
    updateSearchParams(setSearchParams, searchParams, {
      display: displayValue ?? listDisplay,
      page: pageValue,
    });
  }, [listingActive, displayValue, pageValue, searchParams, setSearchParams]);

  return (
    <>
      <Helmet>
        <title>Employee Listing</title>
        <meta
          name="description"
          content="You can view a list of employees either in table view or gallery view."
        />
      </Helmet>
      <EmployeeListingWrapper>
        <TitleStyle>Employee Management</TitleStyle>
        <ListingActions
          listingActive={listingActive}
          handleActiveListing={handleActiveListing}
          deleteCheckBoxesList={deleteCheckBoxesList}
        />
        <Snackbar deleteCheckBoxesList={deleteCheckBoxesList} />
        {listingActive == listDisplay && (
          <EmployeeTable
            deleteCheckBoxesList={deleteCheckBoxesList}
            employees={employees}
            loading={loading}
          />
        )}
        {listingActive == gridDisplay && (
          <EmployeeCardList
            deleteCheckBoxesList={deleteCheckBoxesList}
            employees={employees}
            loading={loading}
          />
        )}
      </EmployeeListingWrapper>
    </>
  );
}
export default EmployeeListing;
