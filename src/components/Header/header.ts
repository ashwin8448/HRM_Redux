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
    position: relative;
    &:hover {
      .header-tooltip {
        visibility: visible;
      }
    }
  }
  .page-title {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
    color: ${colors.SECONDARY_COLOR};
  }
  .page-title-mobile {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.5;
    color: ${colors.SECONDARY_COLOR};
  }
  .header-tooltip {
      visibility: hidden;
  }

`;
export default HeaderWrapper;
