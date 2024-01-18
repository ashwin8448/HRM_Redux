import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Input from "../../components/Input/Input.tsx";
import {
  convertIGetEmployeeToIAppEmployee,
  convertFormDataToIPostEmployees,
} from "../../utils/helper.ts";
import { Fieldset, FormWrapper } from "./form.ts";
import React, { useEffect, useRef, useState } from "react";
import {
  IAppEmployee,
  IInputProps,
  ISelectOptionProps,
} from "../../core/interfaces/interface.ts";
import { useNavigate, useParams } from "react-router-dom";
import { getData, updateData } from "../../core/api/functions.ts";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.tsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import { apiURL } from "../../core/config/constants.ts";
import EmployeeView from "../EmployeeView/EmployeeView.tsx";
import EmployeeViewWrapper from "../EmployeeView/employeeView.ts";
import getEditFormConfig from "./editFormConfig.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import {
  fetchDepartmentsData,
  fetchRolesData,
  fetchSkillsData,
  setLogin,
} from "../../core/store/actions.ts";
import {
  H3Styles,
  H2Styles,
} from "../../core/constants/components/text/textStyledComponents.ts";
import { Helmet } from "react-helmet";
import { AES, enc } from "crypto-js";

const EditEmployeeForm = () => {
  const { employeeId } = useParams();
  const decryptedId = employeeId
    ? AES.decrypt(
        decodeURIComponent(employeeId),
        import.meta.env.VITE_ENCRYPTION_SECRET
      ).toString(enc.Utf8)
    : null;
  const departments = useAppSelector(
    (state) => state.dropdownData.departments.departments
  );
  const user = useAppSelector((state) => state.userData);
  const roles = useAppSelector((state) => state.dropdownData.roles.roles);
  const skills = useAppSelector((state) => state.dropdownData.skills.skills);
  const [employeeData, setEmployeeData] = useState<{
    loading: boolean;
    employee: IAppEmployee | null;
  }>({
    loading: true,
    employee: null,
  });
  const [activeSection, setActiveSection] = useState(1);
  const methods = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!decryptedId) {
      // Display error toast after initial render
      toast.error("No employee Id was provided", {
        toastId: "employee-not-found",
      });
      setEmployeeData({ ...employeeData, loading: false });
      navigate("/");
    } else {
      setEmployeeData((prev) => ({ ...prev, loading: true }));
      getData("/employee/" + decryptedId)
        .then((response) => {
          if (!response.data) {
            throw new Response("Employee Not Found", { status: 404 });
          } else
            setEmployeeData((prev) => ({
              ...prev,
              employee: convertIGetEmployeeToIAppEmployee(response.data.data),
            }));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() =>
          setEmployeeData((prev) => ({ ...prev, loading: false }))
        );
    }
    !roles.length && dispatch(fetchRolesData());
    !departments.length && dispatch(fetchDepartmentsData());
    !skills.length && dispatch(fetchSkillsData());
  }, [decryptedId]);

  useEffect(() => {
    if (employeeData) {
      for (const employeeProperty in employeeData.employee) {
        if (
          (employeeProperty === "department" || employeeProperty === "role") &&
          employeeData.employee[employeeProperty].value === 0
        ) {
          methods.setValue(employeeProperty, null);
        } else if (employeeProperty === "isActive") {
          methods.setValue(
            employeeProperty,
            employeeData.employee[employeeProperty] ? "Yes" : "No"
          );
        } else if (employeeProperty === "accessControlRole") {
          methods.setValue(
            "isAdmin",
            employeeData.employee[employeeProperty] === "admin" ? "Yes" : "No"
          );
        } else {
          methods.setValue(
            employeeProperty,
            employeeData.employee[employeeProperty as keyof IAppEmployee]
          );
        }
      }
    }
  }, [employeeData]);

  const onSubmit = methods.handleSubmit(async () => {
    setEmployeeData((prev) => ({ ...prev, loading: true }));
    const formValues = methods.getValues();
    try {
      const dirtyInputs = methods.formState.dirtyFields as Record<
        string,
        boolean
      >;
      delete dirtyInputs.photoId;
      if (
        Object.keys(dirtyInputs).length ||
        formValues.photoId != employeeData.employee?.photoId
      ) {
        const userEqualsEmployee = Boolean(
          decryptedId === user.employeeDetails?.id
        );
        const editedEmployee = await convertFormDataToIPostEmployees(
          formValues,
          userEqualsEmployee
        );
        await updateData(apiURL.employee + "/" + decryptedId, editedEmployee);
        if (decryptedId === user.employeeDetails?.id) {
          const updatedUserDetails = (
            await getData(apiURL.employee + `/${decryptedId}`)
          ).data.data;
          dispatch(
            setLogin(convertIGetEmployeeToIAppEmployee(updatedUserDetails))
          );
          localStorage.setItem(
            "userDetails",
            JSON.stringify(updatedUserDetails)
          );
        }
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
    } catch (error) {
      // Display error toast
      console.error(error);
      toast.error("Error editing user", { toastId: "error-edit-user" });
      setActiveSection(4);
    } finally {
      setEmployeeData((prev) => ({ ...prev, loading: false }));
      navigate("/");
    }
  });

  const formConfig = getEditFormConfig({
    departments: departments as ISelectOptionProps[],
    skills: skills as ISelectOptionProps[],
    roles: roles as ISelectOptionProps[],
    required: !(
      Boolean(user.employeeDetails?.accessControlRole === "admin") &&
      decryptedId != user.employeeDetails?.id
    ),
  });

  const ref = useRef<HTMLHeadingElement | null>(null);
  let tabIndex = 1;

  if (employeeData.loading)
    return (
      <div className="center-loader">
        <Loader />
      </div>
    );
  return (
    <>
      <Helmet>
        <title>Edit Employee</title>
        <meta
          name="description"
          content={`You are currently editing employee ${employeeId}.`}
        />
      </Helmet>
      <Button
        className="back-btn"
        icon="arrow_back_ios"
        onClick={() => navigate(-1)}
        tabIndex={-1}
      >
        Back
      </Button>
      <FormWrapper>
        <H2Styles ref={ref}>
          {`Edit Employee: ${
            employeeData.employee?.firstName +
            " " +
            employeeData.employee?.lastName
          }`}
        </H2Styles>
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
                        className="form-details section "
                      >
                        <H3Styles>{formSection.sectionName}</H3Styles>
                        <>
                          {formSection.sectionFields.map(
                            (sectionField: IInputProps) => (
                              <Input
                                key={sectionField.name}
                                config={sectionField}
                                tabIndex={tabIndex++}
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
                <EmployeeViewWrapper className="section">
                  <H3Styles>Review</H3Styles>
                  <EmployeeView employee={methods.getValues()}></EmployeeView>
                </EmployeeViewWrapper>
                <ButtonGrpWrapper>
                  <Button
                    icon=""
                    onClick={() => setActiveSection(1)}
                    tabIndex={tabIndex}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={onSubmit}
                    loading={employeeData.loading}
                    tabIndex={tabIndex}
                    className="primary-btn"
                  >
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
                  tabIndex={activeSection > 1 ? tabIndex : -1}
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
                          "isAdmin",
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
                    if (ref.current) {
                      ref.current.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  tabIndex={tabIndex}
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
export default EditEmployeeForm;
