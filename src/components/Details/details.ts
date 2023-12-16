import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const DetailsWrapper = styled.div<{ $newline?: boolean; $skill?: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.$newline && 'column'};
  width: ${(props) => ((props.$skill || !props.$newline) && '100%' )};
  position: relative;

  .content {
    width: 100%;
    font-size: 14px;
    font-weight:  ${(props) => props.$newline ? `500`:`600`};
    color: ${(props) => !props.$newline ? `${colors.SECONDARY_COLOR}`:`${colors.DARK_GRAY_COLOR}`};
    padding: 5px 0 10px 0;
    margin: ${(props) => props.$newline && '0'};
    text-align: ${(props) => props.$newline && 'center'};
  }

  .title {
    margin-left: ${(props) => !props.$newline && '10px'};
    font-size: 14px;
    color: ${(props) => props.$newline ? `${colors.SECONDARY_COLOR}`:`${colors.DARK_GRAY_COLOR}`};
    font-weight:  ${(props) => props.$newline ? `700`:`500`};
  }

  .description {
    display: flex;
    align-items: center;
  }
`;
export default DetailsWrapper;
