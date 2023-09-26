"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import { toast } from "react-toastify";

function CreateUserPopup({ handleClose, callGetUsers }: any) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    email: email,
    first_name: firstName,
    last_name: lastName,
    password: password,
  };

  const trainModelFunction = async () => {
    try {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail || !firstName || !lastName || !password) {
        toast.error("Please enter valid data for all fields.");
        return;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/add`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const status = await response.status;
      if (status === 200) {
        handleClose();
        callGetUsers();
        toast.success("User Created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
      } else {
        toast.error("Something went wrong. Please try again later.", {
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
      handleClose();
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal w-[584px] rounded-[8px] flex justify-start flex-col items-center px-8 pb-6">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <div className="w-full py-4 text-lg font-semibold text-text-secondary capitalize">
          Add User To Domain
        </div>
        <div className="flex flex-col gap-4 w-full my-4">
          {" "}
          <input
            placeholder="Enter User Email"
            className="input_primary min-w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex w-full gap-2">
            <input
              placeholder="Enter First Name"
              className="input_primary"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Enter Last Name"
              className="input_primary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            placeholder="Enter Password"
            className="input_primary min-w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <CustomButton
          title="Add"
          containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-4 w-full"
          textStyles="text-[15px] font-medium text-white"
          handleClick={trainModelFunction}
        />
      </div>
    </div>
  );
}

export default CreateUserPopup;
