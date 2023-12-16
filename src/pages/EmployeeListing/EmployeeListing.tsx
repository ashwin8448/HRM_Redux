import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeTableSearchAndPagination from "./EmployeeTableSearchAndPagination/EmployeeTableSearchAndPagination.tsx";
import StyledLink from "../../components/StyledLink.ts";
import Button from "../../components/Button/Button.tsx";
import { useMediaQuery } from "usehooks-ts";
import ButtonGrpWrapper from "./../../components/Button/buttonGrpWrapper";
import EmployeeTableActions from "./EmployeeTableActions/EmployeeTableActions.tsx";
import { useEffect, useState } from "react";
import SideFilterBar from "./SideFilterBar/SideFilterBar.tsx";
import EmployeeCardList from "../EmployeeCardList/EmployeeCardList.tsx";
import Pagination from "./EmployeeTable/Pagination/Pagination.tsx";
import { useSearchParams } from "react-router-dom";
import { fetchEmployeesData } from "../../core/store/actions.ts";
import store from "../../core/store/configureStore.ts";
import { useSelector } from "react-redux";
import { IData, IEmployee } from "../../core/interfaces/interface.ts";

function EmployeeListing() {
  const matches = useMediaQuery("(min-width: 768px)");
  const [isSideFilterBarVisible, setSideFilterBarVisible] = useState(false);

  const handleButtonClick = () => {
    setSideFilterBarVisible(!isSideFilterBarVisible);
  };
  const [checkedBoxesList, setCheckedBoxesList] = useState<string[]>([]);
  const deleteCheckBoxesList = { checkedBoxesList, setCheckedBoxesList };

  const [deleteModal, setDeleteModal] = useState(false); // determines whether the modal is open or close

  const changeDltModalOpenStatus = () => {
    console.log();
    setDeleteModal(
      () => deleteCheckBoxesList.checkedBoxesList.length !== 0 && !deleteModal
    );
  };

  const [listingActive, setListingActive] = useState("List");
  const handleActiveListing = (buttonTxt: string) => {
    setListingActive(buttonTxt);
  };

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

  useEffect(() => {
    deleteModal
      ? (document.body.style.overflow = "hidden") // Disable scrolling
      : (document.body.style.overflow = "auto"); // Enable scrolling

    // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deleteModal]);

  // Employees data fetching
  const employeesData = useSelector((state: IData) => state.employeesData);
  const employees: IEmployee[] = employeesData.employees;
  const loading: boolean = employeesData.loading;

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

  // Pagination 
  const employeesCount = useSelector((state: IData) => state.employeesData.count);
  const totalPages=Math.ceil(employeesCount / rowsPerPage);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        closeOnClick
        pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
      />
      {/* include searching filtering techniques */}
      {/* <ActionsBar /> */}
      <ButtonGrpWrapper>
        <Button icon="filter_list" onClick={handleButtonClick}>
          {matches ? "All filters" : ""} <span className="count">02</span>
        </Button>
        <StyledLink to="add-employee">
          <Button icon="add_circle">{matches ? "Add New Employee" : ""}</Button>
        </StyledLink>
      </ButtonGrpWrapper>
      {isSideFilterBarVisible && (
        <SideFilterBar
          isVisible={isSideFilterBarVisible}
          oClick={handleButtonClick}
        />
      )}
      {isSideFilterBarVisible && (
        <div
          className="overlay"
          onClick={() => setSideFilterBarVisible(false)}
        ></div>
      )}
      <EmployeeTableActions
        listingActive={listingActive}
        handleActiveListing={handleActiveListing}
        deleteCheckBoxesList={deleteCheckBoxesList}
        deleteModal={deleteModal}
        changeDltModalOpenStatus={changeDltModalOpenStatus}
      />

      {listingActive == "List" ? (
        <EmployeeTableSearchAndPagination
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
          updateSearchParams={updateSearchParams}
          totalPages={totalPages}
        />
      ) : (
        <EmployeeCardList
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
        />
      )}

      <Pagination
        updateSearchParams={updateSearchParams}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
      />
    </>
  );
}
export default EmployeeListing;
