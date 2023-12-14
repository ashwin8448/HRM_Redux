import styled from "styled-components";
import colors from "../../../core/constants/colors";

const EmployeeTableActionsWrapper = styled.div`
  border-top: 1px solid ${colors.LIGHT_GRAY_COLOR};

  .btn-grp-view {
    justify-content: flex-start;
    padding: 1px;
    border-radius: 5px;
    background-color: ${colors.EXTRA_LIGHT_GRAY_COLOR};
    > button {
      background-color: transparent;
      border: none;
      &.active {
        background-color: ${colors.WHITE_COLOR};
      }
    }
  }
  .delete-btn-grp {
    gap: 10px;
    > .delete-btn {
      > span {
        color: ${colors.RED_COLOR};
      }
      > label {
        color: ${colors.RED_COLOR};
      }
    }
  }
`;
export default EmployeeTableActionsWrapper;
