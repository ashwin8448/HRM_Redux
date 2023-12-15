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
        />
      ):<EmployeeCardList deleteCheckBoxesList={deleteCheckBoxesList}/>}
    </>
  );
}
export default EmployeeListing;
