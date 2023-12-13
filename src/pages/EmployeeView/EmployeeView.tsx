import EmployeeViewWrapper from "./employeeView.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDateView, getWorkExp } from "../../utils/helper.ts";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import DetailsSection from "../../components/Details/Details.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { toast } from "react-toastify";
import { getData } from "../../core/api/functions.ts";
import { IEmployee } from "../../core/interfaces/interface.ts";
//TODO:
import { useMediaQuery } from "usehooks-ts";
import ErrorPage from "../../components/ErrorPage/ErrorPage.tsx";

function EmployeeView() {
  //mobile design
  //TODO:
  const matches = useMediaQuery("(min-width: 768px)");
  console.log(matches);
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState<{loading:Boolean, employee:IEmployee}>({
    loading: true,
    employee: {},
  });
  const navigate = useNavigate();
  //   const { employees, loading } = useContext(DataContext);
  const [activeBtn, setActiveBtn] = useState("profile");

  const handleButtonClick = (buttonType: string) => {
    setActiveBtn(buttonType);
  };

  //   const employee = employees.find((emp) => emp && emp.id === employeeId);
// no id: toast
// id und, no emp: ErrorPage
// req error: 

  useEffect(() => {
    if (!employeeId) {
      // Display error toast after initial render
      toast.error("No employee Id was provided", {
        toastId: "employee-not-found",
      });
      setEmployeeData({ ...employeeData, loading: false });
      navigate("/");
    } else {
      getData("http://3.145.178.76:4000/employee/" + employeeId)
        .then((response) => {
            console.log(response.data.data)
          if (response.status == 200 && !response.data)
{            //TODO: throw new response?
            throw new Response("Employee Not Found", { status: 404 });}
          else setEmployeeData((prev)=> ({ ...prev, employee: response.data.data }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setEmployeeData((prev)=>({ ...prev, loading: false })));
    //   if (!loading && !employee) {
    //     throw new Response("Employee Not Found", { status: 404 });
    //   }
    }
  }, []);

  if (employeeData.loading) return (<Loader className="center-screen" />);
  console.log(employeeData)
  return (
    employeeData.employee && (
      <>
        <span
          className="material-symbols-outlined back-btn"
          onClick={() => navigate(-1)}
        >
          {" "}
          reply
        </span>
        <span>Hi {matches}</span>
        <EmployeeViewWrapper>
          <h2 className="employee-name">{employeeData.employee.firstName+" "+employeeData.employee.lastName}</h2>
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
                content={employeeData.employee.firstName+" "+employeeData.employee.lastName}
                matches
              />
              <DetailsSection
                icon="mail"
                title={matches ? "Email" : ""}
                content={employeeData.employee.email!}
                matches
              />
              <DetailsSection
                icon="phone_iphone"
                title={matches ? "Phone No" : ""}
                content={employeeData.employee.phone!}
                matches
              />
              <DetailsSection
                icon="calendar_month"
                title={matches ? "Date of Birth" : ""}
                content={getDateView(employeeData.employee.dob!)}
                matches
              />
              <DetailsSection
                icon="home"
                title={matches ? "Address" : ""}
                content={employeeData.employee.address!}
                matches
              />
            </div>
          ) : (
            <div className="detail-element">
              <DetailsSection
                icon="person"
                title={matches ? "Designation" : ""}
                content={employeeData.employee.designation!}
                matches
              />
              <DetailsSection
                icon="mail"
                title={matches ? "Department" : ""}
                content={employeeData.employee.department!.department}
                matches
              />
              {/* <DetailsSection
                icon="phone_iphone"
                title={matches ? "Employment Mode" : ""}
                content={employeeData.employee.employment_mode!}
                matches
              /> */}
              <DetailsSection
                icon="calendar_month"
                title={matches ? "Date of Joining" : ""}
                content={getDateView(employeeData.employee.dateOfJoining!)}
                matches
              />
              <DetailsSection
                icon="home"
                title={matches ? "Work Experience" : ""}
                content={getWorkExp(employeeData.employee.dateOfJoining!)}
                matches
              />
              <DetailsSection
                icon="home"
                title={matches ? "Skills" : ""}
                content={employeeData.employee.skills!}
                matches
              />
            </div>
          )}
        </EmployeeViewWrapper>
      </>
    )
  );
}

export default EmployeeView;
