import styled from "styled-components";

const ProgressBarWrapper = styled.div<{
  $activeSection: number;
  $stepsNumber: number;
}>`
  text-align: center;
  .progress-bar-container {
    display: inline-flex;
    justify-content: center;
    position: relative;
  }
  .step {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
      transition: all 0.3s ;
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
    width: 80%;
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
`;

export default ProgressBarWrapper;
