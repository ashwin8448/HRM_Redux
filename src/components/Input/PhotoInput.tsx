import DummyImg from "../../assets/userAvatar.svg";
import { useFormContext } from "react-hook-form";
import { IInputProps } from "../../core/interfaces/interface";
import { ChangeEvent, useState } from "react";
import InputError from "../InputError/InputError.tsx";
import Button from "../Button/Button.tsx";

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
  return (
    <>
      <div className="employee-img-container">
        <img
          src={
            placeholderImage
              ? typeof placeholderImage === "string"
                ? placeholderImage
                : URL.createObjectURL(placeholderImage[0])
              : DummyImg
          }
          alt="Employee Image"
        />
        <Button
          onClick={() => {
            setValue("photoId", "");
            setPlaceholderImage("");
          }}
        >
          Clear
        </Button>
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
            const imgFile = e.target.files && e.target.files;
            setPlaceholderImage(imgFile);
          }}
        />
        {errorMsg && <InputError error={errorMsg.message?.toString()} />}
      </div>
    </>
  );
};

export default PhotoInput;
