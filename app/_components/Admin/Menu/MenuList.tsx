"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  IoDiamond,
  IoSettingsOutline,
  IoHelp,
  IoList,
  IoCodeWorking,
} from "react-icons/io5";
import { MenuListContainer, MenuListItem } from "./style";

const MenuList: React.FC = () => {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <MenuListContainer>
      <MenuListItem className={activePath === "/admin" ? "active" : ""}>
        <Link href="/dashboard">
          <IoDiamond />
          Dashboard
        </Link>
      </MenuListItem>
      <MenuListItem
        className={activePath === "/dashboard/create-event" ? "active" : ""}>
        <Link href="/dashboard/create-event">
          <IoCodeWorking />
          Create Event
        </Link>
      </MenuListItem>
      <MenuListItem
        className={activePath === "/dashboard/events-list" ? "active" : ""}>
        <Link href="/dashboard/events-list">
          <IoHelp />
          MenuList
        </Link>
      </MenuListItem>
      {/* <MenuListItem className={activePath === "/admin" ? "active" : ""}>
        <Link href="/admin">
          <IoList />
          MenuList
        </Link>
      </MenuListItem>
      <MenuListItem className={activePath === "/admin" ? "active" : ""}>
        <Link href="/admin">
          <IoSettingsOutline />
          MenuList
        </Link>
      </MenuListItem> */}
    </MenuListContainer>
  );
};

export default MenuList;
