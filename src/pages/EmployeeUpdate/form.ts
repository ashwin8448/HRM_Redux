import styled from "styled-components";
import colors from "../../core/constants/colors";

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  form {
    width: 80%;
  }
`;

const Fieldset = styled.fieldset`
  margin: 30px 0;
  background-color: ${colors.WHITE_COLOR};
  border: 1px solid ${colors.DARK_GRAY_COLOR};
  min-width: 0;
  border-radius: 15px;
  padding: 20px;

  .submit-btn {
    margin: 30px;
  }

  .form-section-heading {
    margin-top: 0;
    color: #24262d;
  }

`;
const InputRow = styled.div`
  flex-wrap: wrap;
  gap: 20px;
`;
export { InputRow, Fieldset, FormWrapper };
