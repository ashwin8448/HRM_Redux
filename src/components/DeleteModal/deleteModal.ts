import styled from "styled-components";
import colors from "../../core/constants/colors";

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

  .delete-modal-heading {
    margin: 0;
    font-weight: 900;
    font-size: 22px;
    line-height: 1.5;
    color: ${colors.SECONDARY_COLOR};
  }
  .warning-container {
    display: flex;
    flex-direction: column;
    background-color: ${colors.WARNING_COLOR};
    border-radius: 10px;
    padding: 10px;
  }
  .warning-heading {
    justify-content: flex-start;
    gap: 5px;
  }
  .warning-heading > * {
    color: ${colors.WARNING_TEXT_COLOR};
    font-weight: 900;
  }
  .warning-text {
    margin: 0 0 10px 0;
    color: ${colors.WARNING_TEXT_COLOR};
  }
  button {
    gap: 5px;
    padding: 10px;
    flex: 1;
    justify-content: flex-start;
  }
  .delete-btn {
    background-color: #e02424 !important;

    &:hover {
      background-color: rgba(200, 30, 30, 1) !important;
    }
  }
  .cancel-btn {
    background-color: ${colors.WHITE_COLOR};
    border: 2px solid ${colors.LIGHT_GRAY_COLOR};
    color: ${colors.DARK_GRAY_COLOR} !important;

    &:hover {
      background-color: rgba(243, 244, 246, 1) !important;
    }
  }
  .close-btn {
    align-self: end;
    background-color: transparent;
    > span {
      color: ${colors.DARK_GRAY_COLOR};
    }
    &:hover {
      background-color: ${colors.LIGHT_GRAY_COLOR};
    }
  }
`;
export default DeleteModalWrapper;
