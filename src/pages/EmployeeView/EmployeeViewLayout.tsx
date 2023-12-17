import EmployeeViewWrapper from "./employeeView.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Loader from "../../components/Loader/Loader.tsx";
import { toast } from "react-toastify";
import { getData } from "../../core/api/functions.ts";
import { IEmployee } from "../../core/interfaces/interface.ts";
import EmployeeView from "./EmployeeView.tsx";
//TODO:
// why matches
import { useMediaQuery } from "usehooks-ts";

function EmployeeViewLayout() {
  //mobile design
  //TODO:
  const matches = useMediaQuery("(min-width: 768px)");
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState<{
    loading: Boolean;
    employee: IEmployee | null;
  }>({
    loading: true,
    employee: null,
  });
  const navigate = useNavigate();
  // const [activeBtn, setActiveBtn] = useState("profile");
  // const handleButtonClick = (buttonType: string) => {
  //   setActiveBtn(buttonType);
  // };
  useEffect(() => {
    if (!employeeId) {
      // Display error toast after initial render
      toast.error("No employee Id was provided", {
        toastId: "employee-not-found",
      });
      setEmployeeData({ ...employeeData, loading: false });
      navigate("/");
    } else {
      getData("/employee/" + employeeId)
        .then((response) => {
          if (!response.data) {
            //TODO: Handling errors
            throw new Response("Employee Not Found", { status: 404 });
          } else
            setEmployeeData((prev) => ({
              ...prev,
              employee: {
                ...response.data.data,
                photoId: JSON.parse(response.data.data.moreDetails).photoId
              },
            }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() =>
          setEmployeeData((prev) => ({ ...prev, loading: false }))
        );
      //   if (!loading && !employee) {
      //     throw new Response("Employee Not Found", { status: 404 });
      //   }
    }
  }, []);
  // console.log(
  //   employeeData.employee &&
  //     getData(employeeData.employee.moreDetails!.photoId).then(
  //       (response) => response
  //     )
  // )

  if (employeeData.loading) return <Loader className="center-screen" />;
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
        <EmployeeViewWrapper>
          <div>
            <div className="buttons">
              {" "}
              <ButtonGrpWrapper className="details-section common-flex">
                <Button
                  icon="edit"
                  onClick={() =>
                    navigate(`/edit-employee/${employeeData.employee!.id}`)
                  }
                />
                <Button
                  icon="delete"
                  //TODO:
                  // onClick={() => handleButtonClick("work")}
                />
              </ButtonGrpWrapper>
            </div>
          </div>
          <EmployeeView employee={employeeData.employee}></EmployeeView>
        </EmployeeViewWrapper>
      </>
    )
  );
}

export default EmployeeViewLayout;

{
  /* <EmployeeViewWrapper>
<div className="flex employee-intro-section">
  <img src={dummy_img} alt="Employee image" />
  <div className="flex employee-intro">
    <h2>
      {employeeData.employee.firstName +
        " " +
        employeeData.employee.lastName}
    </h2>
    <div className="employee-status">
      <span>Active/InActive {employeeData.employee.isActive}</span>
      <span>{employeeData.employee.role?.role}</span>
    </div>
    <div className="flex">
      <div className="employee-info">
        <DetailsSection
          icon="person"
          title="Department"
          content={employeeData.employee.department!.department}
        />
        <DetailsSection
          icon="person"
          title="Date hired"
          content={employeeData.employee.dateOfJoining!}
        />
      </div>
      <div className="employee-info">
        <DetailsSection
          icon="mail"
          content={employeeData.employee.email!}
        />
        <DetailsSection
          icon="phone_iphone"
          content={employeeData.employee.phone!}
        />
      </div>
    </div>
  </div>
</div>
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
      title="Full Name"
      content={
        employeeData.employee.firstName +
        " " +
        employeeData.employee.lastName
      }
      matches
      newline={true}
    />
    <DetailsSection
      icon="mail"
      title="Email"
      content={employeeData.employee.email!}
      matches
      newline={true}
    />
    <DetailsSection
      icon="phone_iphone"
      title="Phone No"
      content={employeeData.employee.phone!}
      matches
      newline={true}
    />
    <DetailsSection
      icon="calendar_month"
      title="Date of Birth"
      content={getDateView(employeeData.employee.dob!)}
      matches
      newline={true}
    />
    <DetailsSection
      icon="home"
      title="Address"
      content={employeeData.employee.address!}
      matches
      newline={true}
    />
  </div>
) : (
  <div className="detail-element">
    <DetailsSection
      icon="person"
      title="Designation"
      content={employeeData.employee.designation!}
      matches
      newline={true}
    />
    <DetailsSection
      icon="mail"
      title="Department"
      content={employeeData.employee.department!.department}
      matches
      newline={true}
    />
    <DetailsSection
      icon="phone_iphone"
      title={matches ? "Employment Mode" : ""}
      content={employeeData.employee.employment_mode!}
      matches
    /> 
    <DetailsSection
      icon="calendar_month"
      title="Date of Joining"
      content={getDateView(employeeData.employee.dateOfJoining!)}
      matches
      newline={true}
    />
    <DetailsSection
      icon="home"
      title="Work Experience"
      content={getWorkExp(employeeData.employee.dateOfJoining!)}
      matches
      newline={true}
    />
    <DetailsSection
      icon="home"
      title="Skills"
      content={employeeData.employee.skills!}
      matches
      newline={true}
    />
  </div>
)}
</EmployeeViewWrapper> */
}
