import { useFormContext } from "react-hook-form";
import { InputProps } from "../../core/interfaces/interface.ts";
import InputError from "../InputError/InputError.tsx";
import RadioGrp from "../Radio/RadioGrp.tsx";
import InputWrapper from "./input.ts";

function Input({
  validation,
  label,
  type,
  options,
  name,
  imageLink,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[name]; // error value for input
  const className = errorMsg ? `input-border-error ${label}` : "label";

  return (
    <InputWrapper>
      <label className="subheading">{label}</label>
      {imageLink && (
        <div className="employee-img-container">
          <div className="employee-img">
            <span className="material-symbols-outlined close-btn" onClick={()=>console.log("Hi")}>
              {" "}
              close
            </span>
            <img src={imageLink} alt="Employee Image" />
          </div>
        </div>
      )}
      {options ? (
        <div className="m-30">
          <div className="common-flex radio-list">
            {options.map((option: string) => (
              <RadioGrp
                key={option}
                option={option}
                label={label}
                name={name}
              />
            ))}
          </div>
          {errorMsg && <InputError error={errorMsg.message?.toString()} />}
        </div>
      ) : (
        <div className="input-field-error">
          <input
            type={type}
            id={label}
            className={className}
            placeholder={`Enter your ${label}`}
            {...register(name, {
              ...validation,
              required: {
                value: true,
                message: "This field is required",
              },
            })}
            max={validation?.max?.value} // for date input
          />
          {errorMsg && <InputError error={errorMsg.message?.toString()} />}
        </div>
      )}
    </InputWrapper>
  );
}

export default Input;
