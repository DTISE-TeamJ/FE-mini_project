"use client";

import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

import {
  NavbarContainer,
  StyledUl,
  ListItem,
  WrapperIcon,
  List,
  Button,
  Icon,
  SosialIconWrapper,
  StyledLi,
} from "./style";
import { SocialIcons } from "../Footer/style";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  return (
    <NavbarContainer>
      <div className="logoNavbar">
        <h1
          onClick={handleNav}
          className={`text-3xl md:text-4xl font-bold text-white ${
            logo ? "hidden" : "block"
          }`}>
          PEACHES.
        </h1>
      </div>

      <StyledUl>
        <StyledLi>Home</StyledLi>
        <StyledLi>Destinations</StyledLi>
        <StyledLi>Travel</StyledLi>
        <StyledLi>View</StyledLi>
        <StyledLi>Book</StyledLi>
      </StyledUl>

      <WrapperIcon>
        <Icon>
          <BiSearch size={20} />
        </Icon>
        <Icon>
          <BsPerson size={20} />
        </Icon>
      </WrapperIcon>

      <div onClick={handleNav} className="md:hidden z-10">
        {nav ? (
          <AiOutlineClose className="text-black" size={20} />
        ) : (
          <HiOutlineMenuAlt4 className="text-white" size={20} />
        )}
      </div>

      <div
        onClick={handleNav}
        className={
          nav
            ? "absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col"
            : "absolute left-[-100%]"
        }>
        <List>
          <h1>PEACHES.</h1>
          <ListItem>Home</ListItem>
          <ListItem>Destinations</ListItem>
          <ListItem>Travel</ListItem>
          <ListItem>View</ListItem>
          <ListItem>Book</ListItem>
          <div className="flex flex-col">
            <Button className="my-6">Search</Button>
            <Button>Account</Button>
          </div>
          <SosialIconWrapper>
            <SocialIcons>
              <FaFacebook size={20} />
            </SocialIcons>
            <SocialIcons>
              <FaTwitter size={20} />
            </SocialIcons>
            <SocialIcons>
              <FaYoutube size={20} />
            </SocialIcons>
            <SocialIcons>
              <FaPinterest size={20} />
            </SocialIcons>
            <SocialIcons>
              <FaInstagram size={20} />
            </SocialIcons>
          </SosialIconWrapper>
        </List>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
