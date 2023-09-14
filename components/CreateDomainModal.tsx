import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import { createDomainModalStates, createDomainProps } from "@/types";

function CreateDomainModal({ handleClose }: createDomainProps) {
  const [DomainName, setDomainName] = useState<string>("");
  const [modalState, setmodalState] = useState<createDomainModalStates>(
    createDomainModalStates.default
  );

  const createDomainFunction = () => {
    setmodalState(createDomainModalStates.select_users);
  };

  const addUsersFunction = () => {
    setmodalState(createDomainModalStates.add_models);
  };

  const submitFunction = () => {
    setmodalState(createDomainModalStates.success);
  };

  if (modalState === createDomainModalStates.default) {
    return (
      <div className="modal-overlay">
        <div className="modal w-[628px] h-[400px] rounded-[8px]">
          <Image
            src="/close.svg"
            alt="close"
            width={24}
            height={24}
            className="close hover-white"
            onClick={handleClose}
          />
          <div className="w-full bg-fill py-4 px-6 text-lg font-medium text-text-secondary">
            Create a Domain
          </div>
          <div className="w-full flex flex-col justify-center items-center grow	">
            <h2 className="text-lg	font-light text-dark-blue py-6 text-center">
              A domain must be created in order to train and <br></br>test the
              models
            </h2>
            <input
              placeholder="Enter the Domain Name here"
              className="input_primary mb-6"
            />
            <div className="w-[90%] h-[56px] bg-fill my-6"></div>
          </div>
          <div className="w-full bg-fill py-4 px-6 text-lg font-medium text-text-secondary flex justify-center">
            <CustomButton
              title="Create a Domain"
              containerStyles="bg-[#C0C0C0] rounded-[4px] py-[4px] px-4 hover-blue"
              textStyles="text-sm font-medium text-white"
              handleClick={createDomainFunction}
            />
          </div>
        </div>
      </div>
    );
  }

  if (modalState === createDomainModalStates.select_users) {
    return (
      <div className="modal-overlay">
        <div className="modal w-[1060px] rounded-[8px]">
          <Image
            src="/close.svg"
            alt="close"
            width={24}
            height={24}
            className="close hover-white"
            onClick={handleClose}
          />
          <div className="w-full bg-fill py-4 px-6 text-lg font-medium text-text-secondary">
            Domain 1
          </div>
          <div className="w-full bg-light-grey border-b border-light grey py-2 px-6 text-lg font-medium text-text-secondary">
            <h2 className="text-base font-normal text-dark-blue">Add Users</h2>
          </div>
          <div className="flex justify-center gap-4 py-6 items-stretch">
            <div className="w-[276px] rounded-lg flex items-center flex-col border border-light-grey bg-white">
              <div className="flex justify-between items-center w-full pt-4 px-4">
                <h2 className="text-base font-medium">All Users</h2>
                <Image src="/search.svg" alt="search" width={24} height={24} />
              </div>
              <div className="w-[244px] border border-light-grey mt-4 mb-2"></div>
              {[0, 1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 w-full py-3 p-4"
                  >
                    <input className="w-6 h-6" type="checkbox" />
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg"
                        alt="placeholder"
                        width={30}
                        height={30}
                        className="rounded-[30px]"
                      />
                      <h2 className="font-normal text-[13px]">User Name</h2>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-[582px] rounded-lg flex items-start justify-between flex-col border border-light-grey bg-white">
              <h2 className="text-base font-medium p-4">Selected Users</h2>
              <div className="w-full bg-light-grey py-4 px-6 text-lg font-medium text-text-secondary flex justify-center">
                <CustomButton
                  title="Next"
                  containerStyles="bg-[#444445] rounded-[4px] py-[4px] px-4 hover-blue"
                  textStyles="text-sm font-medium text-white"
                  handleClick={addUsersFunction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (modalState === createDomainModalStates.add_models) {
    return (
      <div className="modal-overlay">
        <div className="modal w-[1060px] rounded-[8px] flex justify-center flex-col items-center">
          <Image
            src="/close.svg"
            alt="close"
            width={24}
            height={24}
            className="close hover-white"
            onClick={handleClose}
          />
          <div className="w-full bg-fill py-4 px-6 text-lg font-medium text-text-secondary">
            Domain 1
          </div>
          <div className="w-full bg-light-grey border-b border-light grey py-2 px-6 text-lg font-medium text-text-secondary">
            <h2 className="text-base font-normal text-dark-blue">Add Models</h2>
          </div>
          <div className="w-[80%] my-6 rounded-lg flex items-start justify-between flex-col border border-light-grey bg-white">
            <div className="flex justify-between items-center w-full border-b border-light-grey">
              <h2 className="text-base font-medium p-4">All Models</h2>
              <div className="flex gap-4 items-center justify-center">
                {" "}
                <Image src="/search.svg" alt="search" width={24} height={24} />
                <div className="h-8 border border-light-grey"></div>
                <CustomButton
                  title="Explore Models"
                  containerStyles="bg-[#444445] rounded-[4px] py-[4px] px-[16px] hover-blue mr-2"
                  textStyles="text-sm font-medium text-white"
                  handleClick={addUsersFunction}
                />
              </div>
            </div>
            <div className="flex justify-between w-full py-2 px-4">
              <div className="flex justify-between items-center">
                <h2 className="font-medium	text-xs">Category/Vertical</h2>
                <Image
                  src="/arrow_down.svg"
                  alt="arrow_down"
                  width={24}
                  height={24}
                  className="mx-2"
                />
                <div className="h-6 border border-light-grey"></div>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-medium	text-xs">Use Case</h2>
                <Image
                  src="/arrow_down.svg"
                  alt="arrow_down"
                  width={24}
                  height={24}
                  className="mx-2"
                />
                <div className="h-6 border border-light-grey"></div>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-medium	text-xs">Compliance Standard</h2>
                <Image
                  src="/arrow_down.svg"
                  alt="arrow_down"
                  width={24}
                  height={24}
                  className="mx-2"
                />
                <div className="h-6 border border-light-grey"></div>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-medium	text-xs">Ratings</h2>
                <Image
                  src="/arrow_down.svg"
                  alt="arrow_down"
                  width={24}
                  height={24}
                  className="mx-2"
                />
                <div className="h-6 border border-light-grey"></div>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-medium	text-xs">Model Tier</h2>
                <Image
                  src="/arrow_down.svg"
                  alt="arrow_down"
                  width={24}
                  height={24}
                  className="mx-2"
                />
              </div>
            </div>
            <div className="px-4 flex flex-wrap gap-4 py-8 h-[250px] overflow-y-scroll example">
              <div className="flex justify-start items-start gap-4">
                <input type="checkbox" className="mt-2" />
                <div className="w-[228px] bg-light-grey h-28 rounded-md relative">
                  <h2 className="bg-dark-blue py-1 text-xs font-medium absolute top-2 left-2 px-4 rounded-md text-white">
                    facebook/bart-large-cnn
                  </h2>
                </div>
              </div>
            </div>
            <div className="w-full bg-light-grey flex justify-center p-2">
              <CustomButton
                title="Submit"
                containerStyles="bg-[#444445] rounded-[4px] py-[4px] px-[16px] hover-blue mr-2"
                textStyles="text-sm font-medium text-white"
                handleClick={submitFunction}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (modalState === createDomainModalStates.success) {
    return (
      <div className="modal-overlay">
        <div className="modal w-[628px] rounded-[8px] flex justify-center flex-col items-center">
          {" "}
          <h2 className="text-[22px] font-light text-center py-16">
            Domain 1 is created successfully.
          </h2>
          <div className="w-full bg-light-grey flex justify-center p-2">
            <CustomButton
              title="Close"
              containerStyles="bg-[#444445] rounded-[4px] py-[4px] px-[16px] hover-blue mr-2"
              textStyles="text-sm font-medium text-white"
              handleClick={handleClose}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDomainModal;
