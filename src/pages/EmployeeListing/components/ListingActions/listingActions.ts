import styled from "styled-components";
import colors from "../../../../core/constants/colors";
import { fontWeights } from "../../../../core/constants/fontStyles";

const ListingActionsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 10px;
  gap: 20px;
  box-shadow: ${colors.BOX_SHADOW};

  .message-text {
    font-weight: ${fontWeights['--font-semi-bold']} !important;
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

  @media only screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export default ListingActionsWrapper;
