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
  padding: ${(props) => (props.$isChildren ? `10px` : `0`)};
  border-radius: 5px;
  text-decoration: none;
  gap: 5px;

  // for the transition
  backface-visibility: hidden; // hide the element's back face on rotation

  // a smooth transition effect over a duration of 0.2 sec
  ${(props) => !props.$noTransition && 'transform: translateZ(0) scale(1);'}
  transition: ${(props) => !props.$noTransition && 'transform 0.2s'};

  // disables text selection by the user
  user-select: none;
  -webkit-user-select: none;

  // hint for the user agent to prioritize the processing of touch events
  touch-action: manipulation;

  //TODO: if a different color needs to be added for the icon if there is no text
  /* span {
    color: ${(props) =>
    props.$isChildren ? `${colors.WHITE_COLOR}` : `${colors.SECONDARY_COLOR}`};
  } */
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

  &:hover {
    ${(props) => !props.$noTransition && 'transform: scale(0.95);'} // scales the button larger when hovered
  }
  &:not(:disabled):active {
    ${(props) => !props.$noTransition && 'transform: translateY(-0.125rem);'}
  }

  .count {
    border-left: 1px solid ${colors.LIGHT_GRAY_COLOR};
    margin-left: 10px;
    padding-left: 10px;
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
