import styled from "styled-components";

const ActiveChipWrapper = styled.span<{ $isActive: boolean }>`
  padding: 2px 15px;
  border-radius: 20px;
  border: ${(props) => (props.$isActive ? `2px solid green` : `2px solid red`)};
  color: ${(props) => (props.$isActive ? `  green` : ` red`)};
  background-color: ${(props) => (props.$isActive ? `  #d9ead3` : ` #f2dbdb`)};
`;
export default ActiveChipWrapper;
