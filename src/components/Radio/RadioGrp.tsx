import { useFormContext } from "react-hook-form";
import RadioWrapper from "./radioGrp";
import { LabelStyles } from "../../core/constants/components/text/textStyledComponents";

function RadioGrp({
  option,
  label,
  name,
  isRequired,
  tabIndex
}: {
  option: string;
  label: string;
  name: string;
  isRequired: boolean;
  tabIndex:number
}) {
  const { register } = useFormContext();

  return (
    <RadioWrapper key={option} className=" common-flex" tabIndex={tabIndex}>
      <input
        type="radio"
        id={`${label}-${option}`}
        value={option} // Specify the value for this radio input
        {...register(name, {
          required: {
            value: isRequired,
            message: "This field is required", // validation for radio input
          },
        })}
      />
      <LabelStyles htmlFor={`${label}-${option}`}>{option}</LabelStyles>
    </RadioWrapper>
  );
}
export default RadioGrp;
