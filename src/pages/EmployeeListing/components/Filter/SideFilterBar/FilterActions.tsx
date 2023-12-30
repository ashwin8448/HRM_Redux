import Button from "../../../../../components/Button/Button.tsx";
import { ISelectOptionProps } from "../../../../../core/interfaces/interface.ts";
import FilterSelect from "../../../../../components/FilterSelect/FilterSelect.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSkillsData } from "../../../../../core/store/actions.ts";
import ButtonGrpWrapper from "../../../../../components/Button/buttonGrpWrapper.ts";
import FilterActionsWrapper from "./filterActions.ts";
import Loader from "../../../../../components/Loader/Loader.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks.ts";

function FilterActions({ onClick }: { onClick: () => void }) {
  const dispatch = useAppDispatch();

  const { skills, loading } = useAppSelector(
    (state) => state.dropdownData.skills
  );

  useEffect(() => {
    if (!skills.length) dispatch(fetchSkillsData());
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("skillIds");
  const display = searchParams.get("display");

  const skillIdsArray: ISelectOptionProps[] = filter
    ? filter.split(",").map((value: string) => ({
        value: Number(value),
        label:
          skills?.find((option) => option.value === Number(value))?.label || "",
      }))
    : [];

  const updateSearchParams = (params?: {
    page?: string;
    skillIds?: string;
  }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  const [skillFilterState, setSkillFilterState] =
    useState<ISelectOptionProps[]>(skillIdsArray);
  const skillFilterValue = { skillFilterState, setSkillFilterState };

  const applyFilters = () => {
    const skillFiltersParams = skillFilterState
      .map((option) => option.value)
      .join(",");
    if (skillFiltersParams) {
      if (display === "List") {
        updateSearchParams({ page: "1", skillIds: skillFiltersParams });
      } else {
        updateSearchParams({ skillIds: skillFiltersParams });
      }
      onClick();
    } else {
      resetFilters();
    }
  };

  const resetFilters = () => {
    setSkillFilterState([]);
    searchParams.delete("skillIds");

    if (display === "List") {
      updateSearchParams({ page: "1" });
    } else {
      updateSearchParams();
    }

    onClick();
  };

  return (
    <FilterActionsWrapper>
      {!loading ? (
        <FilterSelect
          label="Skills"
          options={skills}
          placeholder="Select skills"
          isMulti={true} //employees can have multiple skills
          value={skillFilterValue}
        />
      ) : (
        <Loader className="center-screen" />
      )}
      <ButtonGrpWrapper className=" btn-grp">
        <Button icon="" className="filter-all-btn" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button icon="" onClick={resetFilters}>
          Clear
        </Button>
      </ButtonGrpWrapper>
    </FilterActionsWrapper>
  );
}
export default FilterActions;
