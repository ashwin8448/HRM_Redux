import styled from "styled-components";

const SelectListWrapper = styled.div`
  width: 100%;

  @media only screen and (max-width: 1200px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }

  @media only screen and (max-width: 728px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

export default SelectListWrapper;
