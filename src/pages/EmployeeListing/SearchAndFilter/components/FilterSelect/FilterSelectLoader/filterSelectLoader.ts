import styled from "styled-components";
import colors from "../../../../../../core/constants/colors";

const FilterSelectLoaderWrapper = styled.div`
  position: relative;
  justify-content: center;
  gap: 5px;
`;
const LoadingText = styled.span`
  margin-left: 10px;
  font-weight: bold;
  color: ${colors.PRIMARY_COLOR};
`;


export { FilterSelectLoaderWrapper, LoadingText };
