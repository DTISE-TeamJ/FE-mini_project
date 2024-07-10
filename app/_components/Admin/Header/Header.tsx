"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { deleteCookies } from "@/utils/getCookies";

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
import CustomModal from "../../(shared)/CustomModal";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
    primaryActionText: "",
    primaryAction: () => {},
  });

  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    // deleteCookies();
    router.push("/");
  };

  const openExitModal = () => {
    setModalContent({
      title: "Confirm Exit",
      content: "Are you sure you want to exit?",
      primaryActionText: "Exit",
      primaryAction: handleLogout,
    });
    setOpen(true);
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Dashboard</HeaderTitle>
      <SearchBox>
        <SearchInput type="text" placeholder="Search..." />
        <SearchIcon />
      </SearchBox>

      <CustomModal
        open={open}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
        primaryActionText={modalContent.primaryActionText}
        onPrimaryAction={modalContent.primaryAction}
      />

      <UserBox>
        <IconContainer>
          <NotificationsIcon className="pointer" />
        </IconContainer>
        <IconContainer onClick={openExitModal}>
          <LogInIcon className="pointer" />
        </IconContainer>
        {session?.user?.username && (
          <UpgradeButton>
            <FaUser />
            {session.user.username}
          </UpgradeButton>
        )}
      </UserBox>
    </HeaderContainer>
  );
};

export default Header;

/*
"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { deleteCookies } from "@/utils/getCookies";

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
import CustomModal from "../../(shared)/CustomModal";

const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
    primaryActionText: "",
    primaryAction: () => {},
  });

  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const openExitModal = () => {
    setModalContent({
      title: "Confirm Exit",
      content: "Are you sure you want to exit?",
      primaryActionText: "Exit",
      primaryAction: handleLogout,
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Dashboard</HeaderTitle>
      <SearchBox>
        <SearchInput type="text" placeholder="Search..." />
        <SearchIcon />
      </SearchBox>

      <CustomModal
        open={openModal}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
        primaryActionText={modalContent.primaryActionText}
        onPrimaryAction={modalContent.primaryAction}
      />

      <UserBox>
        <IconContainer>
          <NotificationsIcon className="pointer" />
        </IconContainer>
        <IconContainer onClick={openExitModal}>
          <LogInIcon className="pointer" />
        </IconContainer>
        {session?.user?.username && (
          <UpgradeButton>
            <FaUser />
            {session.user.username}
          </UpgradeButton>
        )}
      </UserBox>
    </HeaderContainer>
  );
};

export default Header;

*/
