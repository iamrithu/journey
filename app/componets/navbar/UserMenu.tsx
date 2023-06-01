"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

import Avatar from "./Avatar";
import { use, useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import { signOut } from "next-auth/react";
import { safeUser } from "@/app/types";
import useRentModel from "@/app/hooks/useRentModel";

interface UserMenuProps {
  currentUser?: safeUser | null
}
const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const loginModel = useLoginModel();
  const rentModel = useRentModel();
  const registerModel = useRegisterModel();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);


  const toggle = useCallback(() => {
    if (isOpen) {
      setIsOpen((value) => !value);
      setTimeout(() => {
        setIsOpenModel((value) => !value);
      }, 300)
    } else {
      setIsOpenModel((value) => !value);
      setTimeout(() => {
        setIsOpen((value) => !value);
      }, 100)
    }

  }, [isOpen]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    rentModel.onOpen();
  }, [loginModel, currentUser, rentModel])
  return (
    <div className="relative">
      <div
        className="
        flex 
        flex-row
        items-center
        gap-3
        "
      >
        <div
          onClick={onRent}
          className="
              hidden
              md:block
              text-sm
              font-semibold
              py-3
              px-4
              rounded-full
              hover:bg-neutral-100
              transition
              cursor-pointer

        "
        >
          <span className="text-rose-500"> {currentUser?.name}</span> Your Home
        </div>
        <div
          onClick={toggle}
          className="
              p-4
              md:py-1
              md:px-3
              border-[1px]
              border-neutral-200
              rounded-full
              hover:shadow-lg
              flex
              flex-row
              items-center
              gap-3
              transition
              cursor-pointer              "
        >
          {isOpen ? < IoMdClose /> : <AiOutlineMenu />}
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpenModel && (
        <div
          className={`      absolute
         translate
         duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
          ${isOpen ? "translate-x-0" : "translate-x-full"}



      rounded-xl
      shadow-md
      w-[40vw]
      md:w-3/4
      bg-white
       overlow-hidden
        right-0
         top-12
         text-sm
         translate
         duration-1000
     `}
        >
          {
            currentUser ? <>
              <MenuItem onclick={() => { }} label="My trips" />
              <MenuItem onclick={() => { }} label="My favoites" />
              <MenuItem onclick={() => { }} label="My reservations" />
              <MenuItem onclick={() => { }} label="My properties" />
              <MenuItem onclick={rentModel.onOpen} label="Journee my home" />
              <hr />
              <MenuItem onclick={() => signOut()} label="Logout" />




            </>
              :
              <>
                <MenuItem onclick={loginModel.onOpen} label="Login" />
                <MenuItem onclick={registerModel.onOpen} label="Sign up" />
              </>
          }

        </div>
      )}
    </div>
  );
};

export default UserMenu;
