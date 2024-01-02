import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Button from "../../../../components/Button/Button.tsx";
import SideFilterBarWrapper from "./SideFilterBar/sideFilterBar.ts";
import FilterActions from "./SideFilterBar/FilterActions.tsx";
import { useAppSelector } from "../../../../hooks/reduxHooks.ts";
import { H2Styles } from "../../../../core/constants/components/text/textStyledComponents.ts";

const Filter = () => {
  //responsive
  const matches = useMediaQuery("(min-width: 768px)");

  const { loading } = useAppSelector((state) => state.employeesData);

  //Side Filter bar visible on click
  const [isSideFilterBarVisible, setSideFilterBarVisible] = useState(false);
  const handleButtonClick = () => {
    setSideFilterBarVisible(!isSideFilterBarVisible);
  };

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
      <Button icon="filter_list " onClick={handleButtonClick}>
        {matches && "All flters"}
      </Button>

      {!loading && isSideFilterBarVisible && (
        <SideFilterBarWrapper
          className="translateX"
          $visible={isSideFilterBarVisible}
        >
          <div className="common-flex">
            <H2Styles>Filters</H2Styles>
            <Button
              className="close-btn"
              icon="close"
              onClick={handleButtonClick}
            ></Button>
          </div>
          <FilterActions onClick={handleButtonClick} />
        </SideFilterBarWrapper>
      )}
      {!loading && isSideFilterBarVisible && (
        <div
          className="overlay"
          onClick={() => setSideFilterBarVisible(false)}
        ></div>
      )}
    </>
  );
};
export default Filter;
