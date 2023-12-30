import styled from "styled-components";
import colors from "../../core/constants/colors";

const SearchWrapper = styled.div<{ $focus: boolean }>`
  background-color: ${colors.WHITE_COLOR};
  border-radius: 10px;
  padding: 6px;
  width: 100%;
  border: ${(props) =>
    props.$focus
      ? `1px solid  ${colors.DARK_GRAY_COLOR}`
      : `1px solid ${colors.LIGHT_GRAY_COLOR}`};

  .search-icon {
    color: ${(props) =>
      props.$focus ? `${colors.SECONDARY_COLOR}` : colors.DARK_GRAY_COLOR};
  }

  input:focus {
    border: none;
  }

  .search-form {
    flex: 1;
    gap: 10px;
    width: 100%;
  }

  .search-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: 0;
    text-decoration: none;
    font-size: 16px;
    color: ${colors.SECONDARY_COLOR};
    padding: 0;

    &::placeholder {
      font-size: 14px;
      color: ${colors.DARK_GRAY_COLOR};
    }
  }
`;
export default SearchWrapper;
