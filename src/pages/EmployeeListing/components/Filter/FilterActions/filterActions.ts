import styled from "styled-components";
import colors from "../../../../../core/constants/colors";

const FilterActionsWrapper = styled.div`
  border-radius: 10px;
  background-color: ${colors.WHITE_COLOR};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .btn-grp {
    margin-top: 25px;
    gap: 10px;

    > button {
      flex: 1;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 728px) {
    .btn-grp {
      flex-direction: column;
    }
  }
`;
export default FilterActionsWrapper;
