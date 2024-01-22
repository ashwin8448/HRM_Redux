import styled from "styled-components";
// import colors from "../../../../../core/constants/colors";

const TableDataWrapper = styled.tr`
  cursor: pointer;
  .employee-data {
    position: relative;
    white-space: nowrap;
  }

  .actions-list {
    justify-content: flex-start;
    gap: 10px;
    button{
      &:hover{
        background-color: transparent ;
      }
    }
  }
`;
export default TableDataWrapper;
