import ActiveChipWrapper from "./activeChip";

function ActiveChip({ isActive }: { isActive: boolean }) {
  let chipTxt = isActive ? "Active" : "Inactive";

  return <ActiveChipWrapper $isActive={isActive}>{chipTxt}</ActiveChipWrapper>;
}

export default ActiveChip;
