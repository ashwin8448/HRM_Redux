import FilterSelect from "./FilterSelect";
import SelectListWrapper from "../../../../../components/SelectStyle/selectList.ts";
import { fetchDropdownData } from "../../../../../core/store/actions.ts";
import store from "../../../../../core/store/configureStore.ts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IData } from "../../../../../core/interfaces/interface.ts";
import FilterSelectLoader from "../FilterSelect/FilterSelectLoader/FilterSelectLoader.tsx";

function FilterSelectList() {
  const departments = useSelector(
    (state: IData) => state.dropdownData.departments.departments
  );
  const departmentsLoading = useSelector(
    (state: IData) => state.dropdownData.departments.loading
  );
  const roles = useSelector((state: IData) => state.dropdownData.roles.roles);
  const rolesLoading = useSelector(
    (state: IData) => state.dropdownData.roles.loading
  );

  const skills = useSelector(
    (state: IData) => state.dropdownData.skills.skills
  );
  const skillsLoading = useSelector(
    (state: IData) => state.dropdownData.skills.loading
  );

  useEffect(() => {
    store.dispatch(fetchDropdownData());
  }, []);
  return (
    <SelectListWrapper>
      {!departmentsLoading ? (
        <FilterSelect
          label="Departments"
          options={departments}
          placeholder="Select department"
          isMulti={false}
          fieldName="department"
        />
      ) : (
        <FilterSelectLoader />
      )}
      {!rolesLoading ? (
        <FilterSelect
          label="Role"
          options={roles}
          placeholder="Select role"
          isMulti={false}
          fieldName="role"
        />
      ) : (
        <FilterSelectLoader />
      )}
      {!skillsLoading ? (
        <FilterSelect
          label="Skills"
          options={skills}
          placeholder="Select skills"
          isMulti={true} //employees can have multiple skills
          fieldName="skills"
        />
      ) : (
        <FilterSelectLoader />
      )}
    </SelectListWrapper>
  );
}

export default FilterSelectList;
