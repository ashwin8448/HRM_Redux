import styled from "styled-components";
import colors from "../../../core/constants/colors";

const TableWrapper = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 1370px;

  thead,
  tbody {
    width: 100%;
  }
  thead {
    font-size: 16px;
    background-color: ${colors.WHITE_COLOR};
  }
  tr:nth-child(2n) {
    td:nth-child(1),
    td:nth-child(2) {
      background-color: ${colors.WHITE_COLOR};
    }
  }
  tr:nth-child(2n + 1) {
    td:nth-child(1),
    td:nth-child(2) {
      background-color: ${colors.BACKGROUND_COLOR};
    }
  }
  th {
    border-bottom: 1px solid ${colors.LIGHT_GRAY_COLOR};
    &:first-child,
    &:nth-child(2) {
      background-color: ${colors.WHITE_COLOR};
    }
  }
  th,
  td {
    padding: 10px;
    border-spacing: 0;
    text-align: left;
    width: 100%;
  }
  th:first-child,
  td:first-child,
  th:nth-child(2),
  td:nth-child(2) {
    width: 60px;
  }
  th:nth-child(8),
  td:nth-child(8) {
    width: 100px;
  }
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Adjust the height as needed */
    width: 150vh;
  }
  .actions-list {
    justify-content: center;
    gap: 5px;
  }
  .no-data {
    text-align: center;
  }
  .alternate-table-row-color {
    background-color: ${colors.WHITE_COLOR};
  }
  .pagination-bar {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .no-border-row {
    border: none;
  }

  @media only screen and (max-width: 1200px) {
    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
      z-index: 1;
    }
    th:nth-child(2),
    td:nth-child(2) {
      position: sticky;
      left: 60px;
      z-index: 1;
    }
    th:nth-child(2),
    td:nth-child(2) {
      border-right: 1px solid ${colors.LIGHT_GRAY_COLOR} !important;
    }
  }
`;
export default TableWrapper;
