import ButtonWrapper from "../../../../../components/Button/button.ts";
import { SortDirection } from "../../../../../core/config/constants.ts";
import { ParagraphStyles } from "../../../../../core/constants/components/text/textStyledComponents.ts";
import { TableHeadIconWrapper } from "./tableHead.ts";
import { useSearchParams } from "react-router-dom";

function TableHeadButton({
  children,
  icon,
  title,
}: {
  children?: React.ReactNode;
  icon?: string;
  title: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortDir");

  const currentSortCriteria = title; // get the employee property from the data label on which the table is sorted
  const visible = currentSortCriteria === sortBy;
  let newSortProp = "asc"; // sorting order
  let sortIcon = "";

  if (visible) {
    // inverting the sort order with the sorticon toggling the visibility
    if (sortOrder === SortDirection.DESC) {
      newSortProp = SortDirection.ASC;
      sortIcon = "rotate";
    } else if (sortOrder === SortDirection.ASC) {
      newSortProp = SortDirection.DESC;
      sortIcon = "";
    }
  }

  function sortBtnClickHandler() {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortBy: currentSortCriteria.toString() ?? "id",
      sortDir: newSortProp ?? "asc",
    });
  }

  return (
    <th>
      <ButtonWrapper
        $isChildren={false}
        className={`common-flex table-button-head`}
        onClick={sortBtnClickHandler}
        $noTransition={true}
      >
        <TableHeadIconWrapper
          $visible={visible}
          className={`material-symbols-outlined sort-icon ${sortIcon}`}
        >
          {icon}
        </TableHeadIconWrapper>
        <ParagraphStyles className="table-title common-flex">
          {children}
        </ParagraphStyles>
      </ButtonWrapper>
    </th>
  );
}
export default TableHeadButton;
