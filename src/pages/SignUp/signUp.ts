import styled from "styled-components";
import colors from "../../core/constants/colors";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .signup-container {
    display: flex;
    flex-direction: column;
    background-color: ${`${colors.WHITE_COLOR}`};
    border-radius: 10px;
    border: 1px solid ${colors.LIGHT_GRAY_COLOR};
    padding: 20px;
    gap: 20px;
    width: 70%;
  }

  .error {
    color: red;
    margin: 0;
  }

  h2 {
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .buttons-container {
      display: flex;
      justify-content: space-between;
    }
  }
`;
export default LoginWrapper;
