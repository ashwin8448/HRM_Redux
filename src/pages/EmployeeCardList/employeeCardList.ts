import styled from 'styled-components';
import colors from '../../core/constants/colors';

const EmployeeCardListWrapper = styled.div`
  display: grid;
  grid-gap: 20px 30px;
  grid-template-columns: repeat(3, minmax(calc(100%/3), 1fr));
`;
export default EmployeeCardListWrapper;
