import styled from "styled-components";
import colors from "../../core/constants/colors";
import { fontWeights } from "../../core/constants/fontStyles";

const DeleteModalWrapper = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  background-color: ${colors.WHITE_COLOR};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  z-index: 3;
  margin: 0 auto;
  max-width: calc(100% - 30px); /* Adjusts the maximum width of the modal */
  max-height: calc(100% - 30px); /* Adjusts the maximum height of the modal */
  overflow: auto;

  .close-btn {
    align-self: end;
    > span {
      color: ${colors.DARK_GRAY_COLOR};
    }
  }

  .confirm-delete {
    width: 100%;
  }
  .employees-name-list {
    width: 100%;
    align-self: flex-start;
    max-height: 300px;
    overflow: auto;
    margin: 0;
    margin-bottom: 10px;
    > * {
      padding: 4px;
    }
  }
  .warning-container {
    display: flex;
    flex-direction: column;
    background-color: ${colors.WARNING_COLOR};
    border-radius: 10px;
    padding: 10px;
    * {
      color: ${colors.WARNING_TEXT_COLOR};
    }
  }
  .warning-heading {
    justify-content: flex-start;
    gap: 5px;
  }
  .warning-heading > * {
    font-weight: ${fontWeights["--font-bold"]};
    margin: 0;
  }
  .warning-text {
    color: ${colors.WARNING_TEXT_COLOR};
    margin: 0;
  }
  .btn-grp {
    gap: 10px;
    margin: 10px 0;
  }
  button {
    gap: 5px;
    flex: 1;
    justify-content: flex-start;
  }
  .delete-btn {
    background-color: ${colors.RED_COLOR};
    * {
      color: ${colors.WHITE_COLOR};
    }

    &:hover {
      background-color: rgba(200, 30, 30, 1) !important;
    }
  }
  .cancel-btn {
    border: 2px solid ${colors.LIGHT_GRAY_COLOR};
  }
  @media only screen and (max-width: 728px) {
    .btn-grp {
      flex-direction: column-reverse;
    }
  }
`;
export default DeleteModalWrapper;
