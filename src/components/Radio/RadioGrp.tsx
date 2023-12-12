import { useFormContext } from "react-hook-form";
import RadioWrapper from "./radioGrp.ts";

function RadioGrp({
    option,
    label,
    name,
}: {
    option: string;
    label: string;
    name: string;
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
                        value: true,
                        message: "This field is required", // validation fpr radio input
                    },
                })}
            />
            <label htmlFor={`${label}-${option}`}>{option}</label>
        </RadioWrapper>
    );
}
export default RadioGrp;
