import styled from "styled-components";
import colors from "../../../../core/constants/colors";
import { fontSizes, fontWeights } from "../../../../core/constants/fontStyles";

const EmployeeCardWrapper = styled.div`
  background-color: ${colors.WHITE_COLOR};
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

  .title-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .title {
      font-size: ${fontSizes["--font-size-md"]};
      font-weight: ${fontWeights["--font-bold"]};
      text-align: center;
      color: ${colors.SECONDARY_COLOR};
    }
    .content {
      text-align: center;
    }

    .description {
      justify-content: center;
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
`;
export default EmployeeCardWrapper;
