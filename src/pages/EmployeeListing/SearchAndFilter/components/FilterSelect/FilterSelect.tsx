import { useContext } from "react";
import Select from "react-select";
import {
  SelectDropdownProps,
  SelectOptionProps,
  TableProps,
} from "../../../../../core/interfaces/interface.ts";
import DataContext from "../../../../../core/store/DataContext.tsx";
import InputWrapper from "../../../../../components/Input/input.ts";
import selectStyleComponent from "../../../../../components/SelectStyle/selectCustomStyles.ts";

function FilterSelect({
  label,
  options,
  placeholder,
  isMulti,
  fieldName,
}: SelectDropdownProps) {
  const { addTableProps, tableProps } = useContext(DataContext);

  return (
    <InputWrapper>
      <label className="subheading overflow-ellipsis">{label}</label>
      <Select
        value={tableProps[fieldName] as SelectOptionProps | SelectOptionProps[]}
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
          const currentTableProps: TableProps = {
            ...tableProps,
            [fieldName]: selectedOption, // once the select dropdown option is changed, the totalprops changes
          };
          addTableProps(currentTableProps);
        }}
      />
    </InputWrapper>
  );
}

export default FilterSelect;
