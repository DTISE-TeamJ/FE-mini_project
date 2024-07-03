import styled from "styled-components";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SidebarToggle = styled.div`
  display: none;

  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    width: 50px;
    height: 30px;
    border-radius: 4px;
    background: gray;
    color: #fff;
    position: absolute;
    z-index: 2;
    margin: 10px 5px;
    cursor: pointer;
  }
`;

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(to right, #00093c, #2d0b00);
  color: #fff;
  width: 200px;
  height: 100vh;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;
  transition: width 0.3s ease-in-out;

  @media (max-width: 500px) {
    width: 0;
    overflow: hidden;

    &.open {
      width: 200px;
      position: fixed;
      top: 0;
      left: 0;
      transition: width 0.3s ease-in-out;
    }

    &.open .sidebar--logo {
      margin-top: 3rem;
    }
  }
`;

export const SidebarLogo = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
`;
