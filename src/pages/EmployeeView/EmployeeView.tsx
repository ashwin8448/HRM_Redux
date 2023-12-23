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
            employee.photoId === "" || employee.photoId === undefined
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
            <ActiveChip isActive={employee.isActive === "Yes" ? true : false} />
            <span>{employee.role.label}</span>
          </div>
          <div className="flex">
            <div className="employee-info">
              <DetailsSection
                icon="person"
                title="Department"
                content={employee.department.label}
              />
              <DetailsSection
                icon="person"
                title="Date hired"
                content={getDateView(employee.dateOfJoining!)}
              />
            </div>
            <div className="employee-info">
              <DetailsSection icon="mail" content={employee.email!} />
              <DetailsSection icon="phone_iphone" content={employee.phone!} />
            </div>
          </div>
        </div>
      </div>
      <div className="employee-details-section">
        <h2>Personal Details</h2>
        <div className="detail-element">
          <DetailsSection
            icon="person"
            title="Full Name"
            content={employee.firstName + " " + employee.lastName}
            matches
            newline={true}
          />
          <DetailsSection
            icon="calendar_month"
            title="Date of Birth"
            content={getDateView(employee.dob!)}
            matches
            newline={true}
          />
          <DetailsSection
            icon="home"
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
            icon="mail"
            title="Employee ID"
            content={String(employee.id)}
            matches
            newline={true}
          />
          <DetailsSection
            icon="person"
            title="Designation"
            content={employee.designation!}
            matches
            newline={true}
          />
          <DetailsSection
            icon="home"
            title="Work Experience"
            content={getWorkExp(employee.dateOfJoining!)}
            matches
            newline={true}
          />
          <DetailsSection
            icon="home"
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
