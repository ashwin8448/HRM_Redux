import styled from "styled-components";
import colors from "../../core/constants/colors";

const ButtonWrapper = styled.button<{
  $isChildren: boolean;
  $noTransition?: boolean;
  $notification?: boolean;
}>`
  position: relative; /* Make the position relative to enable absolute positioning */
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
  ${(props) => !props.$noTransition && "transform: translateZ(0) scale(1);"}
  transition: ${(props) => !props.$noTransition && "transform 0.2s"};

  // disables text selection by the user
  user-select: none;
  -webkit-user-select: none;

  // hint for the user agent to prioritize the processing of touch events
  touch-action: manipulation;

  ${(props) =>
    props.$notification &&
    /* Position the dot in the top right corner */
    `
      &:after {
        content: "";
        position: absolute;
        top: -5px; 
        right: 0; 
        width: 10px;
        height: 10px;
        background-color: ${colors.PRIMARY_COLOR}; 
        border-radius: 50%;
      }
    `}

  > label {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    width: 100%;
    .checkbox {
      opacity: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: pointer;
    }
  }

  &:hover {
    background-color: ${colors.BACKGROUND_COLOR_HOVER};
    ${(props) =>
      !props.$noTransition &&
      "transform: scale(0.95);"}// scales the button larger when hovered
  }
  &:not(:disabled):active {
    ${(props) => !props.$noTransition && "transform: translateY(-0.125rem);"}
  }
  &:disabled * {
    color: ${colors.LIGHT_GRAY_COLOR};
  }

  &.primary-btn {
    background-color: ${colors.PRIMARY_COLOR};
    > * {
      color: ${colors.WHITE_COLOR};
    }
  }

  &.very-important-btn {
    background-color: ${colors.DARK_PRIMARY_COLOR};
    > * {
      color: ${colors.WHITE_COLOR};
    }
  }

  .btn-loader {
    width: 24px;
    height: 24px;
    margin: auto;
    border-bottom-color: ${colors.WHITE_COLOR};
  }
`;
export default ButtonWrapper;
