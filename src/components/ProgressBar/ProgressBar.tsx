import ProgressBarWrapper from "./ProgressBar";

const ProgressBar = ({
  steps,
  activeSection,
}: {
  steps: string[];
  activeSection: number;
}) => {
  return (
    <ProgressBarWrapper $activeSection={activeSection} $stepsNumber={steps.length}>
      <div className="progress-bar-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div
              className={`step-number ${
                index + 1 < activeSection
                  ? `completed`
                  : index + 1 > activeSection
                  ? `incomplete`
                  : `progress`
              }`}
            >
              {index + 1}
            </div>
            <div className="step-name">{step}</div>
          </div>
        ))}
        <div className="steps-link">
          <div className="link-progress"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
