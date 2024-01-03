import styled from 'styled-components';
import colors from '../../core/constants/colors';

const ActiveDotWrapper = styled.span<{ $isActive: boolean }>`
  background: ${(props) =>
    props.$isActive ? colors.GREEN_COLOR : colors.RED_COLOR};
  border-radius: 50%;
  margin: 10px;
  height: 10px;
  width: 10px;

  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  /* animation: pulse 2s infinite; */

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;
export default ActiveDotWrapper;
