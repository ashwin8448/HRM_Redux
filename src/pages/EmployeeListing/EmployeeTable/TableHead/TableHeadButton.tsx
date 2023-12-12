import { findSortCriteria } from "../../../../utils/helper.ts";
import { TableHeadIconWrapper } from "./tableHead.ts";
import ButtonWrapper from "../../../../components/Button/button.ts";
import { SortDirection } from "../../../../core/config/constants.ts";

function TableHeadButton({
  children,
  icon,
}: {
  children?: React.ReactNode;
  icon?: string;
}) {
  const sort = {
    sortTerm: "id",
    sortVal: SortDirection.ASC,
  }; //TODO: replace with sort from url using search params

  const currentSortCriteria = findSortCriteria(children); // get the employee property from the data label on which the table is sorted
  const visible = currentSortCriteria === sort.sortTerm;
  let sortIcon = "rotate";
  let newSortProp = SortDirection.NO_SORT; // sorting order

  if (visible) {
    // inverting the sort order with the sorticon toggling the visibility
    if (sort.sortVal === SortDirection.DESC) {
      newSortProp = SortDirection.ASC;
      sortIcon = "";
    } else if (sort.sortVal === SortDirection.ASC) {
      newSortProp = SortDirection.DESC;
    } else if (sort.sortVal === SortDirection.NO_SORT) {
      newSortProp = SortDirection.ASC;
      sortIcon = "";
    }
  }

    function sortBtnClickHandler() {
        const updatedTableProps = {
            // maintain the tableprops value
            // sort: {
            //     sortTerm: currentSortCriteria.toString(),
            //     sortVal: newSortProp,
            // },
            //TODO: maintain all props as it is and change should reflect on the sort according to the value
        };
        //TODO: fire a change to the filter prop
    }

  return (
    <th>
      <ButtonWrapper
        $isChildren={false}
        className={`common-flex table-button-head`}
        onClick={sortBtnClickHandler}
      >
        <TableHeadIconWrapper
          $visible={visible}
          className={`material-symbols-outlined sort-icon ${sortIcon}`}
        >
          {icon}
        </TableHeadIconWrapper>
        <label className="table-title">{children}</label>
      </ButtonWrapper>
    </th>
  );
}
export default TableHeadButton;
