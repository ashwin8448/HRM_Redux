import styled from "styled-components";
import colors from "../../core/constants/colors";

const ButtonWrapper = styled.button<{ $isChildren: boolean }>`
  border: none;
  background: ${(props) =>
        props.$isChildren ? `${colors.PRIMARY_COLOR}` : `transparent`};
  cursor: pointer;
  color: ${colors.WHITE_COLOR};
  padding: ${(props) => (props.$isChildren ? `16px 20px` : `0`)};
  border-radius: 10px;
  text-decoration: none;
  gap: 5px;

  span {
    color: ${(props) =>
        props.$isChildren
            ? `${colors.WHITE_COLOR}`
            : `${colors.SECONDARY_COLOR}`};
  }
  > label {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-loader {
    width: 24px;
    height: 24px;
    margin: auto;
    border: 5px solid #fff;
    border-bottom-color: ${colors.WHITE_COLOR};
    border-radius: 100%;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
export default ButtonWrapper;
