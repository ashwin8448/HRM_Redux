import styled from "styled-components";
import colors from "../../core/constants/colors";
import { fontSizes } from "../../core/constants/fontStyles";

const FooterWrapper = styled.footer`
    margin: auto;
    bottom: 0;
    width: 100%;
    background-color:  ${colors.WHITE_COLOR};    
    border-top: 1px solid ${colors.LIGHT_GRAY_COLOR};
    padding: 20px 0 20px 0;
    text-align: center;
    font-size: ${fontSizes["--font-size-s"]};
  
  `;
export default FooterWrapper;
