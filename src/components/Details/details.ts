import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const DetailsWrapper = styled.div<{ $newline?: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.$newline && "column"};
  width: 100%;
  position: relative;

  &:hover {
    .skills-tooltip {
      visibility: visible;
    }
  }

  .content {
    width: 100%;
    padding-left: 10px;
  }

  .title {
    margin-left: 10px;
    color: ${colors.DARK_GRAY_COLOR};
  }

  .description {
    display: flex;
    align-items: center;
  }

  .skills-tooltip {
    visibility: hidden;
  }

  .description {
    display: flex;
    align-items: center;
  }
`;
export default DetailsWrapper;
