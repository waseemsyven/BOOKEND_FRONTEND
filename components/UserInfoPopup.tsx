"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import DeleteUserPopup from "./DeleteUserPopup";
import UpdatePasswordPopup from "./UpdatePasswordPopup";
import { useSession } from "next-auth/react";

function UserInfoPopup({ handleClose, userInfo, callGetUsers }: any) {
  const { data: session, status } = useSession();
  const user: any = session?.user;
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [showUpdatePasswordPopup, setshowUpdatePasswordPopup] = useState(false);
  const handleCloseConfrimationPopup = () => {
    setshowDeletePopup(false);
  };

  const [userDetails, setuserDetails] = useState<any>();

  const getUserDetails = async () => {
    try {
      const apiUrl = `https://control-plane-qomhxh6ofa-uc.a.run.app/${user.domain}/users/get?email=${userInfo.email}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        },
      });

      if (res.ok) {
        const user = await res.json();
        setuserDetails(user);
      } else {
        return null;
      }
    } catch (error) {
      console.error("API request error:", error);
      return null;
    }
  };

  const originalDateTimeString = userDetails?.registration_timestamp;
  const dateTime = new Date(originalDateTimeString);
  const formattedDateTime = dateTime.toLocaleString();

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal rounded-[8px] flex justify-start flex-col items-start px-8 py-6 w-[884px] shadow">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <h2 className="text-lg font-medium">User Details</h2>
        <div className="grid px-8 grid-cols-2 py-4 gap-4">
          {" "}
          <div className="input-secondary-container my-4">
            <h3>First Name</h3>
            <input
              className="input-secondary"
              value={userDetails && userDetails.first_name}
            />
          </div>
          <div className="input-secondary-container my-4">
            <h3>Last Name</h3>
            <input
              placeholder="Enter model name"
              className="input-secondary"
              value={userDetails && userDetails.last_name}
            />
          </div>
          <div className="input-secondary-container">
            <h3>Email</h3>
            <input
              placeholder="Email"
              className="input-secondary"
              value={userInfo.email}
            />
          </div>
          <div className="input-secondary-container">
            <h3>Added On</h3>
            <input className="input-secondary" value={formattedDateTime} />
          </div>
        </div>
        <div className="flex justify-around items-center w-full mt-6">
          <CustomButton
            title="Delete User"
            containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-4"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => setshowDeletePopup(true)}
          />
          <CustomButton
            title="Edit Details"
            containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-4"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => setshowUpdatePasswordPopup(true)}
          />{" "}
        </div>

        {/* <div className="p-4 text-base font-medium mb-4">
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
        {showUpdatePasswordPopup && <UpdatePasswordPopup />} */}
      </div>
    </div>
  );
}

export default UserInfoPopup;
