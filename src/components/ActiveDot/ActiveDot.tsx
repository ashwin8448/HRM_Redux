import ActiveDotWrapper from "./activeDot.ts";
import TooltipComponent from './../Tooltip/Tooltip.tsx';

function ActiveDot({ isActive }: { isActive: boolean }) {
  return (
    <TooltipComponent  title={`${isActive ? "Active" : "Inactive"}`}>
      <ActiveDotWrapper $isActive={isActive} />
    </TooltipComponent>
  );
}

export default ActiveDot;
