import styled from "styled-components";

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
    gap: 10px;
  }
`;

export default EmployeeIntroSectionWrapper;
