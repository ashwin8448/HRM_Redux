import styled from "styled-components";
import colors from "../../core/constants/colors";

const LoginLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${`${colors.WHITE_COLOR}`};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login-btn {
    background: none;
    border: none;
    *{
      color:${colors.DARK_PRIMARY_COLOR}
    }
  }

  .error {
    color: ${colors.RED_COLOR};
    margin: 0;
    margin-top: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btn-grp {
    margin-top: 10px;
  }

  @media only screen and (max-width: 728px) {
    .btn-grp {
      > button {
        justify-content: center;
      }
      flex-direction: column-reverse;
    }
    .alternative-msg {
      text-align: center;
      flex-direction: column;
    }
  }
`;
export default LoginLayoutWrapper;
