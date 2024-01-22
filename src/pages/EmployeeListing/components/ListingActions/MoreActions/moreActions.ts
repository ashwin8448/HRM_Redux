import styled from "styled-components";
import colors from "../../../../../core/constants/colors";
import { fontWeights } from "../../../../../core/constants/fontStyles";

const DeleteBtnWrapper = styled.div<{ $disabled: boolean }>`
  gap: 10px;
  > button {
    color: ${(props) =>
      !props.$disabled ? `${colors.RED_COLOR}` : `${colors.LIGHT_GRAY_COLOR}`};

    > label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap:10px;

      p{
        color:${colors.WARNING_TEXT_COLOR};
        font-weight:${fontWeights["--font-bold"]}
      }
    }
  }

  .message-text {
    margin-left:20px
  }
`;
export default DeleteBtnWrapper;
