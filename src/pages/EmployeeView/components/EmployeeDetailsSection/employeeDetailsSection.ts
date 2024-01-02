import styled from "styled-components";
import { fontSizes } from "../../../../core/constants/fontStyles";

const EmployeeDetailsSectionWrapper = styled.div`
  width: 100%;

  .detail-element {
    flex-direction: column;
    gap: 10px;
  }
  .details-heading {
    margin: 0 0 15px 0;
    font-size: ${fontSizes['--font-size-md']};
  }
  .skills-container {
    width: 100%;
  }
  .description {
    width: 100%;
  }
`;

export default EmployeeDetailsSectionWrapper;
