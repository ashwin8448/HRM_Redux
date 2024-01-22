import styled from "styled-components";
import colors from "../../core/constants/colors";

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  form {
    width: 80%;
    margin: 0 auto;
    max-width: 700px;

    .section {
      margin: 30px 0;
      gap: 0;
    }
  }
  .employee-view-page {
    box-shadow: none;
  }
`;

const Fieldset = styled.fieldset`
  background-color: ${colors.WHITE_COLOR};
  border: none;
  box-shadow: ${colors.BOX_SHADOW};
  min-width: 0;
  border-radius: 15px;
  padding: 20px;
`;
const InputRow = styled.div`
  flex-wrap: wrap;
  gap: 20px;
`;
export { InputRow, Fieldset, FormWrapper };
