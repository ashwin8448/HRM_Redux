import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Input from "../../components/Input/Input.tsx";
import {
  convertIGetEmployeeToIAppEmployee,
  convertFormDataToIPostEmployees,
  getUrlType,
} from "../../utils/helper.ts";
import { Fieldset, FormWrapper } from "./form.ts";
import React, { useEffect, useState } from "react";
import {
  IAppEmployee,
  IInputProps,
  ISelectOptionProps,
} from "../../core/interfaces/interface.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData, postData, updateData } from "../../core/api/functions.ts";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.tsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import { apiURL } from "../../core/config/constants.ts";
import EmployeeView from "../EmployeeView/EmployeeView.tsx";
import EmployeeViewWrapper from "../EmployeeView/employeeView.ts";
import getFormConfig from "./formConfig.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import {
  fetchDepartmentsData,
  fetchRolesData,
  fetchSkillsData,
} from "../../core/store/actions.ts";

const Form = () => {
  const { employeeId } = useParams();
  const location = useLocation();
  const departments = useAppSelector(
    (state) => state.dropdownData.departments.departments
  );
  const roles = useAppSelector((state) => state.dropdownData.roles.roles);
  const skills = useAppSelector((state) => state.dropdownData.skills.skills);
  const [isLoading, setIsLoading] = useState(employeeId ? true : false);
  const [activeSection, setActiveSection] = useState(1);
  const [employeeData, setEmployeeData] = useState<IAppEmployee>();
  const methods = useForm({
    mode: "onChange",
  });
  const urlType = getUrlType(location.pathname);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!roles.length) dispatch(fetchRolesData());
    if (!departments.length) dispatch(fetchDepartmentsData());
    if (!skills.length) dispatch(fetchSkillsData());

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
              throw new Response("Employee Not Found", { status: 404 });
            } else
              setEmployeeData(
                convertIGetEmployeeToIAppEmployee(response.data.data)
              );
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => setIsLoading(!isLoading));
      }
    }
  }, []);

  useEffect(() => {
    if (employeeData)
      for (const employeeProperty in employeeData) {
        if (
          (employeeProperty === "department" || employeeProperty === "role") &&
          employeeData[employeeProperty].value === 0
        ) {
          methods.setValue(employeeProperty, null);
        } else if (employeeProperty === "isActive") {
          methods.setValue(
            employeeProperty,
            employeeData[employeeProperty] ? "Yes" : "No"
          );
        } else {
          methods.setValue(
            employeeProperty,
            employeeData[employeeProperty as keyof IAppEmployee]
          );
        }
      }
  }, [employeeData]);

  const onSubmit = methods.handleSubmit(async () => {
    setIsLoading(true);
    const formValues = methods.getValues();
    try {
      if (urlType === "add-employee") {
        const newEmployee = await convertFormDataToIPostEmployees(formValues);
        await postData(apiURL.employee, newEmployee);
        // Display toast for success state
        toast.success(`Added user ${newEmployee.firstName}`, {
          toastId: "add-toast-id",
        });
      } else {
        if (
          Object.keys(methods.formState.dirtyFields).length ||
          formValues.photoId != employeeData?.photoId
        ) {
          const editedEmployee = await convertFormDataToIPostEmployees(
            formValues
          );
          await updateData(apiURL.employee + "/" + employeeId, editedEmployee);
          // Display toast for success state
          toast.success(`Edited employee ${formValues.firstName}`, {
            toastId: "edit-toast-id",
          });
        } else {
          // Display info toast
          toast.info(`No edit has been made to ${formValues.firstName}`, {
            toastId: "no-edit-toast-id",
          });
        }
        navigate(`/`);
      }
    } catch (error) {
      // Display error toast
      console.error(error);
      urlType === "add-employee"
        ? toast.error("Error adding new user", { toastId: "error-add-user" })
        : toast.error("Error editing user", { toastId: "error-edit-user" });
      setActiveSection(4);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  });
  const formConfig = getFormConfig({
    departments: departments as ISelectOptionProps[],
    skills: skills as ISelectOptionProps[],
    roles: roles as ISelectOptionProps[],
  });

  if (isLoading)
    return (
      <div className="center-loader">
        <Loader />
      </div>
    );
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
          ]}
        ></ProgressBar>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            {activeSection <= 3 &&
              [
                formConfig.find(
                  (formSection) =>
                    activeSection === formSection.sectionActiveState
                )!,
              ].map((formSection) => {
                return (
                  <React.Fragment key={formSection.sectionActiveState}>
                    {activeSection === formSection.sectionActiveState && (
                      <Fieldset
                        key={formSection.sectionActiveState}
                        className="form-details "
                      >
                        <h2 className="form-section-heading">
                          {formSection.sectionName}
                        </h2>
                        <>
                          {formSection.sectionFields.map(
                            (sectionField: IInputProps) => (
                              <Input
                                key={sectionField.name}
                                config={sectionField}
                              />
                            )
                          )}
                        </>
                      </Fieldset>
                    )}
                  </React.Fragment>
                );
              })}

            {activeSection === 4 && (
              <>
                {" "}
                <Fieldset className="form-details ">
                  <h2 className="form-section-heading">Review</h2>
                  <EmployeeViewWrapper>
                    <EmployeeView employee={methods.getValues()}></EmployeeView>
                  </EmployeeViewWrapper>
                </Fieldset>
                <ButtonGrpWrapper>
                  <Button icon="" onClick={() => setActiveSection(1)}>
                    Edit
                  </Button>
                  <Button icon="" onClick={onSubmit} loading={isLoading}>
                    Submit
                  </Button>
                </ButtonGrpWrapper>
              </>
            )}
            {activeSection < 4 && (
              <ButtonGrpWrapper>
                <Button
                  icon=""
                  disabled={!(activeSection > 1)}
                  onClick={() => setActiveSection(activeSection - 1)}
                >
                  Previous
                </Button>
                <Button
                  icon=""
                  onClick={async () => {
                    let validationStatus = true;
                    switch (activeSection) {
                      case 1:
                        validationStatus = await methods.trigger([
                          "firstName",
                          "lastName",
                          "email",
                          "phone",
                          "address",
                          "dob",
                        ]);
                        break;
                      case 2:
                        validationStatus = await methods.trigger([
                          "dateOfJoining",
                          "isActive",
                          "designation",
                          "role",
                          "department",
                          "skills",
                          "salary",
                        ]);
                        break;
                      default:
                        validationStatus = true;
                    }
                    validationStatus && setActiveSection(activeSection + 1);
                  }}
                >
                  Next
                </Button>
              </ButtonGrpWrapper>
            )}
          </form>
        </FormProvider>
      </FormWrapper>
    </>
  );
};
export default Form;
