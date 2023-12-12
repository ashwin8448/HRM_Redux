import {
    CSSObjectWithLabel,
    ControlProps,
    DropdownIndicatorProps,
    StylesConfig,
} from "react-select";
import { ISelectOptionProps } from "../../core/interfaces/interface";
import colors from "../../core/constants/colors";

function selectStyleComponent(error?: string) {

    const selectStyles: StylesConfig<ISelectOptionProps> = {
        control: (base: CSSObjectWithLabel, state: ControlProps<ISelectOptionProps>) => ({
            ...base,
            fontSize: "14px",
            border: error ? "none" : state.isFocused
                ? `1px solid  ${colors.DARK_GRAY_COLOR}`
                : `1px solid  ${colors.LIGHT_GRAY_COLOR}`,
            boxShadow: "none",
            "&:hover": {
                borderColor: "none",
            },
        }),
        placeholder: (base: CSSObjectWithLabel) => ({
            ...base,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        }),
        dropdownIndicator: (
            base: CSSObjectWithLabel,
            state: DropdownIndicatorProps<ISelectOptionProps>
        ) => ({
            ...base,
            color: state.isFocused
                ? `${colors.DARK_GRAY_COLOR}`
                : `${colors.LIGHT_GRAY_COLOR}`, // Set the color of the arrow
            "&:hover, &:active, &:focus": {
                color: `${colors.DARK_GRAY_COLOR}`,
            },
        }),
    }

    return selectStyles;
};
export default selectStyleComponent;
