"use client";

import styled from "styled-components";
import { IoLogInOutline, IoNotifications, IoSearch } from "react-icons/io5";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const HeaderTitle = styled.h2`
  color: #333;
  font-size: larger;

  @media (max-width: 500px) {
    margin-left: 4rem;
  }
`;

export const SearchBox = styled.div`
  background: #eee;
  padding: 0 10px;
  border-radius: 4px;
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 860px) {
    display: none;
  }
`;

export const SearchIcon = styled(IoSearch)`
  cursor: pointer;
`;

export const SearchInput = styled.input`
  padding: 10px;
  background: transparent;
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 860px) {
    button {
      display: none;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #333;
    background: #fff;
    border: 1px solid gray;
    transition: all 0.2s ease-in;
  }
`;

export const BaseIcon = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

export const NotificationsIcon = styled(IoNotifications)`
  ${BaseIcon}
`;

export const LogInIcon = styled(IoLogInOutline)`
  ${BaseIcon}
`;

export const UpgradeButton = styled.button`
  background: bisque;
  padding: 10px;
  border-radius: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;
