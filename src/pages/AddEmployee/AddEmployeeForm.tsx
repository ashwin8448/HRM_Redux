import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Input from "../../components/Input/Input.tsx";
import addFormConfig from "./addFormConfig.ts";
import { Fieldset, FormWrapper } from "../EmployeeUpdate/form.ts";
import React, { useState } from "react";
import { IInputProps } from "../../core/interfaces/interface.ts";
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "../../core/api/functions.ts";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader.tsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import { apiURL } from "../../core/config/constants.ts";
import {
  H3Styles,
  H2Styles,
} from "../../core/constants/components/text/textStyledComponents.ts";

const AddEmployeeForm = () => {
  const { employeeId } = useParams();
  const [isLoading, setIsLoading] = useState(employeeId ? true : false);
  const [activeSection, setActiveSection] = useState(1);
  const methods = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const formConfig = addFormConfig;

  const onSubmit = methods.handleSubmit(async () => {
    setIsLoading(true);
    const { password, isAdmin, confirmPassword, ...rest } = methods.getValues();
    try {
      const newEmployee = {
        ...rest,
        moreDetails: JSON.stringify({
          isAdmin: isAdmin === "Yes" ? true : false,
          isNew: true,
        }),
      };
      const response = await postData(apiURL.employee, newEmployee);
      const newUserCredentials = {
        username: response.data.data.id,
        password: password,
      };
      await postData(apiURL.authSignUp, newUserCredentials);
      // Display toast for success state
      toast.success(`Added user ${rest.firstName}`, {
        toastId: "add-toast-id",
      });
    } catch (error) {
      // Display error toast
      console.error(error);
      toast.error("Error adding new user", { toastId: "error-add-user" });
      setActiveSection(1);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  });

  if (isLoading)
    return (
      <div className="center-loader">
        <Loader />
      </div>
    );
  return (
    <>
      <Button
        className="material-symbols-outlined back-btn"
        icon="reply"
        onClick={() => navigate(-1)}
      />
      <FormWrapper>
        <H2Styles>Add New Employee</H2Styles>
        <ProgressBar
          activeSection={activeSection}
          steps={["Basic Details", "User Credentials"]}
        ></ProgressBar>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            {activeSection <= 2 &&
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
                          {activeSection === 2 && (
                            <>
                              <h4>Rules to set new password</h4>
                              <ul>
                                <li>
                                  Password requires atleast four characters.
                                </li>
                                <li>
                                  Password must contain atleast 2 alphabets.
                                </li>
                                <li>Pasword must contain atleast 2 numbers.</li>
                              </ul>
                            </>
                          )}
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
            {activeSection === 1 && (
              <ButtonGrpWrapper>
                <Button
                  disabled={!(activeSection > 1)}
                  onClick={() => setActiveSection(activeSection - 1)}
                >
                  Previous
                </Button>
                <Button
                  onClick={async () => {
                    let validationStatus = await methods.trigger([
                      "firstName",
                      "email",
                      "dob",
                      "doj",
                      "isAdmin",
                    ]);
                    validationStatus && setActiveSection(activeSection + 1);
                  }}
                >
                  Next
                </Button>
              </ButtonGrpWrapper>
            )}
            {activeSection === 2 && (
              <>
                <ButtonGrpWrapper>
                  <Button onClick={() => setActiveSection(activeSection - 1)}>
                    Previous
                  </Button>
                  <Button onClick={onSubmit} loading={isLoading}>
                    Submit
                  </Button>
                </ButtonGrpWrapper>
              </>
            )}
          </form>
        </FormProvider>
      </FormWrapper>
    </>
  );
};
export default AddEmployeeForm;
