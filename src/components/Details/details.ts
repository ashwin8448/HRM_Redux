import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const DetailsWrapper = styled.div<{ $newline?: boolean; $skill?: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.$newline && "column"};
  width: ${(props) => (props.$skill || !props.$newline ? "100%" : "49%")};

  .content {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 0 10px 0;
  }

  .title {
    font-size: 14px;
    color: ${colors.DARK_GRAY_COLOR};
  }

  .description {
    display: flex;
    align-items: center;
  }
`;
export default DetailsWrapper;
