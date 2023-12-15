import styled from 'styled-components';
import colors from '../../core/constants/colors';

const EmployeeCardWrapper = styled.div`
  background-color: ${colors.WHITE_COLOR};
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2,
  h3 {
    margin: 0;
  }
  h3 {
    color: ${colors.DARK_GRAY_COLOR};
  }
  .details-section {
    background-color: ${colors.BACKGROUND_COLOR};
    border-radius: 5px;
    padding: 10px;
  }
`;
export default EmployeeCardWrapper;
