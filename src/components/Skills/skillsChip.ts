import styled from "styled-components";
import colors from "../../core/constants/colors";
import { fontSizes, fontWeights } from "../../core/constants/fontStyles";

const SkillsListWrapper = styled.div`
  padding-left: 10px;
`;
const SkillsChipWrapper = styled.span<{ $color: keyof typeof colors, $backgroundColor: keyof typeof colors }>`
  font-size: ${fontSizes["--font-size-s"]};
  font-weight: ${fontWeights["--font-normal"]};
  color: ${(props) => colors[props.$color]};
  background-color: ${(props) => colors[props.$backgroundColor]};
  padding: 5px;
  border-radius: 5px;
  margin: 5px 5px 5px 0;
  display: inline-block; /* Ensure each skill card is on a single line */
`;

export { SkillsListWrapper, SkillsChipWrapper };
