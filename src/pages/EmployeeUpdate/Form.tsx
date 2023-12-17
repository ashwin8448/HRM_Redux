// <div>Personal Details
// fname
// lname
// Dob
// address
// email
// phone
// </div>
// <div>Professional Details
//   Is Employed currently?
//     Date of joining
//     Salary
//     designation
//     role
//     skills
//     Department
// </div>
// <div>Uploads
//   Photo
// </div>
// <div>Review</div>
// export default Form

import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Input from "../../components/Input/Input.tsx";
import {
  checkEmployeesEqual,
  getNewEmployeeDetails,
  getUrlType,
  resetFiltersAndSearchBar,
} from "../../utils/helper.ts";
import { Fieldset, FormWrapper, InputRow } from "./form.ts";
import { useContext, useEffect, useState } from "react";
import { IEmployee, ITableProps } from "../../core/interfaces/interface.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData, postData, updateData } from "../../core/api/functions.ts";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.tsx";
import FormSelectList from "./FormSelect/FormSelectList.tsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import {
  nameValidation,
  emailValidation,
  phoneValidation,
  addressValidation,
  dateValidation,
} from "./constants/validationConfig.ts";
import { apiURL } from "../../core/config/constants.ts";
import { useDispatch } from "react-redux";
import { fetchEmployeesData } from "../../core/store/actions.ts";
import store from "../../core/store/configureStore.ts";
import EmployeeView from "../EmployeeView/EmployeeView.tsx";
import EmployeeViewWrapper from "../EmployeeView/employeeView.ts";

