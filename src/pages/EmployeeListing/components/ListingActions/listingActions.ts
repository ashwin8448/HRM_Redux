import styled from "styled-components";
import colors from "../../../../core/constants/colors";

const ListingActionsWrapper = styled.div`
display: flex;
  padding: 10px 0;
  gap: 20px;
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
  .main-actions {
    flex: 1;
    gap: 20px;
    width: 100%;
  }
  .action-grp {
    gap: 5px;
  }

  .action-grp:first-child {
    width: 100%;
  }

  .add-new-btn {
    background-color: ${colors.SECONDARY_COLOR};
    color: ${colors.WHITE_COLOR};
  }

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export default ListingActionsWrapper;
