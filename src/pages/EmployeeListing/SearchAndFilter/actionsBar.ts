import styled from "styled-components";
import colors from "../../../core/constants/colors";

const ActionsWrapper = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${colors.WHITE_COLOR};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  > * {
    width: 100%;
  }

  .filter-all-btn{
    background-color: ${colors.DARK_PRIMARY_COLOR};
    >label{
      color: ${colors.WHITE_COLOR}
    }
  }
  .btn-grp {
    justify-content: flex-start;
    align-self: flex-end;
    gap: 10px;

    > button{
      flex: 1;
      justify-content: center;
    }
  }

`;
export default ActionsWrapper;
