import styled from "styled-components";
import colors from "../../../../core/constants/colors";

const EmployeeCardWrapper = styled.div`
  background-color: ${colors.WHITE_COLOR};
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  .employee-intro {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .intro-title {
      gap: 10px;
      text-align: center;

      > * {
        margin: 0;
      }
    }
  }

  .edit-btn{
    padding: 5px;
  } 
  .title-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
  }

  .details-section {
    background-color: ${colors.BACKGROUND_COLOR};
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .company-details {
    border-bottom: 1px solid ${colors.LIGHT_GRAY_COLOR};
    padding-bottom: 10px;
    width: 100%;
    gap: 10px;

    @media only screen and (min-width: 728px) and (max-width: 860px) {
      flex-direction: column;
    }
  }
`;
export default EmployeeCardWrapper;
