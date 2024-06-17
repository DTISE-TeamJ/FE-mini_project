import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const StyledUl = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const StyledLi = styled.li`
  padding: 1rem;
  cursor: pointer;
  color: white;

  &:hover {
    color: #b9baba;
  }
`;

export const WrapperIcon = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const Icon = styled.div`
  color: white;
`;

export const List = styled.ul`
  padding: 0;
`;

export const ListItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  &:hover {
    color: #b9baba;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  background: linear-gradient(to right, #00093c, #2d0b00);
  color: white;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const SosialIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const SosialIcon = styled.div`
  color: #00093c;
  cursor: pointer;
`;
