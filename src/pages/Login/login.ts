import styled from "styled-components";
import colors from "../../core/constants/colors";
import { media } from "../../core/styles/media";

const LoginLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${`${colors.WHITE_COLOR}`};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 560px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .error {
    color: ${colors.RED_COLOR};
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .button-container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  .primary-btn {
    background-color: ${colors.PRIMARY_COLOR};
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
    border: none;
    color: ${colors.WHITE_COLOR};
  }

  .primary-btn:hover {
    transform: scale(0.95);
  }

  ${media.tablet} {
    width: 75%;
  }
`;
export default LoginLayoutWrapper;
