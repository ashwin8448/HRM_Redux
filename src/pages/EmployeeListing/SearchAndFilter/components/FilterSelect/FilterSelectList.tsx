import FilterSelect from "./FilterSelect";
import SelectListWrapper from "../../../../../components/SelectStyle/selectList.ts";

function FilterSelectList() {
    //TODO: fetch departments,skills and roles

    return (
        <SelectListWrapper>
            <FilterSelect
                label="Departments"
                //options={departments}
                placeholder="Select department"
                isMulti={false}
                fieldName="department"
            />
            <FilterSelect
                label="Role"
                //options={employment_modes}
                placeholder="Select role"
                isMulti={false}
                fieldName="role"
            />
            <FilterSelect
                label="Skills"
                //options={skills}
                placeholder="Select skills"
                isMulti={true} //employees can have multiple skills
                fieldName="skills"
            />
        </SelectListWrapper>
    );
}

export default FilterSelectList;
