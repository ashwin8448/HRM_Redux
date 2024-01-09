import styled from 'styled-components';
import colors from '../../core/constants/colors';

const CheckboxWrapper = styled.input`
  width: 15px;
  height: 15px;
  accent-color: ${colors.PRIMARY_COLOR};
  cursor: pointer;


  &:hover{
    transform: scale(1.25);
  }
`;
export default CheckboxWrapper;
