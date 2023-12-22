import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Input from "../../components/Input/Input.tsx";
import {
  checkEmployeesEqual,
  convertIGetEmployeeToIAppEmployee,
  convertFormDataToIPostEmployees,
  getUrlType,
} from "../../utils/helper.ts";
import { Fieldset, FormWrapper } from "./form.ts";
import { useEffect, useState } from "react";
import {
  IAppEmployee,
  IData,
  IInputProps,
} from "../../core/interfaces/interface.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getData, postData, updateData } from "../../core/api/functions.ts";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.tsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import {
  nameValidation,
  emailValidation,
  phoneValidation,
  addressValidation,
  dateValidation,
  numberValidation,
} from "./constants/validationConfig.ts";
import { apiURL } from "../../core/config/constants.ts";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesData } from "../../core/store/actions.ts";
import store from "../../core/store/configureStore.ts";
import EmployeeView from "../EmployeeView/EmployeeView.tsx";
import EmployeeViewWrapper from "../EmployeeView/employeeView.ts";

function Form() {
  const { employeeId } = useParams();
  const location = useLocation();
  const { departments, roles, skills } = useSelector((state: IData) => ({
    departments: state.dropdownData.departments.departments,
    roles: state.dropdownData.roles.roles,
    skills: state.dropdownData.skills.skills,
  }));
  const [isLoading, setIsLoading] = useState(employeeId ? true : false);
  const [activeSection, setActiveSection] = useState(1);
  const [employeeData, setEmployeeData] = useState<IAppEmployee>();
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
              setEmployeeData(
                convertIGetEmployeeToIAppEmployee(response.data.data)
              );
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
        methods.setValue(
          ObjKey,
          (
            {
              ...employeeData,
              isActive: employeeData.isActive === true ? "Yes" : "No",
            } as any
          )[ObjKey]
        );
      }
  }, [employeeData]);

  const onSubmit = methods.handleSubmit(async () => {
    const newEmployee = await convertFormDataToIPostEmployees(
      methods.getValues()
    );
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
          !checkEmployeesEqual(
            employeeData as IAppEmployee,
            methods.getValues()
          )
        ) {
          await updateData(apiURL.employee + "/" + employeeId, newEmployee);
          // Display toast for success state
          toast.success(`Edited employee ${newEmployee.firstName}`, {
            toastId: "edit-toast-id",
          });
        } else {
          //TODO:
          // Display info toast
          toast.info(`No edit has been made to ${newEmployee.firstName}`, {
            toastId: "no-edit-toast-id",
          });
        }
        navigate(`/`);
        store.dispatch(fetchEmployeesData());
      }
    } catch (error) {
      // Display error toast
      urlType === "add-employee"
        ? toast.error("Error adding new user", { toastId: "error-add-user" })
        : toast.error("Error editing user", { toastId: "error-edit-user" });
      setActiveSection(4);
    } finally {
      setIsLoading(false);
    }
  });
  if (isLoading) return <Loader className="center-screen" />;
  const formConfig = [
    {
      sectionName: "Personal Details",
      sectionActiveState: 1,
      sectionFields: [
        {
          validation: nameValidation,
          label: "First name",
          type: "text",
          name: "firstName",
          isRequired: true,
        },
        {
          validation: nameValidation,
          label: "Last name",
          type: "text",
          name: "lastName",
          isRequired: true,
        },
        {
          validation: emailValidation,
          label: "Email",
          type: "email",
          name: "email",
          isRequired: true,
        },
        {
          validation: phoneValidation,
          label: "Phone number",
          type: "tel",
          name: "phone",
          isRequired: true,
        },
        {
          validation: addressValidation,
          label: "Address",
          type: "textarea",
          name: "address",
          isRequired: true,
        },
        {
          validation: dateValidation,
          label: "Date of birth",
          type: "date",
          name: "dob",
          isRequired: true,
        },
      ],
    },
    {
      sectionName: "Professional Details",
      sectionActiveState: 2,
      sectionFields: [
        {
          validation: dateValidation,
          label: "Date of joining",
          type: "date",
          name: "dateOfJoining",
          isRequired: true,
        },
        {
          validation: nameValidation,
          label: "Deisgnation",
          type: "text",
          name: "designation",
          isRequired: true,
        },
        {
          validation: numberValidation,
          label: "Salary",
          type: "text",
          name: "salary",
          isRequired: true,
        },
        {
          label: "Currently employed",
          type: "radio",
          options: ["Yes", "No"],
          name: "isActive",
          isRequired: true,
        },
        {
          label: "Choose department",
          type: "dropdown",
          options: departments,
          name: "department",
          placeholder: "Select department",
          isMulti: false,
          isRequired: true,
        },
        {
          label: "Choose role",
          type: "dropdown",
          options: roles,
          name: "role",
          placeholder: "Select role",
          isMulti: false,
          isRequired: true,
        },
        {
          label: "Choose skills",
          type: "dropdown",
          options: skills,
          name: "skills",
          placeholder: "Select skills",
          isMulti: true,
          isRequired: true,
        },
      ],
    },
    {
      sectionName: "Uploads",
      sectionActiveState: 3,
      sectionFields: [
        {
          label: "Employee Photograph",
          type: "file",
          name: "photoId",
          accept: "image/*",
          isRequired: true,
        },
      ],
    },
  ];
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
            {formConfig.map((formSection) => {
              return (
                <>
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
                </>
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
            {activeSection === 5 && (
              <Fieldset className="form-details ">
                <h2 className="form-section-heading">Submit</h2>
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
                    true && setActiveSection(activeSection + 1);
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
}
export default Form;
