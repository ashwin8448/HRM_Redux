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

function Input({ config }: { config: IInputProps }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[config.name]; // error value for input
  const className = errorMsg ? `input-border-error ${config.label}` : "label";
  return (
    <InputWrapper>
      <label className="subheading">{config.label}</label>
      {(() => {
        let inputToRender = <></>;
        switch (config.type) {
          case "file":
            inputToRender = <PhotoInput config={config} />;
            break;
          case "text":
          case "date":
          case "tel":
          case "email":
          case "textarea":
            inputToRender = (
              <>
                {inputToRender}
                <div className="input-field-error">
                  <input
                    type={config.type}
                    id={config.label}
                    className={className}
                    accept={config.accept}
                    placeholder={`Enter your ${config.label}`}
                    {...register(config.name, {
                      ...config.validation,
                      required: {
                        value: config.isRequired,
                        message: "This field is required",
                      },
                    })}
                    max={config.validation?.max?.value} // for date input
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
              <div className="m-30">
                <div className="common-flex radio-list">
                  {config.options?.map((option) => (
                    <RadioGrp
                      key={option as string}
                      option={option as string}
                      label={config.label}
                      name={config.name}
                      isRequired={config.isRequired}
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
              />
            );
            break;
        }
        return inputToRender;
      })()}
    </InputWrapper>
  );
}

export default Input;
