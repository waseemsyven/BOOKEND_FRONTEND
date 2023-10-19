import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";

function HelpAndSupport({ handleClose }: any) {
  const functionContactus = () => {
    toast.success("submitted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="modal-overlay">
      <div className="modal w-[1060px] h-[568px] rounded-[8px] flex justify-between items-start px-10 py-8 shadow">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <div className="flex flex-col justify-start">
          {" "}
          <Image
            src="/bookend_ai_logo.svg"
            alt="close"
            className="mb-24"
            width={148}
            height={24}
          />
          <Image
            src="/contact_us_image.svg"
            alt="close"
            width={496}
            height={331}
          />
        </div>
        <div className="bg-white flex justify-center items-center flex-col rounded-[20px] h-full">
          <h2 className="text-2xl font-semibold	mb-8 flex w-full justify-start pl-20">
            {" "}
            Help & Support
          </h2>
          <form
            action="https://formsubmit.co/bookend-ai_board_5226427562_7bee5136050d9a478dd8__47341525@use1.mx.monday.com"
            method="POST"
            className="flex justify-center flex-col items-center"
          >
            <input type="hidden" name="_captcha" value="false"></input>
            <div className="input-secondary-container mb-6">
              <h3>Full Name</h3>

              <input
                type="text"
                name="Full Name"
                className="input-secondary"
                placeholder="Enter Full name"
                required
              ></input>
            </div>
            <div className="input-secondary-container mb-6">
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                placeholder="Enter email ID"
                required
                className="input-secondary"
              ></input>
            </div>
            <div className="input-secondary-container mb-6">
              <h3>Domain</h3>
              <input
                type="text"
                placeholder="Enter domain name"
                name="domain"
                className="input-secondary"
                required
              ></input>
            </div>
            <div className="input-secondary-container mb-6 ">
              <h3>Describe your issue</h3>

              <input
                type="text"
                name="usecase"
                required
                placeholder="Please do let us know, how can we help?"
                className="input-secondary"
              ></input>
            </div>

            <button
              type="submit"
              className="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-8 text-[16px] font-medium text-white"
              onClick={functionContactus}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;
