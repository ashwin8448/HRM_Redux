import styled from 'styled-components';
import colors from '../../core/constants/colors';

const ErrorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
  margin: auto;
  

  >*{
    text-align: center;
  }

  .error-title{
    color:${colors.DARK_GRAY_COLOR} !important;
  }
`;
export default ErrorPageWrapper;
