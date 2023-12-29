import Select from "react-select";
import {
  ISelectDropdownProps,
  ISelectOptionProps,
} from "../../core/interfaces/interface.ts";
import selectStyleComponent from "../SelectStyle/selectCustomStyles.ts";

function FilterSelect({
  label,
  options,
  placeholder,
  isMulti,
  value,
}: ISelectDropdownProps) {
  return (
    <>
      <label className="subheading overflow-ellipsis">{label}</label>
      {value && (
        <Select
          value={value.skillFilterState}
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
            const selectedValues = selectedOption as ISelectOptionProps[];
            value?.setSkillFilterState(selectedValues);
          }}
        />
      )}
    </>
  );
}

export default FilterSelect;
