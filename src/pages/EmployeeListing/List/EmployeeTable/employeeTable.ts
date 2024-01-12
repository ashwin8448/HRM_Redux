import styled from "styled-components";
import colors from "../../../../core/constants/colors";
import { fontWeights } from "../../../../core/constants/fontStyles";

const TableWrapper = styled.table<{ $isAdmin: boolean }>`
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 1370px;

  thead,
  tbody {
    width: 100%;
  }

  th p {
    font-weight: ${fontWeights["--font-semi-bold"]};
  }

  tbody tr:hover {
    .loader {
      background-color: inherit !important;
    }
    td {
      background-color: ${colors.EXTRA_LIGHT_GRAY_COLOR} !important;
    }
  }

  th,
  td {
    border-spacing: 0;
    text-align: left;
    width: 100%;
    padding:5px 15px;  
  }

  th {
    border-bottom: 1px solid ${colors.LIGHT_GRAY_COLOR};
    background-color: ${colors.WHITE_COLOR};
  }

  .small-column {
    width: 60px;
  }
  .medium-column{
    width: 100px;
  }

  td {
    background-color: ${colors.BACKGROUND_COLOR};
  }
  .alternate-table-row-color {
    td {
      background-color: ${colors.WHITE_COLOR};
    }
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
    ${(props) =>
      props.$isAdmin &&
      `
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
        border-right: 1px solid ${colors.LIGHT_GRAY_COLOR} !important;
      }
    `}
    ${(props) =>
      !props.$isAdmin &&
      `
      th:first-child,
      td:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
        border-right: 1px solid ${colors.LIGHT_GRAY_COLOR} !important;
      }

    `}
  }
`;
export default TableWrapper;
