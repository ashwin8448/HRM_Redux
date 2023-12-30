import styled from "styled-components";
import colors from "../../core/constants/colors";

const PhotoInputWrapper = styled.div`
display: flex;
justify-content: center;
  label {
    border: ${`1px solid ${colors.LIGHT_GRAY_COLOR}`};
    background: ${`${colors.WHITE_COLOR}`};
    color: ${colors.SECONDARY_COLOR};
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
  }

  input[type="file"] {
    display: none;
  }
`;

export default PhotoInputWrapper;
