import styled from "styled-components";
import colors from "../../../core/constants/colors";

const ActionsWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${colors.LIGHT_GRAY_COLOR};
  background-color: ${colors.WHITE_COLOR};
  align-items: flex-end !important;
  gap: 10px;

  .filter-title {
    align-self: center;
  }
  .form-flex-align {
    align-items: flex-end !important;
    gap: 15px;
  }

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    > * {
      width: 100%;
    }
    > button {
      align-self: flex-start;
      width: fit-content;
    }
    .form-flex-align {
      flex-direction: column;
    }
  }
`;
export default ActionsWrapper;
