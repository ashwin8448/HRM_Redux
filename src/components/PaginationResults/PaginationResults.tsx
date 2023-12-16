import React, { useState, useEffect } from "react";
import Select from "react-select";
import selectStyleComponent from "../SelectStyle/selectCustomStyles";
import PaginationResultsWrapper from "./paginationResults";
import { useSelector } from "react-redux";
import { IData } from "../../core/interfaces/interface";

function PaginationResults({
  updateSearchParams,
  searchParams,
  totalPages
}: {
  updateSearchParams: ({
    page,
    sortBy,
    sortDir,
  }: {
    page?: string | undefined;
    sortBy?: string | undefined;
    sortDir?: string | undefined;
  }) => void;
  searchParams: URLSearchParams;
  totalPages:number
}) {
  const employeesCount = useSelector(
    (state: IData) => state.employeesData.count
  );
  const options = Array.from({ length: totalPages }, (_, index) =>
    String(index + 1)
  );
  const [value, setValue] = useState({ value: 1, label: "1" }); // Set initial value to "01"

  const handleInputChange = (inputValue: string) => {
    if (inputValue != "") {
      // Only allow numeric input, otherwise revert to the initial value
      const numericValue = parseInt(inputValue, 10);
      if (!isNaN(numericValue) && options.includes(inputValue)) {
        setValue({ value: numericValue, label: inputValue });
      } else {
        setValue({ value: 1, label: "01" }); // Revert to the initial value
      }
    }
  };
  useEffect(() => {
    if (!searchParams.get("page"))
      updateSearchParams({ page: searchParams.get("page") || "1" });
    else updateSearchParams({ page: value.label });
  }, [value]);

  return (
    <PaginationResultsWrapper className="common-flex">
      Showing
      <Select
        value={value}
        className="label"
        isSearchable={true}
        options={options.map((option) => ({
          value: Number(option),
          label: option,
        }))}
        styles={selectStyleComponent()}
        isMulti={false}
        onChange={(selectedOption) => {
          if (selectedOption === null) {
            setValue({ value: 1, label: "1" });
          } else {
            setValue(selectedOption);
          }
        }}
        onInputChange={handleInputChange}
      />
      {employeesCount + " "}
      results
    </PaginationResultsWrapper>
  );
}

export default PaginationResults;
