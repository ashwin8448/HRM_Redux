import styled from "styled-components";
import colors from "../../core/constants/colors";
import { fontSizes, fontWeights } from "../../core/constants/fontStyles";

const ChipListWrapper = styled.div`
  padding-left: 10px;
  width: 100%;
  cursor: pointer;
`;
const ChipWrapper = styled.span<{
  $color?: keyof typeof colors;
  $backgroundColor?: keyof typeof colors;
}>`
  font-size: ${fontSizes["--font-size-s"]};
  font-weight: ${fontWeights["--font-normal"]};
  color: ${(props) => colors[props.$color!]};
  background-color: ${(props) => colors[props.$backgroundColor!]};
  padding: 5px;
  border-radius: 5px;
  margin: 5px 5px 5px 0;
  display: inline-block; /* Ensure each skill card is on a single line */
`;

export { ChipListWrapper, ChipWrapper };
