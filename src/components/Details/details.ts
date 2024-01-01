import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const DetailsWrapper = styled.div<{ $newline?: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.$newline && 'column'};
  width: 100%;
  position: relative;

  &:hover{
    .skills-tooltip{
      visibility:visible;
  }
  }

  .content {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    padding-left: 10px;
  }

  .title {
    margin-left: 10px;
    font-size: 14px;
    color: ${colors.DARK_GRAY_COLOR};
    font-weight:  500;
  }

  .description {
    display: flex;
    align-items: center;
  }

  .skills-tooltip{
    visibility:hidden;
  }

  .description {
    display: flex;
    align-items: center;
  }
`;
export default DetailsWrapper;
