import DummyImg from "../../assets/userAvatar.svg";
import { useFormContext } from "react-hook-form";
import { IInputProps } from "../../core/interfaces/interface";
import { ChangeEvent, useState } from "react";
import InputError from "../InputError/InputError";

const PhotoInput = ({ config }: { config: IInputProps }) => {
  const {
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const [placeholderImage, setPlaceholderImage] = useState(
    getValues("photoId")
  );
  const errorMsg = errors[config.name];
  const className = errorMsg ? `input-border-error ${config.label}` : "label";
  console.log(placeholderImage);
  return (
    <>
      <div className="employee-img-container">
        <div className="employee-img">
          <span
            className="material-symbols-outlined close-btn"
            onClick={() => {
              setValue("photoId", "");
              setPlaceholderImage("");
            }}
          >
            close
          </span>
          <img
            src={
              placeholderImage === ""
                ? DummyImg
                : typeof placeholderImage==="string"
                ? placeholderImage
                : URL.createObjectURL(placeholderImage[0])
            }
            alt="Employee Image"
          />
        </div>
      </div>

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (config.type === "file") {
              const imgURL = e.target.files && e.target.files[0];
              setPlaceholderImage(imgURL);
            }
          }}
          max={config.validation?.max?.value} // for date input
        />
        {errorMsg && <InputError error={errorMsg.message?.toString()} />}
      </div>
    </>
  );
};

export default PhotoInput;
