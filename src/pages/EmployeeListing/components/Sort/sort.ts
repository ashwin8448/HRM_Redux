import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  min-width: 160px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 5px 0;
  border-radius: 10px;
  
  .item {
    cursor: pointer;
    padding: 5px 15px;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  /* sort specific */
  .sort-enable-icon {
    color: #4dd15f;
  }

  /* actions dropdown specific */
  button {
    width: 100%;
    border: none;
  }
  .export-btn{
    text-decoration: none;
    width:100%;
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
    background-color: #f5f5f5;
  }
  
  .order{
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
