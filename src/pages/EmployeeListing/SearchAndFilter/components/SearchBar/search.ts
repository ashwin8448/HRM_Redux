import styled from "styled-components";
import colors from "../../../../../core/constants/colors";

const SearchWrapper = styled.div<{ $focus: boolean }>`
  background-color: ${colors.WHITE_COLOR};
  border-radius: 4px;
  padding: 6px;
  border: ${(props) =>
        props.$focus
            ? `1px solid  ${colors.DARK_GRAY_COLOR}`
            : `1px solid ${colors.LIGHT_GRAY_COLOR}`};

  .search-icon {
    color: ${(props) =>
        props.$focus ? `${colors.SECONDARY_COLOR}` : colors.DARK_GRAY_COLOR};
  }
  .search-dropdown-btn-text {
    margin: 0;
    color: ${(props) =>
        props.$focus ? `${colors.SECONDARY_COLOR}` : colors.DARK_GRAY_COLOR};
    font-weight: 700;
  }

  input:focus {
    border: none;
  }

  .search-form {
    flex: 1;
    gap: 10px;
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
  .search-btn {
    padding: 5px;
    gap: 5px !important;
    border-radius: 0;
    background: none;
    border-left: 1px solid ${colors.LIGHT_GRAY_COLOR};
    flex-direction: row-reverse;
  }

  //TODO: css for mobile screens
  /* @media only screen and (max-width: 1200px) {
    width: 100%;
  } */
`;
export default SearchWrapper;
