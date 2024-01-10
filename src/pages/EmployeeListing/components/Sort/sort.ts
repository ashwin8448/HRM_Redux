import styled from "styled-components";
import colors from "../../../../core/constants/colors";

const DropdownWrapper = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  min-width: 160px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.LIGHT_GRAY_COLOR};
  background-color: ${colors.WHITE_COLOR};
  padding: 5px 0;
  border-radius: 10px;

  .item {
    cursor: pointer;
    padding: 5px 25px ;

    &:hover {
      background-color: ${colors.BACKGROUND_COLOR_HOVER};
    }
  }

  /* sort specific */
  .sort-enable-icon {
    color: ${colors.GREEN_COLOR};
  }

  /* actions dropdown specific */
  button {
    width: 100%;
    border: none;
    width:100%;
  }
  .export-btn {
    text-decoration: none;
    width: 100%;
  }
`;
const SortByDropdownItem = styled.span<{ $sortBySelection: boolean }>`
  .sort-enable-icon {
    visibility: ${(props) => (props.$sortBySelection ? `visible` : `hidden`)};
  }

  &:hover {
    .sort-enable-icon {
      visibility: visible;
    }
  }
`;

const SortOrderDropdownItemWrapper = styled.span<{
  $sortOrderSelection: boolean;
}>`
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: ${colors.BACKGROUND_COLOR_HOVER};
  }

  .order {
    gap: 4px;
  }
  .sort-enable-icon {
    visibility: ${(props) =>
      props.$sortOrderSelection ? `visible` : `hidden`};
  }

  &:hover {
    .sort-enable-icon {
      visibility: visible;
    }
  }
`;
export { DropdownWrapper, SortByDropdownItem, SortOrderDropdownItemWrapper };
