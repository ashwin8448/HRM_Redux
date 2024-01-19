import styled from "styled-components";
import colors from "../../core/constants/colors";

const AvatarWrapper = styled.div`
  display: flex;
  background-color: ${colors.BACKGROUND_COLOR};
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  overflow: auto;

  .progressive-img-box{
    margin: 0 25px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
  .img-loader{
    width: 50px;
    height: 50px;
  }
`;

export default AvatarWrapper;
