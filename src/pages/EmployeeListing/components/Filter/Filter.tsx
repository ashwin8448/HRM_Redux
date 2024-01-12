import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Button from "../../../../components/Button/Button.tsx";
import FilterWrapper from "./sideFilterBar.ts";
import FilterActions from "./FilterActions/FilterActions.tsx";
import { H2Styles } from "../../../../core/constants/components/text/textStyledComponents.ts";
import { useSearchParams } from "react-router-dom";
import { ISelectOptionProps } from "../../../../core/interfaces/interface.ts";
import { useAppSelector } from "../../../../hooks/reduxHooks.ts";

const Filter = () => {
  const [searchParams] = useSearchParams();
  const filters = searchParams.get("skillIds");

  //responsive
  const matches = useMediaQuery("(min-width: 768px)");

  const [skillFilterState, setSkillFilterState] = useState<
    ISelectOptionProps[]
  >([]);
  const skillFilterValue = { skillFilterState, setSkillFilterState };

  //Side Filter bar visible on click
  const [isSideFilterBarVisible, setSideFilterBarVisible] = useState(false);
  const handleButtonClick = () => {
    setSideFilterBarVisible(!isSideFilterBarVisible);
  };
  const { skills } = useAppSelector(
    (state) => state.dropdownData.skills
  );

  const skillIdsArray: ISelectOptionProps[] = filters
    ? filters.split(",").map((value: string) => {
      return {
        value: Number(value),
        label:
          skills?.find((option) => option.value === Number(value))?.label ||
          "",
      };
    })
    : [];

  //body static on delete modal/side filter opening
  useEffect(() => {
    isSideFilterBarVisible
      ? (document.body.style.overflow = "hidden") // Disable scrolling
      : (document.body.style.overflow = "auto"); // Enable scrolling

    // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSideFilterBarVisible]);

  return (
    <>
      <Button
        icon="filter_list "
        onClick={handleButtonClick}
        $notification={filters !== null}
      >
        {matches && "All filters"}
      </Button>

      <FilterWrapper className="translateX" $visible={isSideFilterBarVisible}>
        <div className="common-flex">
          <H2Styles>Filters</H2Styles>
          <Button
            className="close-btn"
            icon="close"
            onClick={handleButtonClick}
          ></Button>
        </div>
        <FilterActions onClick={handleButtonClick} skillFilterValue={skillFilterValue} />
      </FilterWrapper>

      {isSideFilterBarVisible && (
        <div
          className="overlay"
          onClick={() => { setSideFilterBarVisible(false); setSkillFilterState(skillIdsArray) }}
        ></div>
      )}
    </>
  );
};
export default Filter;
