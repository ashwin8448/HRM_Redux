import styled from "styled-components";

const ActiveChipWrapper = styled.div<{ $isActive: boolean }>`
  padding: 5px 20px;
  border: ${(props) => (props.$isActive ? `2px solid green` : `2px solid red`)};
  color: ${(props) => (props.$isActive ? `  green` : ` red`)};
  background-color: ${(props) => (props.$isActive ? `  #d9ead3` : ` #f2dbdb`)};
  border-radius:5px;
`;
export default ActiveChipWrapper;
