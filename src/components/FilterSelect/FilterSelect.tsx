import Select from "react-select";
import {
  ISelectDropdownProps,
  ISelectOptionProps,
} from "../../core/interfaces/interface.ts";
import selectStyleComponent from "../SelectStyle/selectCustomStyles.ts";
import { LabelStyles } from "../../core/constants/components/text/textStyledComponents.ts";

function FilterSelect({
  label,
  options,
  placeholder,
  isMulti,
  value,
}: ISelectDropdownProps) {
  return (
    <>
      <LabelStyles className=" overflow-ellipsis">{label}</LabelStyles>
      {value && (
        <Select
          value={value.skillFilterState}
          isClearable={true}
          className="label"
          isSearchable={true}
          options={options}
          placeholder={placeholder}
          isMulti={isMulti}
          styles={selectStyleComponent()}
          onChange={(selectedOption) => {
            const selectedValues = selectedOption as ISelectOptionProps[];
            value?.setSkillFilterState(selectedValues);
          }}
        />
      )}
    </>
  );
}

export default FilterSelect;
