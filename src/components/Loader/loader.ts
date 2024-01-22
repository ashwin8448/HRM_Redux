import styled from "styled-components";
import colors from "../../core/constants/colors";

const LoaderWrapper = styled.span`
  width: 48px;
  height: 48px;
  border: 5px dotted ${colors.PRIMARY_COLOR};
  border-radius: 50%;
  animation: rotation 3s linear infinite;

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`
export default LoaderWrapper;
