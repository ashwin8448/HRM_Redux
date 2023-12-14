import TableHeadButton from "./TableHeadButton.tsx";
import { TableHeadWrapper } from "./tableHead.ts";

function TableHead() {
  return (
    <TableHeadWrapper>
      <tr>
        <th>
          <input type="checkbox" />
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
