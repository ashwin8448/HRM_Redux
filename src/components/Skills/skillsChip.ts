import styled from "styled-components";
import colors from "../../core/constants/colors";

const SkillsListWrapper = styled.div`
  padding-left: 10px;
`;
const SkillsChipWrapper = styled.span`
  font-size: 14px;
  font-weight: 500;
  background-color: ${colors.PRIMARY_COLOR};
  padding: 5px;
  border-radius: 5px;
  color: ${colors.WHITE_COLOR};
  margin: 5px 5px 5px 0;
  display: inline-block; /* Ensure each skill card is on a single line */
`;

export { SkillsListWrapper, SkillsChipWrapper };