"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { CustomButton, TaskDropdown } from ".";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function DatasetUploader({ handleClose, getDataSetsList }) {
  const { data: session } = useSession();
  const fileInputRef = useRef(null);

  const user = session?.user;
  const [currentTab, setcurrentTab] = useState("Amazon S3");
  const [selectedTask, setSelectedTask] = useState("");
  const [DatasetName, setDatasetName] = useState("");
  const [datasetUrl, setDatasetUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [uploadInProgress, setuploadInProgress] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOptionChange = (event) => {
    setcurrentTab(event.target.value);
  };

  const platformName = currentTab == "Amazon S3" ? "aws" : "aws";
  const isUploadDisable =
    !selectedTask || !DatasetName || !datasetUrl || !secret || uploadInProgress;
  const isDisabledForLocal = !selectedFile || !DatasetName || !selectedTask;

  const handleUpload = async (secret_id = null) => {
    setuploadInProgress(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/datasets/add`;
    const authToken = `Basic ${user.token}`;

    const queryParams = new URLSearchParams({
      dataset_name: DatasetName,
      task: selectedTask,
      path_location: selectedFile,
      secret_id: secret_id,
    });

    try {
      const response = await fetch(`${apiUrl}?${queryParams}`, {
        method: "POST",
        headers: {
          Authorization: authToken,
        },
        body: selectedFile,
      });

      if (response.ok) {
        getDataSetsList();
        toast.success("uploaded successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setuploadInProgress(false);
        handleClose();
      } else {
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
        setuploadInProgress(false);
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
      setuploadInProgress(false);
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const addSecretFunction = async () => {
    setuploadInProgress(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/secrets/add?secret_name=${DatasetName}&platform=${platformName}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${user.token}`,
        "Content-Type": "text/html",
      },
      body: secret,
    });
    const data = await response.text();
    const regex = /secret_id:\s+'([^']+)'/;
    const match = data.match(regex);
    let secretId;

    if (match) {
      secretId = match[1];
      console.log("Secret ID:", secretId);
    }

    if (secretId) {
      handleUpload(secretId);
    } else {
      setuploadInProgress(false);
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
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="modal-overlay">
      <div className="modal w-[924px] min-h-[539px] rounded-[8px] shadow bg-[#FFF] px-4">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <h2 className="py-4 px-6 text-lg font-medium">Upload Dataset</h2>
        <div className="flex justify-center font-light text-[13px] text-[#040A2F] border mx-4 py-2 rounded-[8px] border-[#E8E7E7]">
          <Image
            src="/info_black.svg"
            alt="close"
            width={16}
            height={16}
            className="mr-2"
          />
          The steps to uploading a dataset are select a source and then
          configure the dataset.
        </div>
        <div className="flex justify-between items-start p-6">
          <div className="flex flex-col justify-start items-start gap-10">
            <div className="w-[232px] bg-[#F7FAFB] flex justify-center items-center py-2 rounded-[8px] font-medium	text-base">
              Select Source
            </div>
            <div className="flex items-center">
              <input
                className="w-[24px] h-[24px] mx-6"
                type="radio"
                name="Amazon S3"
                value="Amazon S3"
                checked={currentTab === "Amazon S3"}
                onChange={handleOptionChange}
              />
              <Image
                src="/s3_icon.svg"
                alt="close"
                width={32}
                height={32}
                className="mr-4"
              />
              <h3 className="text-sm	font-normal">Amazon S3</h3>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                className="w-[24px] h-[24px] mx-6"
                name="GCS"
                value="GCS"
                checked={currentTab === "GCS"}
                onChange={handleOptionChange}
              />
              <Image
                src="/gcs_icon.svg"
                alt="close"
                width={32}
                height={32}
                className="mr-4"
              />
              <h3 className="text-sm	font-normal">GCS</h3>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                className="w-[24px] h-[24px] mx-6"
                name="Local Dataset"
                value="Local Dataset"
                checked={currentTab === "Local Dataset"}
                onChange={handleOptionChange}
              />
              <Image
                src="/hard_drive.svg"
                alt="close"
                width={32}
                height={32}
                className="mr-4"
              />
              <h3 className="text-sm font-normal">Local Dataset</h3>
            </div>
          </div>
          {currentTab != "Local Dataset" && (
            <div className="flex flex-col justify-start items-start">
              <div className="w-[540px] bg-[#F7FAFB] flex justify-center items-center py-2 rounded-[8px] font-medium	text-base">
                Configure Dataset
              </div>
              <div className="flex justify-between w-[540px] mt-4">
                <div className="input-secondary-container mb-6 ">
                  <h3>Dataset Name</h3>
                  <input
                    type="text"
                    className="input-secondary max-w-[288px]"
                    placeholder="Enter dataset name"
                    value={DatasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                  ></input>
                </div>
                <TaskDropdown
                  selectedTask={selectedTask}
                  setselectedTask={setSelectedTask}
                />
              </div>
              <div className="input-secondary-container mb-6">
                <h3>Dataset URL</h3>
                <input
                  type="text"
                  className="input-secondary max-w-[434px]"
                  placeholder="Enter dataset url"
                  value={datasetUrl}
                  onChange={(e) => setDatasetUrl(e.target.value)}
                ></input>
              </div>
              <div className="input-secondary-container mb-6">
                <h3>Secret</h3>
                <input
                  type="text"
                  className="input-secondary max-w-[280px]"
                  placeholder="Enter secret key of dataset"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                ></input>
              </div>
            </div>
          )}
          {currentTab == "Local Dataset" && (
            <div className="flex flex-col justify-start items-start">
              <div className="w-[540px] bg-[#F7FAFB] flex justify-center items-center py-2 rounded-[8px] font-medium	text-base">
                Configure Dataset
              </div>
              <div className="flex justify-between w-[540px] mt-4">
                <div className="input-secondary-container mb-6 ">
                  <h3>Dataset Name</h3>
                  <input
                    type="text"
                    className="input-secondary max-w-[288px]"
                    placeholder="Enter dataset name"
                    value={DatasetName}
                    onChange={(e) => setDatasetName(e.target.value)}
                  ></input>
                </div>
                <TaskDropdown
                  selectedTask={selectedTask}
                  setselectedTask={setSelectedTask}
                />
              </div>
              <div className="input-secondary-container">
                <h3>Dataset Location</h3>
                <input
                  type="file"
                  accept=".csv, .xlsx ,.json"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="input-secondary min-h-[46px]"
                >
                  {(selectedFile && selectedFile.name) || "Click to Upload"}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-center my-8">
          {currentTab == "Local Dataset" ? (
            <CustomButton
              title="Upload"
              containerStyles="bg-dark-blue mx-2 text-[14px] flex justify-center items-center h-[28px] gap-2 hover-blue p-5 rounded-lg"
              textStyles="text-[15px] font-medium text-white"
              handleClick={handleUpload}
              isDisabled={isDisabledForLocal || uploadInProgress}
            />
          ) : (
            <CustomButton
              title="Upload"
              containerStyles="bg-dark-blue mx-2 text-[14px] flex justify-center items-center h-[28px] gap-2 hover-blue p-5 rounded-lg"
              textStyles="text-[15px] font-medium text-white"
              handleClick={addSecretFunction}
              isDisabled={isUploadDisable || uploadInProgress}
            />
          )}
        </div>

        {/* <div className="flex justify-center items-center gap-4 h-[275px]">
          {" "}
          <input
            name="datasetName"
            value={uploadInfo.datasetName}
            onChange={handleInputChange}
            placeholder="Enter the Dataset Name here"
            className="input_primary"
          />{" "}
          <input
            name="datasetTask"
            value={uploadInfo.datasetTask}
            onChange={handleInputChange}
            placeholder="Enter the Dataset Task here"
            className="input_primary"
          />
        </div> */}
        {/* <div className="flex justify-center items-center gap-4">
          <div className=" bg-dark-blue mx-2 text-white font-medium text-[14px] flex justify-center items-center h-[28px] gap-2 hover-blue p-5 rounded-lg">
            <input
              type="file"
              accept=".csv, .xlsx ,.json"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button onClick={() => fileInputRef.current.click()}>
              {(selectedFile && selectedFile.name) || "Upload New"}
            </button>
            <Image
              src="/upload.svg"
              alt="upload"
              width={20}
              height={20}
              className="object-contain py-4"
            />
          </div>
          <CustomButton
            title="Confirm Upload"
            containerStyles="bg-dark-blue mx-2 text-[14px] flex justify-center items-center h-[28px] gap-2 hover-blue p-5 rounded-lg"
            textStyles="text-[15px] font-medium text-white"
            isDisabled={!selectedFile || isUploading}
            handleClick={() => handleUpload()}
          />
        </div> */}
      </div>
    </div>
  );
}

export default DatasetUploader;
