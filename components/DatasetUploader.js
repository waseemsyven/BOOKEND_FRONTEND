"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

function DatasetUploader({ handleClose, getDataSetsList }) {
  const { data: session } = useSession();
  const user = session?.user;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setisUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadInfo, setUploadInfo] = useState({
    datasetName: "",
    datasetTask: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUploadInfo({ ...uploadInfo, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    setisUploading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/datasets/add`;
    const authToken = `Basic ${user.token}`;

    const queryParams = new URLSearchParams({
      dataset_name: uploadInfo.datasetName,
      task: uploadInfo.datasetTask,
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
        const data = await response.json();
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
        setisUploading(false);
        handleClose();
        return data;
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
        setisUploading(false);
        handleClose();
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
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
      setisUploading(false);
      handleClose();
      console.error("Error fetching data:", error);
      throw error;
    }
  };

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
        <h2 className="py-4 px-6 text-lg font-medium">Upload New Dataset</h2>
        <div className="flex justify-center items-center gap-4 h-[275px]">
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
        </div>
        <div className="flex justify-center items-center gap-4">
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
        </div>
      </div>
    </div>
  );
}

export default DatasetUploader;
