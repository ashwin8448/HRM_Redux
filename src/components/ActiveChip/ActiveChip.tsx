import ActiveChipWrapper from "./activeChip";

function ActiveChip({ isActive }: { isActive: boolean }) {
  const chipTxt = isActive ? "Active" : "Inactive";

  return <ActiveChipWrapper $isActive={isActive}>{chipTxt}</ActiveChipWrapper>;
}

export default ActiveChip;
