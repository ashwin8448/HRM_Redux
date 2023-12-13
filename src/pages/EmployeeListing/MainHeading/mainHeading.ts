import styled from "styled-components";
import colors from "../../../core/constants/colors";

const SectionWrapper = styled.section`
  padding: 15px;
  align-items: center !important;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${colors.LIGHT_GRAY_COLOR};
  margin-bottom: 10px;

  //TODO: make a common page title
  .page-title {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
    color: ${colors.SECONDARY_COLOR};
  }
  .page-title-mobile {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.5;
    color: ${colors.SECONDARY_COLOR};
  }
`;
export default SectionWrapper;