function Form() {
  const { employeeId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(employeeId ? true : false);
  const [activeSection, setActiveSection] = useState(1);
  const [employeeData, setEmployeeData] = useState<IEmployee>();
  const defaultValues = employeeData;
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
  });

  const urlType = getUrlType(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    if (urlType === "edit-employee") {
      if (!employeeId) {
        // Display error toast after initial render
        toast.error("No employee Id was provided", {
          toastId: "employee-not-found",
        });
        navigate("/");
      } else {
        getData("/employee/" + employeeId)
          .then((response) => {
            if (!response.data) {
              //TODO: Handling errors
              throw new Response("Employee Not Found", { status: 404 });
            } else
              setEmployeeData({
                ...response.data.data,
                isActive: response.data.data.isActive ? "Yes" : "No",
                department: [
                  {
                    value: response.data.data.department.id,
                    label: response.data.data.department.department,
                  },
                ],
                role: [
                  {
                    value: response.data.data.role.id,
                    label: response.data.data.role.role,
                  },
                ],
                skills: response.data.data.skills.map(
                  (skill: { id: number; skill: string }) => ({
                    value: skill.id,
                    label: skill.skill,
                  })
                ),
                photoId: JSON.parse(response.data.data.moreDetails).photoId,
              });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoading(!isLoading));
      }
    }
  }, []);

  useEffect(() => {
    if (employeeData)
      for (let ObjKey in employeeData) {
        methods.setValue(ObjKey, (employeeData as any)[ObjKey]);
      }
  }, [employeeData]);

  const onReset = () => {
    // const resettedTableProps: ITableProps = {
    //   ...resetFiltersAndSearchBar(),
    //   sort: tableProps.sort,
    // };
    methods.reset(defaultValues);
    // addTableProps(resettedTableProps);
  };

  const onSubmit = methods.handleSubmit(async () => {
    const newEmployee = getNewEmployeeDetails(methods.getValues());
    setIsLoading(true);
    try {
      if (urlType === "add-employee") {
        await postData(apiURL.employee, newEmployee);
        // Display toast for success state
        toast.success(`Added user ${newEmployee.firstName}`, {
          toastId: "add-toast-id",
        });
      } else {
        //TODO: newEmployee skill is array of numbers. this won't function properly
        if (
          !checkEmployeesEqual(employeeData as IEmployee, methods.getValues())
        ) {
          await updateData(apiURL.employee + employeeId, newEmployee);
          // Display toast for success state
          toast.success(`Edited user ${newEmployee.firstName}`, {
            toastId: "edit-toast-id",
          });
        } else {
          // Display info toast
          toast.info(`No edit has been made to ${newEmployee.firstName}`, {
            toastId: "no-edit-toast-id",
          });
          navigate(`/`);
        }
      }
    } catch (error) {
      // Display error toast
      urlType === "add-employee"
        ? toast.error("Error adding new user", { toastId: "error-add-user" })
        : toast.error("Error editing user", { toastId: "error-edit-user" });
    } finally {
      setIsLoading(false);
      navigate(`/`);
      store.dispatch(fetchEmployeesData());
    }
  });
  if (isLoading) return <Loader className="center-screen" />;

  return (
    <>
      <span
        className="material-symbols-outlined back-btn"
        onClick={() => navigate(-1)}
      >
        reply
      </span>
      <FormWrapper>
        <h2>
          {employeeId
            ? `Edit Employee: ${
                employeeData?.firstName + " " + employeeData?.lastName
              }`
            : "Add New Employee"}
        </h2>
        <ProgressBar
          activeSection={activeSection}
          steps={[
            "Personal Details",
            "Professional Details",
            "Uploads",
            "Review",
            "Submit",
          ]}
        ></ProgressBar>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            {activeSection === 1 && (
              <Fieldset className="form-details ">
                <legend className="subheading">Personal Details</legend>
                <Input
                  validation={nameValidation}
                  label="First name"
                  type="text"
                  name="firstName"
                />
                <Input
                  validation={nameValidation}
                  label="Last name"
                  type="text"
                  name="lastName"
                />
                <Input
                  validation={emailValidation}
                  label="Email"
                  type="email"
                  name="email"
                />
                <Input
                  validation={phoneValidation}
                  label="Phone number"
                  type="tel"
                  name="phone"
                />
                <Input
                  validation={addressValidation}
                  label="Address"
                  type="textarea"
                  name="address"
                />
                <Input
                  validation={dateValidation}
                  label="Date of birth"
                  type="date"
                  name="dob"
                />
              </Fieldset>
            )}
            {activeSection === 2 && (
              <Fieldset className="form-details ">
                <legend className="subheading">Professional Details</legend>
                <Input
                  validation={dateValidation}
                  label="Date of joining"
                  type="date"
                  name="dateOfJoining"
                />
                <Input
                  label="Currently employed"
                  type="radio"
                  options={["Yes", "No"]}
                  name="isActive"
                />

                <FormSelectList />
              </Fieldset>
            )}
            {activeSection === 3 && (
              <Fieldset className="form-details ">
                <legend className="subheading">Uploads</legend>
                <InputRow className="common-flex">
                  <Input
                    // TODO: validation rule
                    // validation={nameValidation}
                    label="Photo"
                    type="file"
                    name="photoId"
                  />
                  <img
                    className="employee-img"
                    src={
                      typeof methods.getValues("photoId") === "string"
                        ? methods.getValues("photoId")
                        : URL.createObjectURL(methods.getValues("photoId"))
                    }
                    alt="Employee Image"
                  />
                </InputRow>
              </Fieldset>
            )}
            {activeSection === 4 && (
              <Fieldset className="form-details ">
                <legend className="subheading">Review</legend>
                <EmployeeViewWrapper>
                  <EmployeeView employee={methods.getValues()}></EmployeeView>
                </EmployeeViewWrapper>
                <ButtonGrpWrapper>
                  <Button icon="" onClick={() => setActiveSection(1)}>
                    Edit
                  </Button>
                  <Button icon="" onClick={onSubmit} loading={isLoading}>
                    Submit
                  </Button>
                </ButtonGrpWrapper>
              </Fieldset>
            )}
            {activeSection === 5 && (
              <Fieldset className="form-details ">
                <legend className="subheading">Submit</legend>
              </Fieldset>
            )}
            {activeSection < 4 && (
              <ButtonGrpWrapper>
                {/* TODO: disabled button */}
                <Button
                  icon=""
                  disabled={!(activeSection > 1)}
                  onClick={() => setActiveSection(activeSection - 1)}
                >
                  Previous
                </Button>
                <Button
                  icon=""
                  onClick={() => setActiveSection(activeSection + 1)}
                >
                  Next
                </Button>
              </ButtonGrpWrapper>
            )}
            {/* <ButtonGrpWrapper>
            {urlType !== "add-employee" && (
              <Button icon="" onClick={onReset}>
                Clear
              </Button>
            )}

          </ButtonGrpWrapper> */}
          </form>
        </FormProvider>
      </FormWrapper>
    </>
  );
}
export default Form;
