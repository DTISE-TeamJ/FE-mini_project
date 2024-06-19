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
import "./MenuList.css";
import { MenuListContainer, MenuListItem } from "./style";

const MenuList: React.FC = () => {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    /*
    <ul className="menu--list">
      <li className="menu--list-item active">
        <Link href="/admin">
          <IoDiamond />
          Dashboard
        </Link>
      </li>
      <li className="menu--list-item">
        <Link href="/admin">
          <IoSettingsOutline />
          MenuList
        </Link>
      </li>
      <li className="menu--list-item">
        <Link href="/admin">
          <IoHelp />
          MenuList
        </Link>
      </li>
      <li className="menu--list-item">
        <Link href="/admin">
          <IoList />
          MenuList
        </Link>
      </li>
      <li className="menu--list-item">
        <Link href="/admin">
          <IoCodeWorking />
          MenuList
        </Link>
      </li>
    </ul>
    */

    <MenuListContainer>
      <MenuListItem className={activePath === "/admin" ? "active" : ""}>
        <Link href="/admin">
          <IoDiamond />
          Dashboard
        </Link>
      </MenuListItem>
      <MenuListItem
        className={activePath === "/admin/create-event" ? "active" : ""}>
        <Link href="/admin/create-event">
          <IoCodeWorking />
          Create Event
        </Link>
      </MenuListItem>
      {/* <MenuListItem className={activePath === "/admin" ? "active" : ""}>
        <Link href="/admin">
          <IoHelp />
          MenuList
        </Link>
      </MenuListItem>
      <MenuListItem className={activePath === "/admin" ? "active" : ""}>
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
