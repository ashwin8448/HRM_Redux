import EmployeeViewWrapper from "./employeeView.ts";
import { useNavigate, useParams } from "react-router-dom";
// import DataContext from "../../core/store/DataContext.tsx";
import { useContext, useEffect, useState } from "react";
import { getDateView, getWorkExp } from "../../utils/helper.ts";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import DetailsSection from "../../components/Details/Details.tsx";
import Loader from "../../components/Loader/loader.ts";
import { toast } from "react-toastify";
import { useMediaQuery } from "usehooks-ts";

function EmployeeView() {
  //mobile design
  const matches = useMediaQuery("(min-width: 768px)");

  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { employees, loading } = useContext(DataContext);
  const [activeBtn, setActiveBtn] = useState("profile");

  const handleButtonClick = (buttonType: string) => {
    setActiveBtn(buttonType);
  };

  const employee = employees.find((emp) => emp && emp.id === employeeId);

  useEffect(() => {
    if (!employeeId) {
      // Display error toast after initial render
      toast.error("No employee Id was provided", {
        toastId: "employee-not-found",
      });
      navigate("/");
    } else {
      if (!loading && !employee) {
        throw new Response("Employee Not Found", { status: 404 });
      }
    }
  }, [employeeId, employee, loading]);

  if (loading) return <Loader className="center-screen" />;

  return (
    employee && (
      <>
        <span
          className="material-symbols-outlined back-btn"
          onClick={() => navigate(-1)}
        >
          {" "}
          reply
        </span>
        <EmployeeViewWrapper>
          <h2 className="employee-name">{employee.emp_name}</h2>
          <ButtonGrpWrapper className="details-section common-flex">
            <Button
              icon="person"
              children="Personal Details"
              className={`detail-heading ${
                activeBtn === "profile" ? "add-border-bottom" : ""
              }`}
              onClick={() => handleButtonClick("profile")}
            />
            <Button
              icon="business_center"
              children="Work Details"
              className={`detail-heading ${
                activeBtn === "work" ? "add-border-bottom" : ""
              }`}
              onClick={() => handleButtonClick("work")}
            />
          </ButtonGrpWrapper>
          {activeBtn === "profile" ? (
            <div className="detail-element">
              <DetailsSection
                icon="person"
                title={matches ? "Full Name" : ""}
                content={employee.emp_name}
              />
              <DetailsSection
                icon="mail"
                title={matches ? "Email" : ""}
                content={employee.email}
              />
              <DetailsSection
                icon="phone_iphone"
                title={matches ? "Phone No" : ""}
                content={employee.phone}
              />
              <DetailsSection
                icon="calendar_month"
                title={matches ? "Date of Birth" : ""}
                content={getDateView(employee.date_of_birth)}
              />
              <DetailsSection
                icon="home"
                title={matches ? "Address" : ""}
                content={employee.address}
              />
            </div>
          ) : (
            <div className="detail-element">
              <DetailsSection
                icon="person"
                title={matches ? "Designation" : ""}
                content={employee.designation}
              />
              <DetailsSection
                icon="mail"
                title={matches ? "Department" : ""}
                content={employee.department}
              />
              <DetailsSection
                icon="phone_iphone"
                title={matches ? "Employment Mode" : ""}
                content={employee.employment_mode}
              />
              <DetailsSection
                icon="calendar_month"
                title={matches ? "Date of Joining" : ""}
                content={getDateView(employee.date_of_joining)}
              />
              <DetailsSection
                icon="home"
                title={matches ? "Work Experience" : ""}
                content={getWorkExp(employee.date_of_joining)}
              />
              <DetailsSection
                icon="home"
                title={matches ? "Skills" : ""}
                content={employee.skills}
              />
            </div>
          )}
        </EmployeeViewWrapper>
      </>
    )
  );
}

export default EmployeeView;
