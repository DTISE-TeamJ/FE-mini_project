"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MenuList from "../Menu/MenuList";
import {
  SidebarContainer,
  SidebarWrapper,
  SidebarLogo,
  SidebarToggle,
} from "./style";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDashboard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer>
      <SidebarToggle onClick={toggleDashboard}>
        {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </SidebarToggle>
      <SidebarWrapper className={isOpen ? "open" : ""}>
        <SidebarLogo>PEACHES.</SidebarLogo>
        <MenuList />
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
