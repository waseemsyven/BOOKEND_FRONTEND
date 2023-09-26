"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import DeleteUserPopup from "./DeleteUserPopup";
import UpdatePasswordPopup from "./UpdatePasswordPopup";

function UserInfoPopup({ handleClose, userInfo, callGetUsers }: any) {
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [showUpdatePasswordPopup, setshowUpdatePasswordPopup] = useState(false);
  const handleCloseConfrimationPopup = () => {
    setshowDeletePopup(false);
  };
  return (
    <div className="modal-overlay">
      <div className="modal rounded-[8px] flex justify-start flex-col items-center px-8 py-6">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <div className="p-4 text-base font-medium mb-4">
          {" "}
          <h2>{`Email: ${userInfo.email}`}</h2>
          <h2>{`First Name: ${userInfo.firstName}`}</h2>
          <h2>{`Last Name: ${userInfo.lastName}`}</h2>
        </div>
        <div className="flex justify-between items-center gap-2">
          <CustomButton
            title="Update Password"
            containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-4"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => setshowUpdatePasswordPopup(true)}
          />{" "}
          <CustomButton
            title="Delete User"
            containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-4"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => setshowDeletePopup(true)}
          />
        </div>
        {showDeletePopup && (
          <DeleteUserPopup
            handleClose={handleCloseConfrimationPopup}
            username={userInfo.firstName}
            email={userInfo.email}
            callGetUsers={callGetUsers}
            closeParent={handleClose}
          />
        )}
        {showUpdatePasswordPopup && <UpdatePasswordPopup />}
      </div>
    </div>
  );
}

export default UserInfoPopup;
