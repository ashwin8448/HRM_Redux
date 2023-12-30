import { createGlobalStyle } from "styled-components";
import ManropeBold from "../fonts/Manrope-Bold.ttf";
import ManropeMedium from "../fonts/Manrope-Medium.ttf";
import ManropeLight from "../fonts/Manrope-Light.ttf";
import colors from "../constants/colors";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
@font-face {
  font-family: 'Manrope';
  src: local('Manrope'),
  url(${ManropeBold}) ,
  url(${ManropeMedium}),
  url(${ManropeLight});
  font-weight: 700;
  font-weight: 500;
  font-weight: 300;
}
html {
  height: 100%;
}
body {
  margin: 0 auto;
  padding: 0;
  background-color: ${colors.BACKGROUND_COLOR};
  font-family: "Manrope";
  height:100%;
}
#root{
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.global-width {
  max-width: 1400px;
}
.global-padding{
  padding:15px;
}
.page-title {
  margin: 0;
  font-size: 35px;
  font-weight: 700;
  line-height: 1.5;
  color: ${colors.SECONDARY_COLOR};
}
.page-title-mobile {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.5;
    color: ${colors.SECONDARY_COLOR};
  }
.subheading {
  margin: 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.SECONDARY_COLOR};
}
.common-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rotate {
  transform: rotate(180deg);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.SECONDARY_COLOR};
  opacity: 0.5;
  z-index: 2;
  pointer-events: auto; /* Disable pointer events on the overlay so that clicks pass through */
  transition: 0.5s ease; 
}
.main-section {
  flex-grow:1;
  min-height:100%;
  margin-inline: auto;
  width: 100%
}
.rotate {
  transform: rotate(180deg);
}
.table-overflow-scroll{
  border: 1px solid  #D3D3D3;
}
.overflow-ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}
.infinite-scroll-loader-div {
    margin: 20px;
    width: 100%;
}
.infinite-scroll-loader {
    justify-content: center !important;
    margin: 0 auto;
}

//for loading
.center-loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 1400px) {
  .table-overflow-scroll {
    overflow-x: auto;
  }
}
`;

export default GlobalStyle;
