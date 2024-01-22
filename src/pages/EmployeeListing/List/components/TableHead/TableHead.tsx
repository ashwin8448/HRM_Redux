import Checkbox from "../../../../../components/Checkbox/Checkbox.tsx";
import { ParagraphStyles } from "../../../../../core/constants/components/text/textStyledComponents.ts";
import { IAppEmployee } from "../../../../../core/interfaces/interface.ts";
import { useAppSelector } from "../../../../../hooks/reduxHooks.ts";
import TableHeadButton from "./TableHeadButton.tsx";
import { TableHeadWrapper } from "./tableHead.ts";

function TableHead({
  deleteCheckBoxesList,
  employees,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IAppEmployee[];
}) {
  const user = useAppSelector((state) => state.userData);
  const employeesIdList = employees
    .map((employee: IAppEmployee) => employee.id)
    .filter((employeeId: string) => employeeId !== user.employeeDetails?.id);

  return (
    <TableHeadWrapper>
      <tr>
        {user.employeeDetails?.accessControlRole === "admin" && (
          <th className="small-column">
            <Checkbox
              employeesIdList={employeesIdList}
              deleteCheckBoxesList={deleteCheckBoxesList}
            />
          </th>
        )}
        <TableHeadButton icon="expand_more" title="firstName" className="medium-column">
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
        <TableHeadButton icon="expand_more" title="isActive">
          <span className="material-symbols-outlined">engineering</span>Active
          Status
        </TableHeadButton>
        <th>
          <span className="table-title common-flex">
            <span className="material-symbols-outlined">workspace_premium</span>
            <ParagraphStyles>Skills</ParagraphStyles>
          </span>
        </th>
        {user.employeeDetails?.accessControlRole === "admin" && (
          <th className="medium-column">
            <span className="table-title common-flex">
              <span className="material-symbols-outlined">bolt</span>
              <ParagraphStyles>Actions</ParagraphStyles>
            </span>
          </th>
        )}
      </tr>
    </TableHeadWrapper>
  );
}
export default TableHead;
