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
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
  .img-loader{
    width: 100px;
    height: 100px;
  }
`;

export default AvatarWrapper;
