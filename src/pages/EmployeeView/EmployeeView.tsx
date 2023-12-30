import DummyImg from "../../assets/userAvatar.svg";
import { IAppEmployee } from "../../core/interfaces/interface";
import { getDateView, getWorkExp } from "../../utils/helper.ts";
import DetailsSection from "../../components/Details/Details.tsx";
import ActiveChip from "../../components/ActiveChip/ActiveChip.tsx";
import { FieldValues } from "react-hook-form";

const EmployeeView = ({
  employee,
}: {
  employee: IAppEmployee | FieldValues;
}) => {
  return (
    <>
      {" "}
      <div className="flex employee-intro-section">
        <img
          src={
            employee.photoId === "" ||
            employee.photoId === undefined ||
            (typeof employee.photoId === "object" && !employee.photoId.length)
              ? DummyImg
              : typeof employee.photoId === "string"
              ? employee.photoId
              : URL.createObjectURL(employee.photoId[0])
          }
          alt="Employee image"
        />
        <div className="flex employee-intro">
          <h2>{employee.firstName + " " + employee.lastName}</h2>
          <div className="employee-status">
            <ActiveChip isActive={employee.isActive} />
            <span>{employee.role.label}</span>
          </div>
          <div className="flex">
            <div className="employee-info">
              <DetailsSection
                icon="work"
                title="Department"
                content={employee.department.label}
              />
              <DetailsSection
                icon="calendar_month"
                title="Date hired"
                content={getDateView(employee.dateOfJoining!)}
              />
            </div>
            <div className="employee-info">
              <DetailsSection
                icon="mail"
                title="Email"
                content={employee.email!}
              />
              <DetailsSection
                icon="phone_iphone"
                title="Phone"
                content={employee.phone!}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="employee-details-section">
        <h2>Personal Details</h2>
        <div className="detail-element">
          <DetailsSection
            title="Full Name"
            content={employee.firstName + " " + employee.lastName}
            matches
            newline={true}
          />
          <DetailsSection
            title="Date of Birth"
            content={getDateView(employee.dob!)}
            matches
            newline={true}
          />
          <DetailsSection
            title="Address"
            content={employee.address!}
            matches
            newline={true}
          />
        </div>
      </div>
      <div className="employee-details-section">
        <h2>Professional Details</h2>
        <div className="detail-element">
          <DetailsSection
            title="Role"
            content={employee.role.label}
            matches
            newline={true}
          />
          <DetailsSection
            title="Designation"
            content={employee.designation!}
            matches
            newline={true}
          />
          <DetailsSection
            title="Work Experience"
            content={getWorkExp(employee.dateOfJoining!)}
            matches
            newline={true}
          />
          <DetailsSection
            title="Salary"
            content={employee.salary}
            matches
            newline={true}
          />
          <DetailsSection
            title="Skills"
            content={employee.skills!}
            matches
            newline={true}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeView;
