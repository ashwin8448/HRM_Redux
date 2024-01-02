import styled from 'styled-components';

const SideFilterBarWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  height: 100%;
  padding: 20px;
  width: 50%;
  z-index: 5;
  top: 0;
  right: 0;
  ${({ $visible }) =>
    $visible ? 'transform: translateX(0);' : 'transform: translateX(100%);'}
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;

  .close-btn {
    padding: 10px;
    cursor: pointer;
  }
`;
export default SideFilterBarWrapper;
