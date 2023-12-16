import React, { useState, useEffect } from "react";
import Select from "react-select";
import selectStyleComponent from "../SelectStyle/selectCustomStyles";
import PaginationResultsWrapper from "./paginationResults";
import { useSelector } from "react-redux";
import { IData } from "../../core/interfaces/interface";
import { useSearchParams } from "react-router-dom";

function PaginationResults({
  updateSearchParams,
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
  totalPages:number
}) {

  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page")??"1"

  const options = Array.from({ length: totalPages }, (_, index) =>
    String(index + 1)
  );
  const [value, setValue] = useState({ value: Number(pageNumber), label: pageNumber }); // Set initial value to "01"

  const handleInputChange = (inputValue: string) => {
    if (inputValue != "") {
      // Only allow numeric input, otherwise revert to the initial value
      const numericValue = Number(inputValue);
      if (!isNaN(numericValue) && options.includes(inputValue)) {
        setValue({ value: numericValue, label: inputValue });
        updateSearchParams({page:inputValue})
      } else {
        setValue({ value: 1, label: "1" }); // Revert to the initial value
        updateSearchParams({page:"1"})
      }
    }
  };
  useEffect(() => {
    setValue({ value: Number(searchParams.get("page")), label: pageNumber??"1" });
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
            updateSearchParams({page:"1"})
          } else {
            setValue(selectedOption);
            updateSearchParams({page:selectedOption.label})
          }
        }}
        onInputChange={handleInputChange}
      />
      of {" "}
      {totalPages + " "}
      results
    </PaginationResultsWrapper>
  );
}

export default PaginationResults;
