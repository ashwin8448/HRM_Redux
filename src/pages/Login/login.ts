import styled from "styled-components";
import colors from "../../core/constants/colors";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${`${colors.WHITE_COLOR}`};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  gap: 20px;
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login-btn {
    border: none;
    color: ${colors.DARK_PRIMARY_COLOR};
  }

  .error {
    color: red;
    margin: 0;
    margin-top: 10px;
  }

  h2 {
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
export default LoginWrapper;
