import styled from "styled-components";
import colors from "../../core/constants/colors";

const SnackbarWrapper = styled.div`
  visibility: hidden;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.WHITE_COLOR};
  color: ${colors.SECONDARY_COLOR};
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  gap: 20px;
  animation: slideUp 0.5s forwards;

  @keyframes slideUp {
    from {
      bottom: -100px; /* Start off-screen */
    }
    to {
      bottom: 30px; /* End position */
    }
  }

  p {
    margin: 0;
  }

  &.open {
    visibility: visible;
  }

  button {
    color: ${colors.SECONDARY_COLOR};
  }
  .deleteBtn {
    color: ${colors.WARNING_TEXT_COLOR};
  }

`;
export default SnackbarWrapper;
