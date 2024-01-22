import Button from "../../../../../components/Button/Button.tsx";
import { ISelectOptionProps } from "../../../../../core/interfaces/interface.ts";
import FilterSelect from "../../../../../components/FilterSelect/FilterSelect.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSkillsData } from "../../../../../core/store/actions.ts";
import ButtonGrpWrapper from "../../../../../components/Button/buttonGrpWrapper.ts";
import FilterActionsWrapper from "./filterActions.ts";
import Loader from "../../../../../components/Loader/Loader.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks.ts";
import { updateSearchParams } from "../../../../../utils/helper.ts";
import {
  defaultPageSize,
  gridDisplay,
  listDisplay,
} from "../../../../../core/config/constants.ts";

const FilterActions = ({ onClick, skillFilterValue }: {
  onClick: () => void, skillFilterValue: {
    skillFilterState: ISelectOptionProps[];
    setSkillFilterState: React.Dispatch<React.SetStateAction<ISelectOptionProps[]>>;
  }
}) => {
  const dispatch = useAppDispatch();

  const { skills, loading } = useAppSelector(
    (state) => state.dropdownData.skills
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("skillIds");
  const display = searchParams.get("display");

  const applyFilters = () => {
    const skillFiltersParams = skillFilterValue.skillFilterState
      .map((option) => option.value)
      .join(",");
    if (skillFiltersParams) {
      if (display === listDisplay) {
        updateSearchParams(setSearchParams, searchParams, {
          page: defaultPageSize.page,
          skillIds: skillFiltersParams,
        });
      }
      if (display === gridDisplay) {
        updateSearchParams(setSearchParams, searchParams, {
          skillIds: skillFiltersParams,
        });
      }
      onClick();
    } else {
      resetFilters();
    }
  };

  const resetFilters = () => {
    skillFilterValue.setSkillFilterState([]);

    const paramsToUpdate =
      display === listDisplay
        ? { skillIds: undefined, page: defaultPageSize.page }
        : { skillIds: undefined };
    updateSearchParams(setSearchParams, searchParams, paramsToUpdate);
  };

  useEffect(() => {
    if (!skills.length) {
      dispatch(fetchSkillsData());
    }
    const skillIdsArray: ISelectOptionProps[] = filter
      ? filter.split(",").map((value: string) => {
        return {
          value: Number(value),
          label:
            skills?.find((option) => option.value === Number(value))?.label ||
            "",
        };
      })
      : [];
    skillFilterValue.setSkillFilterState(skillIdsArray);
  }, [skills]);

  return (
    <FilterActionsWrapper>
      {!loading ? (
        <FilterSelect
          label="Skills"
          options={skills}
          placeholder="Select skills"
          value={skillFilterValue}
        />
      ) : (
        <div className="center-loader">
          <Loader />
        </div>
      )}
      <ButtonGrpWrapper className=" btn-grp">
        <Button className="very-important-btn" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button icon="" onClick={resetFilters}>
          Clear
        </Button>
      </ButtonGrpWrapper>
    </FilterActionsWrapper>
  );
};
export default FilterActions;
