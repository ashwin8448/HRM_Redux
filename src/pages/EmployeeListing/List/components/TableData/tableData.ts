import styled from "styled-components";
// import colors from "../../../../../core/constants/colors";

const TableDataWrapper = styled.tr`
  cursor: pointer;
  .employee-data {
    position: relative;
    white-space: nowrap;
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
