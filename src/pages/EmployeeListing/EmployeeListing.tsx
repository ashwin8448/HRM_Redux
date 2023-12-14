import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeTableSearchAndPagination from "./EmployeeTableSearchAndPagination/EmployeeTableSearchAndPagination.tsx";
import StyledLink from "../../components/StyledLink.ts";
import Button from "../../components/Button/Button.tsx";
import { useMediaQuery } from "usehooks-ts";
import ButtonGrpWrapper from "./../../components/Button/buttonGrpWrapper";
import EmployeeTableActions from "./EmployeeTableActions/EmployeeTableActions.tsx";

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
      {/* include searching filtering techniques */}
      {/* <ActionsBar /> */}
      <ButtonGrpWrapper>
        <Button icon="filter_list">
          {matches ? "All filters" : ""} <span className="count">02</span>
        </Button>
        <StyledLink to="add-employee">
          <Button icon="add_circle">{matches ? "Add New Employee" : ""}</Button>
        </StyledLink>
      </ButtonGrpWrapper>
      <EmployeeTableActions />
      <EmployeeTableSearchAndPagination />
    </>
  );
}
export default EmployeeListing;
