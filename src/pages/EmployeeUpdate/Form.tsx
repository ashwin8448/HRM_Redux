import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Input from "../../components/Input/Input.tsx";
import {
  checkEmployeesEqual,
  convertToFormEmployee,
  defaultFormVal,
  getNewEmpId,
  getNewEmployeeDetails,
  getUrlType,
  resetFiltersAndSearchBar,
} from "../../utils/helper.ts";
import { Fieldset, InputRow } from "./form.ts";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../core/store/DataContext.tsx";
import {
  Employee,
  FormEmployee,
  TableProps,
} from "../../core/interfaces/interface.ts";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getData, updateData } from "../../core/api/functions.ts";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.tsx";
import FormSelectList from "./FormSelect/FormSelectList.tsx";
import {
  nameValidation,
  emailValidation,
  phoneValidation,
  addressValidation,
  dateValidation,
} from "./constants/validationConfig.ts";

function Form() {
  const { employees, tableProps, addTableProps, fetchEmployeeData, loading } =
    useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();
  const urlType = getUrlType(location.pathname);

  const defaultValues = defaultFormVal();

  const [searchParams] = useSearchParams();

  const employeeId: string | null =
    urlType === "edit-employee" ? searchParams.get("employeeId") : null;

  const employee: Employee | undefined = employees.find(
    (emp) => emp && emp.id === employeeId
  );

  const methods = useForm<FormEmployee>({
    mode: "onChange",
  });

  useEffect(() => {
    if (urlType === "edit-employee") {
      if (!employeeId) {
        // Display error toast after initial render
        toast.error("No employee Id was provided", {
          toastId: "employee-not-found",
        });
        navigate("/");
      } else {
        if (!loading && !employee) {
          throw new Response("Employee Not Found", {
            status: 404,
          });
        }
      }
    }
    const newformEmployee = employee
      ? convertToFormEmployee(employee)
      : defaultValues;
    methods.reset(newformEmployee);
  }, [employee, loading, employeeId]);

  const onReset = () => {
    const resettedTableProps: TableProps = {
      ...resetFiltersAndSearchBar(),
      sort: tableProps.sort,
    };
    methods.reset(defaultValues);
    addTableProps(resettedTableProps);
  };

  const [showLoader, setShowLoader] = useState(false); // for submit btn

  const onSubmit = methods.handleSubmit(async () => {
    const newEmployee = getNewEmployeeDetails(methods.getValues());
    setShowLoader(true);

    if (urlType === "add-employee") {
      try {
        // to get the current employee count to assign the new emp id
        const currentEmployeesCount =
          (await getData("/employeesCount.json"))?.data || 0;

        const newEmployeeToAdd = {
          ...newEmployee,
          id: getNewEmpId(currentEmployeesCount),
        };

        await updateData(
          `/employees/${newEmployeeToAdd.id}.json`,
          newEmployeeToAdd
        );
        await updateData("/employeesCount.json", currentEmployeesCount + 1);

        // Display toast for success state
        toast.success(`Added user ${newEmployeeToAdd.emp_name}`, {
          toastId: "add-toast-id",
        });
      } catch (error) {
        // Display error toast
        toast.error("Error adding new user", { toastId: "error-add-user" });
      } finally {
        setShowLoader(false);
        navigate(`/`);
        fetchEmployeeData();
      }
    } else {
      if (employee) {
        const employeeEdited = { ...newEmployee, id: employee.id };

        if (!checkEmployeesEqual(employee, employeeEdited)) {
          try {
            await updateData(`/employees/${employeeId}.json`, employeeEdited);
            // Display toast for success state
            toast.success(`Edited user ${employeeEdited.emp_name}`, {
              toastId: "edit-toast-id",
            });
          } catch (error) {
            // Display error toast
            toast.error("Error editing user", { toastId: "error-edit-user" });
          } finally {
            setShowLoader(false);
            navigate(`/`);
            fetchEmployeeData();
          }
        } else {
          // Display info toast
          toast.info(`No edit has been made to ${employeeEdited.emp_name}`, {
            toastId: "no-edit-toast-id",
          });
          navigate(`/`);
        }
      }
    }
  });

  if (loading) return <Loader className="center-screen" />;

  return (
    (urlType === "add-employee" ||
      (urlType === "edit-employee" && employee)) && (
      <>
        <span
          className="material-symbols-outlined back-btn"
          onClick={() => navigate(-1)}
        >
          reply
        </span>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <h2>
              {urlType === "add-employee" && "Add New Employee"}
              {urlType === "edit-employee" &&
                employee &&
                `Edit Employee ${employee.id}`}
            </h2>
            <Fieldset className="form-details ">
              <legend className="subheading">Personal Information</legend>

              <Input
                validation={nameValidation}
                label="Name"
                type="text"
                name="emp_name"
              />
              <InputRow className="common-flex">
                <Input
                  validation={emailValidation}
                  label="Email"
                  type="email"
                  name="email"
                />
                <Input
                  validation={phoneValidation}
                  label="Phone Number"
                  type="tel"
                  name="phone"
                />
              </InputRow>
              <Input
                validation={addressValidation}
                label="Address"
                type="textarea"
                name="address"
              />
              <InputRow className="common-flex">
                <Input
                  validation={dateValidation}
                  label="Date of Birth"
                  type="date"
                  name="date_of_birth"
                />
                <Input
                  validation={dateValidation}
                  label="Date of Joining"
                  type="date"
                  name="date_of_joining"
                />
              </InputRow>
              <Input
                label="Gender"
                type="radio"
                options={["Male", "Female", "Other"]}
                name="gender"
              />
            </Fieldset>
            <Fieldset className="other-details ">
              <legend className="subheading">Other Information</legend>
              <FormSelectList />
            </Fieldset>
            <ButtonGrpWrapper>
              {urlType !== "add-employee" && (
                <Button icon="" onClick={onReset}>
                  Clear
                </Button>
              )}
              <Button icon="" onClick={onSubmit} loading={showLoader}>
                Submit
              </Button>
            </ButtonGrpWrapper>
          </form>
        </FormProvider>
      </>
    )
  );
}
export default Form;