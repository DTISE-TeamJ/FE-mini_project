import styled from "styled-components";

export const MenuListContainer = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  gap: 0.6rem;
  padding: 10px;
`;

export const MenuListItem = styled.li`
  padding: 1rem;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #3c3c3c;
  }

  &.active {
    background: #3c3c3c;
  }

  a {
    overflow: hidden;
    display: flex;
    gap: 20px;
    align-items: center;
    color: #fff;
  }
`;
