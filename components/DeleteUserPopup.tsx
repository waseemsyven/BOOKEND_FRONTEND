"use client";
import React from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { CustomButton } from ".";

function DeleteUserPopup({
  handleClose,
  username,
  email,
  callGetUsers,
  closeParent,
}: any) {
  const deleteUserFunction = async () => {
    const queryParams = new URLSearchParams({
      email: email,
    });
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/delete?${queryParams}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const status = response.status;
      closeParent();
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
      closeParent();
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
      closeParent();
      handleClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="modal w-[428px] h-[180px] rounded-[8px] flex justify-center items-center flex-col gap-8">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <h2 className="text-lg text-bold">
          Confirm Delete User ({username}) ?
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
