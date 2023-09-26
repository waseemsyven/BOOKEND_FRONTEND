"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUsersList } from "../utils";
import { CreateUserPopup, CustomButton, UserInfoPopup } from ".";

function DomainDashboardHeader() {
  const [users, setusers] = useState([]);
  const [showCreateUserPopup, setshowCreateUserPopup] = useState(false);
  const [showUserInfoPopup, setshowUserInfoPopup] = useState(false);
  const [userInfo, setuserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const callGetUsers = async () => {
    const data = await getUsersList();
    setusers(data);
  };

  const handleClose = () => {
    setshowCreateUserPopup(false);
  };

  const handleCloseUserInfo = () => {
    setshowUserInfoPopup(false);
  };

  useEffect(() => {
    callGetUsers();
  }, []);

  const handleOpenUserInfo = (email: any, firstName: any, lastName: any) => {
    setuserInfo({ email: email, firstName: firstName, lastName: lastName });
    setshowUserInfoPopup(true);
  };

  return (
    <div className="h-[72px] px-6 flex justify-start items-center gap-2 bg-white">
      {" "}
      <Image
        src="/domain.svg"
        alt="domain logo"
        width={20}
        height={20}
        className="object-contain"
      />
      <h2 className="text-[22px] font-bold flex justify-center items-center capitalize">
        {process.env.NEXT_PUBLIC_BOOKEND_DOMAIN}{" "}
        <Image
          src="/arrow_dropdown.svg"
          alt="dropdown logo"
          width={24}
          height={24}
          className="object-contain"
        />
      </h2>
      <div className="flex">
        {users &&
          users.map((user: any, index: any) => (
            <div
              className="cursor-pointer relative w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white uppercase group"
              key={index}
              onClick={() =>
                handleOpenUserInfo(user.email, user.first_name, user.last_name)
              }
            >
              <div className="group">
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </div>

              <div className="flex gap-1 absolute h-10 bottom-[-40px] left-0 border bg-white text-black text-xs  font-semibold p-2 rounded-md opacity-0 group-hover:opacity-100">
                {" "}
                <h2> {user.first_name}</h2>
                <h2>{user.last_name}</h2>
              </div>
            </div>
          ))}
      </div>
      <div className="flex grow justify-end">
        <CustomButton
          title="Add User"
          containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-4"
          textStyles="text-[15px] font-medium text-white"
          handleClick={() => setshowCreateUserPopup(true)}
        />
      </div>
      {showCreateUserPopup && (
        <CreateUserPopup
          handleClose={handleClose}
          callGetUsers={callGetUsers}
        />
      )}
      {showUserInfoPopup && (
        <UserInfoPopup
          handleClose={handleCloseUserInfo}
          userInfo={userInfo}
          callGetUsers={callGetUsers}
        />
      )}
    </div>
  );
}

export default DomainDashboardHeader;
