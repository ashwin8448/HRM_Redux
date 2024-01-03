import ActiveDotWrapper from "./activeDot.ts";

function ActiveDot({ isActive }: { isActive: boolean }) {

  return <ActiveDotWrapper $isActive={isActive}></ActiveDotWrapper>;
}

export default ActiveDot;
