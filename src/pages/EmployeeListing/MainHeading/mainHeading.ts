import styled from "styled-components";
import colors from "../../../core/constants/colors";

const SectionWrapper = styled.section`
  padding: 20px 0;
  align-items: center !important;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .page-title-mobile {
    margin: 0;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.5;
    color: ${colors.SECONDARY_COLOR};
  }
`;
export default SectionWrapper;
