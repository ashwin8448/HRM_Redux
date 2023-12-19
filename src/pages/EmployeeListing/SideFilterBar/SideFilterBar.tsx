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
  useEffect(() => {
    isVisible
      ? (document.body.style.overflow = "hidden") // Disable scrolling
      : (document.body.style.overflow = "auto"); // Enable scrolling

    // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

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
