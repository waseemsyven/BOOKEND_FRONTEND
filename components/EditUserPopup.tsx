"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function EditUserPopup({ handleClose, userInfo }: any) {
  const { email } = userInfo;
  const { data: session } = useSession();
  const user: any = session?.user;
  const [passwordOne, setpasswordOne] = useState("");
  const [passwordTwo, setpasswordTwo] = useState("");

  const isDisabled = !passwordTwo || !passwordOne;
  const updateUserPassword = async () => {
    if (passwordTwo !== passwordOne) {
      toast.error(
        "Please ensure that the new password and confirm new password fields match exactly.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }

    try {
      const apiUrl = `https://control-plane-qomhxh6ofa-uc.a.run.app/${user.domain}/users/update`;
      const payload = {
        email: email,
        password: passwordTwo,
      };
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("User Password Updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      handleClose();
    } catch (error) {
      toast.error("something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("API request error:", error);
      return null;
    }
  };

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
        <h2 className="text-lg font-medium">Update User Password</h2>
        <div className="px-8 py-4 my-4 flex justify-center w-full gap-4">
          <div className="input-secondary-container">
            <h3>New Password</h3>
            <input
              placeholder="New Password"
              type="password"
              className="input-secondary"
              value={passwordOne}
              onChange={(e) => setpasswordOne(e.target.value)}
            />
          </div>
          <div className="input-secondary-container">
            <h3>Confirm New Password</h3>
            <input
              placeholder="Confirm New Password"
              type="password"
              className="input-secondary"
              value={passwordTwo}
              onChange={(e) => setpasswordTwo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-around items-center w-full mt-6">
          <CustomButton
            title="Update"
            containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-4"
            textStyles="text-[15px] font-medium text-white"
            handleClick={updateUserPassword}
            isDisabled={isDisabled}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default EditUserPopup;
