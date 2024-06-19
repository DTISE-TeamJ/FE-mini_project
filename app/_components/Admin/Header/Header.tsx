import React from "react";

import {
  HeaderContainer,
  HeaderTitle,
  SearchBox,
  SearchInput,
  SearchIcon,
  UserBox,
  IconContainer,
  NotificationsIcon,
  LogInIcon,
  UpgradeButton,
} from "./style";

const Header: React.FC = () => {
  return (
    /*
    <div className="header">
      <h2 className="header-title">Dashboard</h2>

      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <IoSearch className="search-icon" />
      </div>

      <div className="user-box">
        <div className="icon-container">
          <IoNotifications className="user--icon" />
        </div>
        <div className="icon-container">
          <IoLogInOutline className="user--icon" />
        </div>
        <button>Upgrade Plan</button>
      </div>
    </div>
    */

    <HeaderContainer>
      <HeaderTitle>Dashboard</HeaderTitle>

      <SearchBox>
        <SearchInput type="text" placeholder="Search..." />
        <SearchIcon />
      </SearchBox>

      <UserBox>
        <IconContainer>
          <NotificationsIcon className="pointer" />
        </IconContainer>
        <IconContainer>
          <LogInIcon className="pointer" />
        </IconContainer>
        <UpgradeButton>Upgrade Plan</UpgradeButton>
      </UserBox>
    </HeaderContainer>
  );
};

export default Header;
