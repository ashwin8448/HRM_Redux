import styled from "styled-components";
import colors from "../../../../core/constants/colors";

const ListingActionsWrapper = styled.div`
  padding: 10px 0;
  gap: 10px;
  margin-bottom: 20px;

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

  .action-grp{
    gap: 5px;
  }
  
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
export default ListingActionsWrapper;
