import styled from 'styled-components';
import colors from '../../core/constants/colors';

const InputErrorWrapper = styled.div`
  display: flex;
  border-radius: 5px;
  gap: 5px !important;
  padding: 5px;
  bottom: 0;

  & > * {
    color: ${colors.RED_COLOR} !important;
    font-size: 10px;
  }
`;
export default InputErrorWrapper;
