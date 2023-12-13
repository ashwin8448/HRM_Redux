import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import MainHeading from "./MainHeading/MainHeading.tsx";
import ActionsBar from "./SearchAndFilter/ActionsBar.tsx";
import EmployeeTableWithActions from "./EmployeeTableWithActions/EmployeeTableWithActions.tsx";
import StyledLink from "../../components/StyledLink.ts";
import Button from "../../components/Button/Button.tsx";
import { useMediaQuery } from "usehooks-ts";
import ButtonGrpWrapper from "./../../components/Button/buttonGrpWrapper";

function EmployeeListing() {
  const matches = useMediaQuery("(min-width: 768px)");

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
      <ButtonGrpWrapper className="global-padding">
        <Button icon="filter_list">{matches ? "All filters" : ""}</Button>
        <StyledLink to="add-employee">
          <Button icon="add_circle">{matches ? "Add New Employee" : ""}</Button>
        </StyledLink>
      </ButtonGrpWrapper>
      <EmployeeTableWithActions/>
    </>
  );
}
export default EmployeeListing;
