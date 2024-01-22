import styled from 'styled-components';
import colors from '../../../../../core/constants/colors';

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  


  .pagination-item {
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: ${colors.SECONDARY_COLOR};
    display: flex;
    align-items: center;
    border-radius: 25px;

    &.dots:hover {
      background-color: transparent;
      cursor: default;
    }
    &:hover {
      background-color: ${colors.BACKGROUND_COLOR_HOVER};
      cursor: pointer;

      .arrow {
        color: ${colors.PRIMARY_COLOR};
      }
    }

    &.selected {
      background-color: ${colors.PRIMARY_COLOR};
      color: ${colors.WHITE_COLOR};
    }

    .arrow {
      color: ${colors.DARK_GRAY_COLOR};
      font-size: 24px;
    }

    &.disabled {
      pointer-events: none;

      .arrow {
        color: ${colors.LIGHT_GRAY_COLOR};
      }

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }
`;

export default PaginationWrapper;
