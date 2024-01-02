import { styled } from "styled-components";
import colors from "../../core/constants/colors";
import { fontSizes, fontWeights } from "../../core/constants/fontStyles";

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
    font-size: ${fontSizes["--font-size-s"]};
    font-weight: ${fontWeights["--font-normal"]};
    padding-left: 10px;
  }

  .title {
    margin-left: 10px;
    font-size: ${fontSizes["--font-size-s"]};
    color: ${colors.DARK_GRAY_COLOR};
    font-weight: ${fontWeights["--font-normal"]};
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
