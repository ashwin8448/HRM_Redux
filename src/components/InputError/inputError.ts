import styled from 'styled-components';
import colors from '../../core/constants/colors';
import { fontSizes } from '../../core/constants/fontStyles';

const InputErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  gap: 5px !important;
  padding: 5px;
  bottom: 0;

  & > * {
    color: ${colors.RED_COLOR} !important;
    font-size: ${fontSizes['--font-size-x-s']} !important;
  }
`;
export default InputErrorWrapper;
