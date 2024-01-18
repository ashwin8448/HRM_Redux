import { useFormContext } from "react-hook-form";
import {
  ISelectOptionProps,
  IInputProps,
} from "../../core/interfaces/interface.ts";
import InputError from "../InputError/InputError.tsx";
import RadioGrp from "../Radio/RadioGrp.tsx";
import InputWrapper from "./input.ts";
import FormSelect from "../../pages/EmployeeUpdate/FormSelect/FormSelect.tsx";
import PhotoInput from "./PhotoInput.tsx";
import { LabelStyles } from "../../core/constants/components/text/textStyledComponents.ts";

function Input({ config,tabIndex }: { config: IInputProps,tabIndex:number }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[config.name]; // error value for input
  const className = errorMsg ? `input-border-error ${config.label}` : "label";
  return (
    (config.visibility === "public" ||
      (config.visibility === "private" && config.isRequired)) && (
      <InputWrapper>
        <LabelStyles>{config.label}</LabelStyles>
        {(() => {
          let inputToRender = <></>;
          switch (config.type) {
            case "file":
              inputToRender = <PhotoInput config={config} tabIndex={tabIndex} />;
              break;
            case "text":
            case "date":
            case "tel":
            case "email":
            case "textarea":
            case "password":
              inputToRender = (
                <>
                  {inputToRender}
                  <div className="input-field-error">
                    <input
                      type={config.type}
                      id={config.label}
                      className={className}
                      accept={config.accept}
                      placeholder={`Enter ${config.label.toLowerCase()}`}
                      {...register(config.name, {
                        ...config.validation,
                        required: {
                          value: config.isRequired,
                          message: "This field is required",
                        },
                      })}
                      autoComplete="new-password"
                      max={config.validation?.max?.value} // for date input
                      tabIndex={tabIndex}
                    />
                    {errorMsg && (
                      <InputError error={errorMsg.message?.toString()} />
                    )}
                  </div>
                </>
              );
              break;
            case "radio":
              inputToRender = (
                <div className="input-field-error">
                  <div className="common-flex radio-list">
                    {config.options?.map((option) => (
                      <RadioGrp
                        key={option as string}
                        option={option as string}
                        label={config.label}
                        name={config.name}
                        isRequired={config.isRequired}
                        tabIndex={tabIndex}
                      />
                    ))}
                  </div>
                  {errorMsg && (
                    <InputError error={errorMsg.message?.toString()} />
                  )}
                </div>
              );
              break;
            case "dropdown":
              inputToRender = (
                <FormSelect
                  label={config.label}
                  options={config.options as ISelectOptionProps[]}
                  placeholder={config.placeholder!}
                  isMulti={config.isMulti}
                  fieldName={config.name}
                  isRequired={config.isRequired}
                  tabIndex={tabIndex}
                />
              );
              break;
          }
          return inputToRender;
        })()}
      </InputWrapper>
    )
  );
}

export default Input;
