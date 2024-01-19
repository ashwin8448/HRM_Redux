import styled from "styled-components";
import colors from "../../core/constants/colors";
import { fontSizes } from "../../core/constants/fontStyles";

const HeaderWrapper = styled.header`
  background-color: ${colors.WHITE_COLOR};
  box-shadow: ${colors.BOX_SHADOW};
  width: 100%;

  .header-content {
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: ${fontSizes["--font-size-lg"]};
  }
  .logo {
    width: 50px;
    height: auto;
    cursor: pointer;
  }

  .user-container {
    display: flex;
    gap: 30px;

    .image-container {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        border-radius: 50%;
        width: 35px;
        height: 35px;
      }
      .img-loader{
        width: 35px;
        height: 35px;
        border-width:3px;
      }
      .profile-error {
        color: ${colors.RED_COLOR};
        position: absolute;
        top: 17px;
        left: 25px;
        z-index: -1;
      }
    }
    .logout-btn {
      padding: 10px;
    }
  }

  .header-tooltip {
    visibility: hidden;
  }
`;
export default HeaderWrapper;
