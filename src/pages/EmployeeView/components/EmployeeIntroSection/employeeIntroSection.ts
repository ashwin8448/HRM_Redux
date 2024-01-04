import styled from 'styled-components';

const EmployeeIntroSectionWrapper = styled.div`
  width: 100%;
  gap: 20px;

  .btn-grp {
    align-self: flex-start;
  }

  .employee-intro {
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;

    .intro-title{
      align-items: flex-start;
    }
  }

  @media only screen and (max-width: 480px) {
    &,
    .employee-intro {
      flex-direction: column;
      align-items: center;
    }
    .btn-grp{
      align-self: center;
    }
  }
`;

export default EmployeeIntroSectionWrapper;
