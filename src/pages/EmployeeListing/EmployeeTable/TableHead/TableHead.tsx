import TableHeadButton from "./TableHeadButton.tsx";
import { TableHeadWrapper } from "./tableHead.ts";
import Checkbox from "./../../../../components/Checkbox/Checkbox.tsx";
import { useSelector } from "react-redux";
import { IData, IEmployee } from "../../../../core/interfaces/interface.ts";

function TableHead({
  deleteCheckBoxesList,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  const employeesList = useSelector(
    (state: IData) => state.employeesData.employees
  );
  const employeesIdList = employeesList.map(
    (employee: IEmployee) => employee.id
  );
  // const handleCheckboxChange = () => {
  //   deleteCheckBoxesList.setCheckedBoxesList(() => employeesIdList);
  // };
  return (
    <TableHeadWrapper>
      <tr>
        <th>
        <Checkbox employeesIdList={employeesIdList} deleteCheckBoxesList={deleteCheckBoxesList}  />
        </th>
        <TableHeadButton icon="expand_more">Id</TableHeadButton>
        <TableHeadButton icon="expand_more">
          <span className="material-symbols-outlined">person</span>Name
        </TableHeadButton>
        <TableHeadButton icon="expand_more">
          <span className="material-symbols-outlined">badge</span>Designation
        </TableHeadButton>
        <TableHeadButton icon="expand_more">
          <span className="material-symbols-outlined">work</span>Department
        </TableHeadButton>
        <TableHeadButton icon="expand_more">
          <span className="material-symbols-outlined">engineering</span>Role
        </TableHeadButton>
        <th>
          <span className="table-title common-flex">
            <span className="material-symbols-outlined">workspace_premium</span>
            Skills{" "}
          </span>
        </th>
        <th>
          <span className="table-title common-flex">
            <span className="material-symbols-outlined">bolt</span>Actions
          </span>
        </th>
      </tr>
    </TableHeadWrapper>
  );
}
export default TableHead;
