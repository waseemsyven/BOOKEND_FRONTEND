"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { CustomButton } from ".";
import { useSession } from "next-auth/react";

function DeleteUserPopup({ handleClose, userInfo, callGetUsers }: any) {
  const { email, firstName } = userInfo;
  const { data: session } = useSession();
  const user: any = session?.user;
  const deleteUserFunction = async () => {
    const queryParams = new URLSearchParams({
      email: email,
    });
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/users/delete?${queryParams}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const status = response.status;
      callGetUsers();
      if (status == 200) {
        toast.success("user deleted", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose();
    } finally {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal rounded-[8px] flex justify-center flex-col items-center px-6 py-4 w-[520px] shadow">
        <Image src="/delete_red_icon.svg" alt="delete" width={80} height={80} />
        <h2 className="text-lg text-bold text-center mb-6">
          Are you sure you want to delete this user ({firstName})? This action
          cannot be undone.
        </h2>
        <div className="flex justify-center items-center gap-6">
          <CustomButton
            title="Confirm"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => deleteUserFunction()}
          />
          <CustomButton
            title="Cancel"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => handleClose(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteUserPopup;
