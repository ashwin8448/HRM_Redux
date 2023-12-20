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
import { ChangeEvent, useEffect, useState } from "react";
import {
  IData,
  IEmployee,
  IInputProps,
  ITableProps,
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
        console.log("posting");
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
          await updateData(apiURL.employee + "/" + employeeId, newEmployee);
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
          label: "Upload employee photograph",
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
                      <legend className="subheading">
                        {formSection.sectionName}
                      </legend>
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
