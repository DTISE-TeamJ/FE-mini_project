"use client";

import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  NavbarContainer,
  StyledUl,
  ListItem,
  WrapperIcon,
  List,
  Button,
  Icon,
  StyledLi,
} from "./style";
import CustomModal from "../CustomModal";
import { LogInIcon } from "../../Admin/Header/style";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    closeModal();
    router.push("/");
  };

  const handleSignIn = () => {
    router.push("/auth/signin");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCart = () => {
    router.push("/cart");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <NavbarContainer>
      <div className="logoNavbar cursor-pointer" onClick={handleHome}>
        <h1
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

      <CustomModal
        open={showModal}
        onClose={closeModal}
        title="Confirm Exit"
        content="Are you sure you want to logout?"
        primaryActionText="Logout"
        onPrimaryAction={handleLogout}
      />

      <WrapperIcon>
        <Icon onClick={handleCart} data-testid="cart-icon">
          <FaCartShopping size={20} />
        </Icon>
        <Icon>
          {session?.user?.username ? (
            <div className="flex gap-1 items-center">
              <BsPerson size={20} />
              {session.user.username}
              <div onClick={openModal}>
                <LogInIcon className="pointer ms-3" size={20} />
              </div>
            </div>
          ) : (
            ""
          )}
        </Icon>
      </WrapperIcon>

      <div className="md:hidden z-10 flex gap-4">
        <Icon onClick={handleCart} className="md:hidden z-10">
          <FaCartShopping size={20} />
        </Icon>

        <div
          onClick={handleNav}
          className="md:hidden z-10"
          data-testid="menu-icon">
          {nav ? (
            <AiOutlineClose className="text-black" size={20} />
          ) : (
            <HiOutlineMenuAlt4 className="text-white" size={20} />
          )}
        </div>
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
            {session?.user?.username ? (
              <>
                <Button>{session.user.username}</Button>
                <Button className="my-6" onClick={openModal}>
                  Logout
                </Button>
              </>
            ) : (
              <Button className="my-6" onClick={handleSignIn}>
                Sign In
              </Button>
            )}
          </div>
        </List>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
