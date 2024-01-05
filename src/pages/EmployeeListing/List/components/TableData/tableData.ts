import styled from "styled-components";
import colors from "../../../../../core/constants/colors";

const TableDataWrapper = styled.tr`
  .employee-data {
    position: relative;
    white-space: nowrap;
  }
  .employee-view {
    color: ${colors.LINK_COLOR};
    cursor: pointer;

    &:active {
      text-decoration: underline;
    }
    &:hover {
      color: ${colors.LINK_HIGHLIGHT_COLOR};
      text-decoration: underline;
    }
  }

  .skills-data {
    position: relative;
    &:hover {
      .skills-tooltip {
        visibility: visible;
      }
    }
  }
  .skills-tooltip {
    visibility: hidden;
  }

   .actions-list {
    justify-content: center;
  }
  button {
    flex-direction: row-reverse;
    background: none;
    padding: 0;
    border-radius: 0;
  }
`;
export default TableDataWrapper;
