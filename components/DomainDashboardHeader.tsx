"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CreateUserPopup,
  CustomButton,
  EditUserPopup,
  UserInfoPopup,
  ViewAllUsersPopup,
} from ".";
import { useSession } from "next-auth/react";
import DeleteUserPopup from "./DeleteUserPopup";

function DomainDashboardHeader() {
  const { data: session, status } = useSession();
  const user: any = session?.user;

  const [users, setusers] = useState([]);
  const [showCreateUserPopup, setshowCreateUserPopup] = useState(false);
  const [showUserInfoPopup, setshowUserInfoPopup] = useState(false);
  const [showViewAllUsersPopup, setShowViewAllUsersPopup] = useState(false);
  const [showEditUserPopup, setshowEditUserPopup] = useState(false);
  const [showDeleteUserPopup, setshowDeleteUserPopup] = useState(false);

  const [userInfo, setuserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const getUsersList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/users/list`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${user.token}`,
          },
        }
      );
      const users = await response.json();

      return users;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const callGetUsers = async () => {
    const data = await getUsersList();
    setusers(data);
  };

  const handleShowDeletePopup = () => {
    setshowUserInfoPopup(false);
    setshowDeleteUserPopup(true);
  };

  const handleCloserDeleteUserPopup = () => {
    setshowDeleteUserPopup(false);
  };

  const handleClose = () => {
    setshowCreateUserPopup(false);
  };

  const handleCloseUserInfo = () => {
    setshowUserInfoPopup(false);
  };

  const handleCloseViewAllUsers = () => {
    setShowViewAllUsersPopup(false);
  };

  const handleCloseEditUser = () => {
    setshowEditUserPopup(false);
  };

  const handleOpenEditUserPopup = () => {
    setshowUserInfoPopup(false);
    setshowEditUserPopup(true);
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
        {user && user.domain}{" "}
        {/* <Image
          src="/arrow_dropdown.svg"
          alt="dropdown logo"
          width={24}
          height={24}
          className="object-contain"
        /> */}
      </h2>
      <div className="flex justify-center items-center ml-2">
        {users &&
          users.slice(0, 3).map((user: any, index: any) => (
            <div
              className={`cursor-pointer relative w-8 h-8 flex items-center justify-center rounded-full bg-dark-blue text-white uppercase group text-xs font-semibold ${
                index === 1
                  ? "translate-x-[-10px]"
                  : index === 2
                  ? "translate-x-[-15px]"
                  : index === 3
                  ? "translate-x-[-25px]"
                  : ""
              }`}
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
                <h3> {user.first_name}</h3>
                <h3>{user.last_name}</h3>
              </div>
            </div>
          ))}
        {users && users.length > 3 && (
          <div
            className={`cursor-pointer relative w-8 h-8 flex items-center justify-center rounded-full bg-dark-blue text-white uppercase group text-xs font-semibold translate-x-[-25px]`}
          >
            <div className="group">{users.length - 3}</div>
          </div>
        )}

        {users && users.length > 3 && (
          <h2
            className="text-sm font-semibold  text-[#111AE8] hover:underline cursor-pointer"
            onClick={() => setShowViewAllUsersPopup(true)}
          >
            View all
          </h2>
        )}
      </div>
      <div className="flex grow justify-end">
        <CustomButton
          title="Add User"
          containerStyles="rounded-[4px] border-2 border-[#131A44] bg-white gap-1 px-2 py-1 text-[#131A44] hover-blue"
          textStyles="text-[15px] font-semibold"
          rightIcon="/plus_blue.svg"
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
          handleOpenEditUserPopup={handleOpenEditUserPopup}
          handleShowDeletePopup={handleShowDeletePopup}
        />
      )}
      {showEditUserPopup && (
        <EditUserPopup
          handleClose={handleCloseEditUser}
          userInfo={userInfo}
          callGetUsers={callGetUsers}
          handleOpenEditUserPopup={handleOpenEditUserPopup}
        />
      )}
      {showViewAllUsersPopup && (
        <ViewAllUsersPopup
          handleClose={handleCloseViewAllUsers}
          users={users}
        />
      )}
      {showDeleteUserPopup && (
        <DeleteUserPopup
          handleClose={handleCloserDeleteUserPopup}
          userInfo={userInfo}
          callGetUsers={callGetUsers}
        />
      )}
    </div>
  );
}

export default DomainDashboardHeader;
