import React from "react";
import { useSelector } from "react-redux";
import { IData } from "../../../core/interfaces/interface";

function SelectAllCheckbox({
  deleteCheckBoxesList,
  employeesIdList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employeesIdList: string[];
}) {
  // handle checkbox
  const handleCheckboxChange = () => {
    deleteCheckBoxesList.setCheckedBoxesList((prevList) => {
      // Toggle the checkbox for all employees
      return prevList.length === employeesIdList.length
        ? [] // Uncheck all if all are checked
        : employeesIdList; // Check all if not all are checked
    });
  };

  return (
    <input
      className="checkbox"
      type="checkbox"
      onChange={handleCheckboxChange}
      checked={
        deleteCheckBoxesList.checkedBoxesList.length === employeesIdList.length
      }
    />
  );
}

export default SelectAllCheckbox;
