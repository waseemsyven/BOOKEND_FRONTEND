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
  }, [user]);

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
      </h2>
      <div className="flex justify-center items-center ml-2">
        {users &&
          users.map((user: any, index: any) => {
            return (
              <div
                className={`cursor-pointer relative w-8 h-8 flex items-center justify-center rounded-full bg-dark-blue text-white uppercase group text-xs font-semibold`}
                key={index}
                onClick={() =>
                  handleOpenUserInfo(
                    user.email,
                    user.first_name,
                    user.last_name
                  )
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
            );
          })}
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
