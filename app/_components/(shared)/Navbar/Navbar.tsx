"use client";

import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { ImExit } from "react-icons/im";

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
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState(false);
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
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <NavbarContainer>
      <div className="logoNavbar">
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

      {open && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/20">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow p-6 transition-all scale-100 opacity-100">
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
              <IoClose size={24} />
            </button>

            <div className="text-center w-72">
              <ImExit size={44} className="mx-auto text-red-500" />
              <div className="mx-auto my-4 w-60">
                <h3 className="text-lg font-black text-gray-800">
                  Confirm Exit
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to exit?
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="p-2 bg-red-600 w-full rounded-lg text-white hover:bg-red-500"
                  onClick={handleLogout}>
                  Exit
                </button>
                <button
                  className="p-2 bg-blue-600 w-full rounded-lg text-white hover:bg-blue-500"
                  onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <WrapperIcon>
        <Icon>
          <FaCartShopping size={20} />
        </Icon>
        <Icon>
          {session?.user?.username ? (
            <div className="flex gap-2" onClick={openModal}>
              <BsPerson size={20} />
              {session.user.username}
            </div>
          ) : (
            ""
          )}
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

          {/* <SosialIconWrapper>
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
          </SosialIconWrapper> */}
        </List>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
