"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaUser } from "react-icons/fa";

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
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
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

      {open && (
        <div
          onClick={closeModal}
          className="fixed z-10	inset-0 flex justify-center items-center transition-colors visible bg-black/20">
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

      <UserBox>
        <IconContainer>
          <NotificationsIcon className="pointer" />
        </IconContainer>
        <IconContainer onClick={openModal}>
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
