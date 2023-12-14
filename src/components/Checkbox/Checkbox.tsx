import React from "react";

function Checkbox({
  employeeId,
  deleteCheckBoxesList,
  employeesIdList,
}: {
  employeeId?: string;
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employeesIdList?: string[];
}) {
  //handle checkbox
  const handleCheckboxChange = (event: any) => {
    // console.log(event.target.dataset);
    // if (employeeId)
    //   deleteCheckBoxesList.setCheckedBoxesList((prevList) => {
    //     if (prevList.includes(employeeId)) {
    //       return prevList.filter((id) => id !== employeeId);
    //     } else {
    //       // Use the spread operator to create a copy of the array
    //       return [...prevList, employeeId];
    //     }
    //   });
    // if (employeesIdList) {

    //   deleteCheckBoxesList.setCheckedBoxesList((prevList) => {
    //     if (prevList.length === employeesIdList.length) {
    //       return [];
    //     } else return employeesIdList;
    //   });
    // }
  };

  return (
    <input
      type="checkbox"
      onChange={handleCheckboxChange}
    />
  );
}

export default Checkbox;
