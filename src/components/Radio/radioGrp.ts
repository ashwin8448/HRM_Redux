import styled from "styled-components";
import colors from "../../core/constants/colors";

const RadioWrapper = styled.div`
  gap: 5px !important;

  .error-input {
    accent-color: ${colors.RED_COLOR};
  }
`;
export default RadioWrapper;
