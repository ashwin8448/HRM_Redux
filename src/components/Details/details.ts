import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const DetailsWrapper = styled.div<{ $newline?: boolean }>`
  justify-content: flex-start !important;
  /* border: 1px solid ${colors.LIGHT_GRAY_COLOR}; */
  display: flex;
  flex-direction: ${(props) => props.$newline && "column"};

  .heading {
    padding: 5px;
    border-right: 1px solid ${colors.LIGHT_GRAY_COLOR};
    width: 30%;
    > * {
      display: inline-block;
      vertical-align: bottom; /* Align elements at the bottom */
    }
  }

  .mobile {
    width: auto;
    .title {
      margin-left: 0;
    }
  }

  .content {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 0 10px 0;
  }
  .title {
    margin-left: 10px;
    font-size: 14px;
    color: ${colors.DARK_GRAY_COLOR};
  }

  .description {
    display: flex;
    align-items: center;
  }
`;
export default DetailsWrapper;
