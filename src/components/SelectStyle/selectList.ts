import styled from "styled-components";

const SelectListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr)); /* see notes below */
  grid-gap: 15px;
  width: 100%;
  flex: 1;

  @media only screen and (max-width: 1200px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }

  @media only screen and (max-width: 728px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

export default SelectListWrapper;
