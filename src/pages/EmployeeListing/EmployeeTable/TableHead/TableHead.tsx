import TableHeadButton from "./TableHeadButton.tsx";
import { TableHeadWrapper } from "./tableHead.ts";

function TableHead() {
    return (
        <TableHeadWrapper>
            <tr>
                <TableHeadButton icon="expand_more">Id</TableHeadButton>
                <TableHeadButton icon="expand_more">Name</TableHeadButton>
                <TableHeadButton icon="expand_more">Designation</TableHeadButton>
                <TableHeadButton icon="expand_more">Department</TableHeadButton>
                <TableHeadButton icon="expand_more">Role</TableHeadButton>
                <th>
                    <span className="table-title"> Skills </span>
                </th>
                <th>
                    <span className="table-title"> Actions </span>
                </th>
            </tr>
        </TableHeadWrapper>
    );
}
export default TableHead;
