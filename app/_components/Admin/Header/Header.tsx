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
