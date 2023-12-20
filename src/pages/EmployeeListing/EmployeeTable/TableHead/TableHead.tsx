import TableHeadButton from "./TableHeadButton.tsx";
import { TableHeadWrapper } from "./tableHead.ts";
import Checkbox from "./../../../../components/Checkbox/Checkbox.tsx";
import { useSelector } from "react-redux";
import { IData, IEmployee } from "../../../../core/interfaces/interface.ts";

function TableHead({
  deleteCheckBoxesList,
  employees
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IEmployee[]
}) {

  const employeesIdList = employees.map(
    (employee: IEmployee) => employee.id
  );

  return (
    <TableHeadWrapper>
      <tr>
        <th>
          <Checkbox employeesIdList={employeesIdList} deleteCheckBoxesList={deleteCheckBoxesList} />
        </th>
        <TableHeadButton icon="expand_more" title="id">Id</TableHeadButton>
        <TableHeadButton icon="expand_more" title="firstName">
          <span className="material-symbols-outlined">person</span>Name
        </TableHeadButton>
        <TableHeadButton icon="expand_more" title="designation">
          <span className="material-symbols-outlined">badge</span>Designation
        </TableHeadButton>
        <TableHeadButton icon="expand_more" title="department.id">
          <span className="material-symbols-outlined">work</span>Department
        </TableHeadButton>
        <TableHeadButton icon="expand_more" title="role.id">
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
