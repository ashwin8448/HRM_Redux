import FormSelect from "./FormSelect.tsx";
import SelectListWrapper from "../../../components/SelectStyle/selectList.ts";
import { useSelector } from "react-redux";
import { IData } from "../../../core/interfaces/interface.ts";
import { useFormContext } from "react-hook-form";

function FormSelectList() {
  const { departments, roles, skills } = useSelector((state: IData) => ({
    departments: state.dropdownData.departments.departments,
    roles: state.dropdownData.roles.roles,
    skills: state.dropdownData.skills.skills,
  }));
  return (
    <SelectListWrapper>
      <FormSelect
        label="Departments"
        options={departments}
        placeholder="Select department"
        isMulti={false}
        fieldName="department"
      />
      <FormSelect
        label="Roles"
        options={roles}
        placeholder="Select role"
        isMulti={false}
        fieldName="role"
      />
      {/* <FormSelect
        label="Employment Modes"
        options={employment_modes}
        placeholder="Select employment modes"
        isMulti={false}
        fieldName="employment_mode"
      /> */}
      <FormSelect
        label="Skills"
        options={skills}
        placeholder="Select skills"
        isMulti={true}
        fieldName="skills"
      />
    </SelectListWrapper>
  );
}

export default FormSelectList;
