import { useEffect } from "react";
import SideFilterBarWrapper from "./sideFilterBar";
import Button from "../../../components/Button/Button.tsx";
import ActionsBar from "./../SearchAndFilter/ActionsBar.tsx";

function SideFilterBar({
  isVisible,
  onClick,
}: {
  isVisible: boolean;
  onClick: () => void;
}) {

  return (
    <SideFilterBarWrapper className="translateX" $visible={isVisible}>
      <div className="common-flex">
        <label className="page-title-mobile">Filters</label>
        <Button className="close-btn" icon="close" onClick={onClick}></Button>
      </div>
      <ActionsBar onClick={onClick} />
    </SideFilterBarWrapper>
  );
}
export default SideFilterBar;
