import { styled } from "styled-components";
import colors from "../../core/constants/colors";

const EmployeeViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.WHITE_COLOR};
  border: 1px solid ${colors.LIGHT_GRAY_COLOR};
  border-radius: 10px;
  margin: 0 auto;
  max-width: 700px;
  padding: 25px;
  gap: 25px;
  position: relative;

  .buttons {
    position: absolute;
    top: 25px;
    right: 25px;
    button {
      padding: 0;
      border-radius: 5px;
      border: 1px solid black;
      span {
        font-size: 30px;
      }
    }
    button:hover {
      transform: scale(0.95);
    }
  }

  p {
    margin: 0;
  }

  .material-symbols-outlined {
    color: ${colors.SECONDARY_COLOR};
    font-size: 20px;
  }
  button {
    border: 1px solid transparent;
    background: none;
    border-radius: 0;
    font-size: 18px;
    padding: 16px 0;
    color: ${colors.SECONDARY_COLOR};
    label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .add-border-bottom {
    border-bottom: 1px solid ${colors.PRIMARY_COLOR} !important;
  }

  .detail-element {
    gap: 10px;
    width: 100%;
    .material-symbols-outlined {
      color: ${colors.LIGHT_GRAY_COLOR};
    }
  }

  img {
    width: 175px;
    height: 175px;
    border-radius: 50%;
  }

  .flex {
    display: flex;
  }

  .employee-intro-section {
    width: 100%;
    gap: 20px;
    .employee-intro {
      flex-grow: 1;
      flex-direction: column;
      .employee-status {
        border-bottom: 1px solid black;
        padding-bottom: 10px;
      }
      .employee-info {
        flex-grow: 1;
        margin-top: 10px;
        p {
          padding: 5px 0 5px 10px;
        }
        .title {
          width: 85px;
        }
      }
    }
  }
  .employee-details-section {
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    h2 {
      border-bottom: 1px solid black;
      margin: 0;
      padding: 10px 20px;
    }
    .detail-element {
      padding: 10px 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
`;
export default EmployeeViewWrapper;
