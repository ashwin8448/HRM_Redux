import styled from "styled-components";
import colors from "../../../../core/constants/colors";
import { fontWeights } from "../../../../core/constants/fontStyles";

const TableWrapper = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 1370px;

  thead {
    background-color: ${colors.WHITE_COLOR};
  }

  thead,
  tbody {
    width: 100%;
  }

  th p {
    font-weight: ${fontWeights["--font-semi-bold"]};
  }

  tbody tr:hover {
    td {
      background-color: ${colors.EXTRA_LIGHT_GRAY_COLOR};
    }
  }

  th,
  td {
    padding: 10px;
    border-spacing: 0;
    text-align: left;
    width: 100%;
  }

  th {
    border-bottom: 1px solid ${colors.LIGHT_GRAY_COLOR};
  }

  .small-column {
    width: 60px;
  }

  .medium-column {
    width: 100px;
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Adjust the height as needed */
    width: 150vh;
  }

  .no-data {
    text-align: center;
  }

  .alternate-table-row-color {
    background-color: ${colors.WHITE_COLOR};
  }

  .no-border-row {
    border: none;
  }

  .table-loader {
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
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
