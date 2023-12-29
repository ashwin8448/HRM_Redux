import styled from "styled-components";
import colors from "../../core/constants/colors";

const ButtonWrapper = styled.button<{
  $isChildren: boolean;
  $noTransition?: boolean;
}>`
  border: ${(props) =>
    props.$isChildren ? `1px solid ${colors.LIGHT_GRAY_COLOR};` : `none`};
  background: ${(props) =>
    props.$isChildren ? `${colors.WHITE_COLOR}` : `transparent`};
  cursor: pointer;
  color: ${colors.SECONDARY_COLOR};
  padding: ${(props) => (props.$isChildren ? `5px 10px` : `0`)};
  border-radius: 5px;
  text-decoration: none;
  gap: 5px;

  // a smooth transition effect over a duration of 0.2 sec
  ${(props) => !props.$noTransition && 'transform: translateZ(0) scale(1);'}
  transition: ${(props) => !props.$noTransition && 'transform 0.2s'};

  // disables text selection by the user
  user-select: none;
  -webkit-user-select: none;

  // hint for the user agent to prioritize the processing of touch events
  touch-action: manipulation;

  > label {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .checkbox {
      opacity: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position:absolute;
      cursor: pointer;
    }
  }

  .material-symbols-outlined{
    font-size:20px;
  }
  
  &:hover {
    ${(props) => !props.$noTransition && 'transform: scale(0.95);'} // scales the button larger when hovered
  }
  &:not(:disabled):active {
    ${(props) => !props.$noTransition && 'transform: translateY(-0.125rem);'}
  }
  &:disabled{
    color:${colors.LIGHT_GRAY_COLOR}
  }

  .btn-loader {
    width: 24px;
    height: 24px;
    margin: auto;
    border-bottom-color: ${colors.WHITE_COLOR};
  }
`;
export default ButtonWrapper;
