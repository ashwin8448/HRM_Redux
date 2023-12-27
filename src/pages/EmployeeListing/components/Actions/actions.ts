import styled from "styled-components";
import colors from "../../../../core/constants/colors";

const ActionsWrapper = styled.div`
  border-top: 1px solid ${colors.LIGHT_GRAY_COLOR};

  .message-text {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    color: ${colors.SECONDARY_COLOR};
  }
  .btn-grp-view {
    justify-content: flex-start;
    padding: 2px;
    border-radius: 5px;
    background-color: ${colors.EXTRA_LIGHT_GRAY_COLOR};
    gap: 5px;
    > button {
      background-color: transparent;
      border: none;
      padding: 5px;
      &.active {
        background-color: ${colors.WHITE_COLOR};
      }
    }
  }
`;
const DeleteBtnWrapper = styled.div<{ $disabled: boolean }>`
  position: relative;
  gap: 10px;
  > button {
    color: ${(props) =>
      !props.$disabled ? `${colors.RED_COLOR}` : `${colors.LIGHT_GRAY_COLOR}`};
  }
  &:hover {
    .dlt-btn-tooltip {
      visibility: visible;
    }
  }
  .dlt-btn-tooltip {
    margin: 10px;
    visibility: hidden;
  }
`;
export { ActionsWrapper, DeleteBtnWrapper };
