import { useFormContext } from "react-hook-form";
import RadioWrapper from "./radioGrp.ts";

function RadioGrp({
    option,
    label,
    name,
    isRequired
}: {
    option: string;
    label: string;
    name: string;
    isRequired: boolean;
}) {

    const { register } = useFormContext();

    return (
        <RadioWrapper key={option} className=" common-flex">
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
            <label htmlFor={`${label}-${option}`}>{option}</label>
        </RadioWrapper>
    );
}
export default RadioGrp;
