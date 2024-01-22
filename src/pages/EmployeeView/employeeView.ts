import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const EmployeeViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.WHITE_COLOR};
  border: none;
  box-shadow: ${colors.BOX_SHADOW};
  border-radius: 10px;
  margin: 0 auto 20px;
  max-width: 700px;
  padding: 25px;
  gap: 30px;
  position: relative;
  width: 100%;
`;
export default EmployeeViewWrapper;
