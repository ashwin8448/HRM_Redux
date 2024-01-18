import styled, { css, keyframes } from "styled-components";

const loaderRotation = keyframes`
0% {transform:rotate(0deg)}
100% {transform:rotate(360deg)}`;

const ImgWrapper = styled.img<{ $loaded: boolean }>`
  ${(props) =>
    !props.$loaded &&
    css`
      animation: ${loaderRotation} 5000ms infinite;
    `};
`;

export default ImgWrapper;
