import styled from "styled-components";
import colors from "../../core/constants/colors";

const HeaderWrapper = styled.header`
  background-color: ${colors.WHITE_COLOR};
  border-bottom: 1px solid ${colors.LIGHT_GRAY_COLOR};
  width: 100%;

  .header-content {
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    width: 50px;
    height: auto;
    cursor: pointer;
  }
`;
export default HeaderWrapper;
