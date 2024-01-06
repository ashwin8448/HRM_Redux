import styled from "styled-components";
import colors from "../../core/constants/colors";

const ActiveDotWrapper = styled.span<{ $isActive: boolean }>`
  background: ${(props) =>
    props.$isActive ? colors.GREEN_COLOR : colors.RED_COLOR};
  border-radius: 50%;
  margin: 10px;
  height: 10px;
  width: 10px;
  transform:  scale(1);
  transition: transform 0.2s;
  z-index: 0;
  cursor: pointer;
  
  &:hover {
  transform: scale(0.9);
  }
`;
export default ActiveDotWrapper;
