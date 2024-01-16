import DummyImg from "../../assets/userAvatar.svg";
import { IInputProps } from "../../core/interfaces/interface";
import { ChangeEvent, useState } from "react";
import InputError from "../InputError/InputError.tsx";
import Button from "../Button/Button.tsx";
import { Controller, useFormContext } from "react-hook-form";
import { SpanWrapper, PhotoInputWrapper } from "./photoInput.ts";
import { LabelStyles } from "../../core/constants/components/text/textStyledComponents.ts";
import Avatar from "../../components/Avatar/Avatar.tsx";

const PhotoInput = ({
  config,
  tabIndex,
}: {
  config: IInputProps;
  tabIndex: number;
}) => {
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

  const setEmployeeImage = (value: string, placeholder: string) => {
    setValue("photoId", value);
    setPlaceholderImage(placeholder);
  };

  return (
    <>
      <div className="employee-img-container">
        <div className="photo-container">
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
            className="photo"
            alt="Employee Image"
          />
        </div>
        {placeholderImage != "" && (
          <Button
            onClick={() => {
              setEmployeeImage("", "");
            }}
            tabIndex={tabIndex}
          >
            Clear
          </Button>
        )}
      </div>

      <PhotoInputWrapper>
        <LabelStyles htmlFor={config.label} tabIndex={tabIndex}>
          Upload photo
        </LabelStyles>
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
              {errorMsg && <InputError error={errorMsg.message?.toString()} />}
            </>
          )}
        />
      </PhotoInputWrapper>
      <SpanWrapper className="or-span">or</SpanWrapper>
      <Avatar onImgClick={setEmployeeImage} />
    </>
  );
};

export default PhotoInput;
