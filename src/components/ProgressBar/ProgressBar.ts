import styled from "styled-components";
import { fontSizes } from "../../core/constants/fontStyles";

const ProgressBarWrapper = styled.div<{
  $activeSection: number;
  $stepsNumber: number;
}>`
  text-align: center;
  width: 80%;

  .progress-bar-container {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    gap: 10px;
  }
  .step {
    width: ${(props) => String(100 / props.$stepsNumber) + "%"};
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    text-align: center;

    .completed {
      background-color: #00d100;
      border: 4px solid #00d100;
      transition: all 0.3s;
    }
    .progress {
      background-color: #e7cf6f;
      border: 4px solid #e7cf6f;
      transition: all 0.3s 0.5s;
    }
    .incomplete {
      background-color: #fffeff;
      border: 4px solid #d1c5c5;
      transition: all 0.3s;
    }
    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .step-name {
      text-align: center;
    }
  }
  .steps-link {
    height: 4px;
    width: ${(props) =>
      String((100 / props.$stepsNumber) * (props.$stepsNumber - 1)) + "%"};
    background-color: #d1c5c5;
    position: absolute;
    top: 13px;
    z-index: -1;

    .link-progress {
      background-color: #00d100;
      height: inherit;
      width: ${(props) =>
        String((props.$activeSection - 1) * (100 / (props.$stepsNumber - 1))) +
        "%"};
      transition: all 0.5s;
    }
  }

  @media only screen and (max-width: 500px) {
    .step-name {
      font-size: ${fontSizes["--font-size-x-s"]};
    }
  }
`;

export default ProgressBarWrapper;
