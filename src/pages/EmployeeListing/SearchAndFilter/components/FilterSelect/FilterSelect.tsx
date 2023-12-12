import { useContext } from "react";
import Select from "react-select";
import {
    ISelectDropdownProps,
    ISelectOptionProps,
    ITableProps,
} from "../../../../../core/interfaces/interface.ts";
import InputWrapper from "../../../../../components/Input/input.ts";
import selectStyleComponent from "../../../../../components/SelectStyle/selectCustomStyles.ts";

function FilterSelect({
    label,
    options,
    placeholder,
    isMulti,
    fieldName,
}: ISelectDropdownProps) {

    return (
        <InputWrapper>
            <label className="subheading overflow-ellipsis">{label}</label>
            <Select
                // value={ItableProps[fieldName] as ISelectOptionProps | ISelectOptionProps[]}
                isClearable={true}
                className="label"
                isSearchable={true}
                options={options}
                placeholder={
                    <div className="placeholder overflow-ellipsis">{placeholder}</div>
                }
                isMulti={isMulti}
                styles={selectStyleComponent()}
                onChange={(selectedOption) => {
                    //TODO: maintain all table props as it is and change should reflect on the fieldname according to the value
                    //TODO: fire a change to the table props
                }}
            />
        </InputWrapper>
    );
}

export default FilterSelect;
