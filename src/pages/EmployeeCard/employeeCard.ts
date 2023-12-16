import styled from "styled-components";
import colors from "../../core/constants/colors";

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
    gap: 10px;

    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      font-size: 15px;
      font-weight: 500;
      text-align: center;
    }
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
  .photo-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  }
  .photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
  }
`;
export default EmployeeCardWrapper;
