import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import MainHeading from "./MainHeading/MainHeading.tsx";
import ActionsBar from "./SearchAndFilter/ActionsBar.tsx";
import EmployeeTable from "./EmployeeTable/EmployeeTable.tsx";
import StyledLink from "../../components/StyledLink.ts";
import Button from "../../components/Button/Button.tsx";
import { useMediaQuery } from "usehooks-ts";
import ButtonGrpWrapper from "./../../components/Button/buttonGrpWrapper";

function EmployeeListing() {
  const matches = useMediaQuery("(min-width: 768px)");

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
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        closeOnClick
        pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
      />
      <MainHeading />
      {/* include searching filtering techniques */}
      {/* <ActionsBar /> */}
      <ButtonGrpWrapper>
        <Button icon="filter_list">{matches ? "All filters" : ""}</Button>
        <StyledLink to="add-employee">
          <Button icon="add_circle">{matches ? "Add New Employee" : ""}</Button>
        </StyledLink>
      </ButtonGrpWrapper>
      <EmployeeTable
        deleteModal={deleteModal}
        changeDltModalOpenStatus={changeDltModalOpenStatus}
      />
      {deleteModal && (
        <div className="overlay" onClick={() => setDeleteModal(false)}></div>
      )}
    </>
  );
}
export default EmployeeListing;
