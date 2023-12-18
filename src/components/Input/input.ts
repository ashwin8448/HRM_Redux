import styled from "styled-components";
import colors from "../../core/constants/colors";

const InputWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .employee-img-container {
    width: 100%;
    display: flex;
    justify-content: center;
    .employee-img {
      display: inline-block;
      position: relative;
      border: 1px solid black;
    }
    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .employee-img{
    border-radius: 10px;
    padding: 10px;
  }
  .employee-img img{
      width: 200px;
      height: 200px;
      border-radius: 50%;
  }
  .subheading {
    white-space: nowrap;
  }

  input {
    padding: 10px;
    font-weight: 500;
    outline: none;
    color: ${colors.SECONDARY_COLOR};
    background-color: white;
    border: 1px solid ${colors.LIGHT_GRAY_COLOR};
    font-size: 14px;
    width: 100%;
    text-overflow: ellipsis;

    &::placeholder {
      color: ${colors.DARK_GRAY_COLOR};
      font-size: 14px;
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
    min-height: 70px; /* Adjust the min-height based on your design */
  }
  .placeholder {
    color: ${colors.DARK_GRAY_COLOR};
    font-size: 14px;
  }
  .radio-list {
    gap: 15px;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .select-border-radius {
    border-radius: 4px;
  }

  @media only screen and (max-width: 728px) {
    .input-field-error {
      input {
        min-width: 100px;
      }
    }
  }
`;
export default InputWrapper;
