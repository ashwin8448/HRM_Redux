import React, { useState, useEffect } from "react";
import Select from "react-select";
import selectStyleComponent from "../SelectStyle/selectCustomStyles";
import PaginationResultsWrapper from "./paginationResults";

function PaginationResults() {
  const options = ["01", "02", "03"];
  const [value, setValue] = useState({ value: 1, label: "01" }); // Set initial value to "01"
  const employeesCount = 56;

  const handleInputChange = (inputValue: string) => {
    if (inputValue != "") {
      // Only allow numeric input, otherwise revert to the initial value
      const numericValue = parseInt(inputValue, 10);
      if (!isNaN(numericValue)&& options.includes(inputValue)) {
        setValue({ value: numericValue, label: inputValue });
      } else {
        setValue({ value: 1, label: "01" }); // Revert to the initial value
      }
    }
  };

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
          console.log(selectedOption);
          if (selectedOption === null) {
            setValue({ value: 1, label: "01" });
          } else {
            setValue(selectedOption);
          }
          // TODO: change the options on clicking
        }}
        onInputChange={handleInputChange}
      />
      {employeesCount + " "}
      results
    </PaginationResultsWrapper>
  );
}

export default PaginationResults;
