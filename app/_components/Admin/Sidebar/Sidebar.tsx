"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MenuList from "../Menu/MenuList";
// import "./Sidebar.css";
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
    /*
    <div className="sidebar-container">
      <div className="sidebar-toggle" onClick={toggleDashboard}>
        {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </div>
      <div className={isOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar--logo">TEST</div>
        <MenuList />
      </div>
    </div>
    */

    <SidebarContainer>
      <SidebarToggle onClick={toggleDashboard}>
        {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </SidebarToggle>
      <SidebarWrapper className={isOpen ? "open" : ""}>
        <SidebarLogo>TEST</SidebarLogo>
        <MenuList />
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
