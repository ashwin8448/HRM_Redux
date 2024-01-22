import styled from "styled-components";
import colors from "../../../../core/constants/colors";

const FilterWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  height: 100%;
  padding: 20px;
  width: 40%;
  z-index: 5;
  top: 0;
  right: 0;
  ${({ $visible }) =>
    $visible ? "transform: translateX(0);" : "transform: translateX(100%);"}
  background-color:  ${colors.WHITE_COLOR};
  overflow-x: hidden;
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;

  .close-btn {
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    width: 45%;
  }

  @media only screen and (max-width: 425px) {
    width: 50%;
  }
`;
export default FilterWrapper;
