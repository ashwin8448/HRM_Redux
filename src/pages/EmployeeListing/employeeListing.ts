import styled from "styled-components";
import colors from "../../core/constants/colors";

const EmployeeListingWrapper = styled.div`
  .border {
    border-radius: 10px;
    border: 1px solid ${colors.LIGHT_GRAY_COLOR};
  }
  .border-top {
    border-top: 1px solid ${colors.LIGHT_GRAY_COLOR};
  }
  .btn-grp-view {
    justify-content: flex-start;
    padding: 1px;
    border-radius: 5px;
    background-color: ${colors.LIGHT_GRAY_COLOR};
    /* >button{
      background-color: transparent;
    } */
  }
  .delete-btn-grp {
    gap: 10px;
    > button {
      > span {
        color: ${colors.RED_COLOR}
      }
      > label {
        color: ${colors.RED_COLOR}
      }
    }
  }
`;
export default EmployeeListingWrapper;
