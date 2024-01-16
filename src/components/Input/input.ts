import styled from "styled-components";
import colors from "../../core/constants/colors";
import { fontSizes, fontWeights } from "../../core/constants/fontStyles";

const InputWrapper = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .employee-img-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  input {
    padding: 10px;
    font-weight: ${fontWeights["--font-normal"]};
    outline: none;
    color: ${colors.SECONDARY_COLOR};
    background-color: white;
    border: 1px solid ${colors.LIGHT_GRAY_COLOR};
    font-size: ${fontSizes["--font-size-s"]};
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 5px;

    &::placeholder {
      color: ${colors.DARK_GRAY_COLOR};
      font-size: ${fontSizes["--font-size-s"]};
    }
    &:focus {
      border: 1px solid ${colors.DARK_GRAY_COLOR};
    }
  }

  .input-border-error,
  .input-border-error:focus {
    border: 1px solid red;
  }
  .input-field-error {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 65px; /* Adjust the min-height based on your design */
  }
  .radio-list {
    gap: 15px;
    justify-content: flex-start;
  }

  .select-border-radius {
    border-radius: 4px;
  }

  @media only screen and (max-width: 480px) {
    .radio-list {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
export default InputWrapper;
