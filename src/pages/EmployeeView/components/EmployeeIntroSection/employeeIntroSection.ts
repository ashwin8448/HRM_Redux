import styled from "styled-components";

const EmployeeIntroSectionWrapper = styled.div`
  width: 100%;
  gap: 20px;

  h2 {
    margin-bottom: 0;
    width: 180px;
  }

  .employee-intro {
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;

    .intro-title {
      justify-content: flex-start;
    }
  }

  @media only screen and (max-width: 480px) {
    &,
    .employee-intro {
      flex-direction: column;
      align-items: center;
    }
    .btn-grp {
      align-self: center;
    }
  }
`;

export default EmployeeIntroSectionWrapper;
