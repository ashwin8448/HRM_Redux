import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeTable from "./List/EmployeeTable/EmployeeTable.tsx";
import StyledLink from "../../components/StyledLink.ts";
import Button from "../../components/Button/Button.tsx";
import { useMediaQuery } from "usehooks-ts";
import ButtonGrpWrapper from "./../../components/Button/buttonGrpWrapper";
import { useEffect, useState } from "react";
import EmployeeCardList from "./Grid/EmployeeCardList/EmployeeCardList.tsx";
import { useSelector } from "react-redux";
import { IData } from "../../core/interfaces/interface.ts";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import Checkbox from "../../components/Checkbox/Checkbox.tsx";
import ActionsBar from "./List/components/SideFilterBar/ActionsBar.tsx";
import SideFilterBarWrapper from "./List/components/SideFilterBar/sideFilterBar.ts";
import TableActions from "./List/EmployeeTable/TableComponents/TableActions/TableActions.tsx";
import { useSearchParams } from "react-router-dom";

function EmployeeListing() {
  //responsive
  const matches = useMediaQuery("(min-width: 768px)");

  // Employees data fetching
  const { employees, loading, count } = useSelector(
    (state: IData) => state.employeesData
  );

  //Side Filter bar visible on click
  const [isSideFilterBarVisible, setSideFilterBarVisible] = useState(false);
  const handleButtonClick = () => {
    setSideFilterBarVisible(!isSideFilterBarVisible);
  };

  //checkbox click action
  const [checkedBoxesList, setCheckedBoxesList] = useState<string[]>([]);
  const deleteCheckBoxesList = { checkedBoxesList, setCheckedBoxesList };
  const selectAll =
    deleteCheckBoxesList.checkedBoxesList.length == 0 ||
    deleteCheckBoxesList.checkedBoxesList.length !== employees.length;

  //delte modal open on click
  const [deleteModal, setDeleteModal] = useState(false); // determines whether the modal is open or close
  const changeDltModalOpenStatus = () => {
    setDeleteModal(
      () => deleteCheckBoxesList.checkedBoxesList.length !== 0 && !deleteModal
    );
  };

  //search params for display
  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParams = (params: { display?: string }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  //toggle between list and grid
  const [listingActive, setListingActive] = useState(
    searchParams.get("display") || "List"
  );
  const handleActiveListing = (buttonTxt: string) => {
    updateSearchParams({ display: buttonTxt });
    deleteCheckBoxesList.setCheckedBoxesList([]);
    setListingActive(buttonTxt);
  };

  //pagination/infiinite loading
  const recordsPerPage = 10;
  const totalPages = Math.ceil(count / recordsPerPage);

  //body static on delete modal/side filter opening
  useEffect(() => {
    deleteModal || isSideFilterBarVisible
      ? (document.body.style.overflow = "hidden") // Disable scrolling
      : (document.body.style.overflow = "auto"); // Enable scrolling

    // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteModal, isSideFilterBarVisible]);

  useEffect(() => {
    updateSearchParams({ display: searchParams.get("display") || "List" });
  }, [listingActive]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        closeOnClick
        pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
      />
      <ButtonGrpWrapper>
        <Button icon="filter_list" onClick={handleButtonClick}>
          {matches ? "All filters" : ""}
        </Button>
        <StyledLink to="add-employee">
          <Button icon="add_circle">{matches ? "Add New Employee" : ""}</Button>
        </StyledLink>
      </ButtonGrpWrapper>
      {isSideFilterBarVisible && (
        <SideFilterBarWrapper
          className="translateX"
          $visible={isSideFilterBarVisible}
        >
          <div className="common-flex">
            <label className="page-title-mobile">Filters</label>
            <Button
              className="close-btn"
              icon="close"
              onClick={handleButtonClick}
            ></Button>
          </div>
          <ActionsBar onClick={handleButtonClick} />
        </SideFilterBarWrapper>
      )}
      {isSideFilterBarVisible && (
        <div
          className="overlay"
          onClick={() => setSideFilterBarVisible(false)}
        ></div>
      )}
      <TableActions
        listingActive={listingActive}
        handleActiveListing={handleActiveListing}
        deleteCheckBoxesList={deleteCheckBoxesList}
        deleteModal={deleteModal}
        changeDltModalOpenStatus={changeDltModalOpenStatus}
      />
      <div className="common-flex global-padding">
        <SearchBar />
        {!loading &&
          listingActive === "List" &&
          `Showing ${employees.length} of ${count} results`}
        {!loading && listingActive === "Grid" && (
          <Button className="select-all">
            {selectAll ? "Select All" : "Unselect All"}
            <Checkbox
              deleteCheckBoxesList={deleteCheckBoxesList}
              employeesIdList={employees.map((employee) => employee.id)}
            />
          </Button>
        )}
      </div>
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
    </>
  );
}
export default EmployeeListing;
