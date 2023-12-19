import { useContext } from "react";
import Select from "react-select";
import {
    ISelectDropdownProps,
    ISelectOptionProps,
    ITableProps,
} from "../../../../../core/interfaces/interface.ts";
import InputWrapper from "../../../../../components/Input/input.ts";
import selectStyleComponent from "../../../../../components/SelectStyle/selectCustomStyles.ts";
import { useSearchParams } from "react-router-dom";

function FilterSelect({
    label,
    options,
    placeholder,
    isMulti,
    value,
}: ISelectDropdownProps) {


    return (
        <InputWrapper>
            <label className="subheading overflow-ellipsis">{label}</label>
            <Select
                value={value?.skillFilterState}
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
                    const selectedValues = (selectedOption as ISelectOptionProps[]);
                    value?.setSkillFilterState(selectedValues)
                }}
            />
        </InputWrapper>
    );
}

export default FilterSelect;
