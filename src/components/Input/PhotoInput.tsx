import DummyImg from "../../assets/userAvatar.svg";
import { IInputProps } from "../../core/interfaces/interface";
import { ChangeEvent, useState } from "react";
import InputError from "../InputError/InputError.tsx";
import Button from "../Button/Button.tsx";
import { Controller, useFormContext } from "react-hook-form";
import PhotoInputWrapper from "./photoInput.ts";

const PhotoInput = ({ config }: { config: IInputProps }) => {
  const {
    getValues,
    setValue,
    control,
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
            placeholderImage === "" ||
            placeholderImage === undefined ||
            (typeof placeholderImage === "object" && !placeholderImage.length)
              ? DummyImg
              : typeof placeholderImage === "string"
              ? placeholderImage
              : URL.createObjectURL(placeholderImage[0])
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

      <div>
        <PhotoInputWrapper>
          <label htmlFor={config.label}>Select image</label>
          <Controller
            name={config.name}
            control={control}
            rules={{
              required: {
                value: config.isRequired,
                message: "This field is required",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  type={config.type}
                  id={config.label}
                  className={className}
                  accept={config.accept}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const imgFile = e.target.files && e.target.files;
                    setPlaceholderImage(imgFile);
                    field.onChange(e.target.files);
                  }}
                />
                {errorMsg && (
                  <InputError error={errorMsg.message?.toString()} />
                )}
              </>
            )}
          />
        </PhotoInputWrapper>
      </div>
    </>
  );
};

export default PhotoInput;
