"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import InferenceModal from "./InferenceModal";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function LlamaPredict({ model }: any) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [currentTab, setcurrentTab] = useState("summarization");
  const [text, setText] = useState("");
  const [question, setquestion] = useState("");
  const [context, setcontext] = useState("");
  const [output, setOutput] = useState("");
  const [instruction, setinstruction] = useState("");
  const [showModal, setshowModal] = useState(false);

  const handleClose = () => {
    setshowModal(false);
  };

  const changeTab = (tab: any) => {
    setText("");
    setquestion("");
    setcontext("");
    setOutput("");
    setinstruction("");
    setcurrentTab(tab);
  };

  const isComputeDisabled = !text;

  const predictFunction = async (task: any) => {
    try {
      const queryParams = new URLSearchParams({
        model_id: model.model_id,
        task: task,
      });

      const body = JSON.stringify({
        text: text,
        question: question,
        context: context,
        instruction: instruction,
      });

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/models/predict?${queryParams}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${user.token}`,
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      setOutput(data[0].data);
      toast.success("Computation Completed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    }
  };

  return (
    <div className="bg-white rounded-lg mx-6 my-4 p-4 border flex flex-col justify-start items-start">
      <h2 className="w-full border-b border-[#808080] pb-2 flex gap-2 text-[15px] font-medium">
        Test Model{" "}
        <Image
          src="/bolt.svg"
          alt="logo_bookend"
          width={17}
          height={17}
          className="object-contain "
        />
      </h2>
      <div className="flex w-full gap-6 pt-4">
        <div className="w-full my-2">
          {" "}
          <div className="flex justify-between pt-4 ml-4 pb-2 border-b border-[#E8E7E7]">
            <div className="flex gap-6">
              <h2
                className={`flex items-center gap-2 text-sm cursor-pointer  ${
                  currentTab == "summarization" && "font-semibold underline"
                }`}
                onClick={() => changeTab("summarization")}
              >
                Summarization
              </h2>{" "}
              <h2
                className={`flex items-center gap-2 text-sm cursor-pointer  ${
                  currentTab == "question-answering" &&
                  "font-semibold underline"
                }`}
                onClick={() => changeTab("question-answering")}
              >
                Question Answering
              </h2>{" "}
              <h2
                className={`flex items-center gap-2 text-sm cursor-pointer  ${
                  currentTab == "entity-recognition" &&
                  "font-semibold underline"
                }`}
                onClick={() => changeTab("entity-recognition")}
              >
                Entity Recognition
              </h2>{" "}
              <h2
                className={`flex items-center gap-2 text-sm cursor-pointer  ${
                  currentTab == "prompt-driven" && "font-semibold underline"
                }`}
                onClick={() => changeTab("prompt-driven")}
              >
                Custom prompt
              </h2>{" "}
            </div>

            <h2
              className="flex gap-2 text-[13px] font-medium cursor-pointer"
              onClick={() => setshowModal(true)}
            >
              Get End-Point{" "}
              <Image
                src="/expand_circle.svg"
                alt="logo_bookend"
                width={20}
                height={20}
                className="object-contain"
              />
            </h2>
          </div>
          {currentTab == "summarization" && (
            <div className="flex flex-col mt-6 ml-4 gap-4 pb-2 items-start">
              <textarea
                className="w-full border border-[#E8E7E7] p-2"
                value={text}
                onChange={(e: any) => setText(e.target.value)}
                placeholder="Text to summarize"
              ></textarea>
              <CustomButton
                title="Compute"
                containerStyles="bg-dark-blue rounded-[6px] gap-2 hover-blue py-2 px-4"
                textStyles="text-[16px] font-medium text-white"
                handleClick={() => predictFunction("summarization")}
                isDisabled={isComputeDisabled}
              />
              <textarea
                className="w-full bg-[#F5F9FF] h-40 border rounded-sm flex items-start p-2"
                value={output}
                placeholder="Output"
              ></textarea>
            </div>
          )}
          {currentTab == "question-answering" && (
            <div className="flex flex-col mt-6 ml-4 gap-4 pb-2 items-start">
              <textarea
                className="w-full border border-[#E8E7E7] p-2"
                value={question}
                onChange={(e: any) => setquestion(e.target.value)}
                placeholder="Enter your question here"
              ></textarea>
              <textarea
                className="w-full border border-[#E8E7E7] p-2"
                placeholder="Enter Context Here"
                value={context}
                onChange={(e: any) => setcontext(e.target.value)}
              ></textarea>
              <CustomButton
                title="Compute"
                containerStyles="bg-dark-blue rounded-[6px] gap-2 hover-blue py-2 px-4"
                textStyles="text-[16px] font-medium text-white"
                handleClick={() =>
                  predictFunction("question_answering_with_context")
                }
                isDisabled={!question || !context}
              />
              <textarea
                className="w-full bg-[#F5F9FF] h-40 border rounded-sm flex items-start p-2"
                value={output}
                placeholder="Output"
              ></textarea>
            </div>
          )}
          {currentTab == "entity-recognition" && (
            <div className="flex flex-col mt-6 ml-4 gap-4 pb-2 items-start">
              <textarea
                className="w-full border border-[#E8E7E7] p-2"
                value={text}
                onChange={(e: any) => setText(e.target.value)}
                placeholder="Enter Text here"
              ></textarea>
              <CustomButton
                title="Compute"
                containerStyles="bg-dark-blue rounded-[6px] gap-2 hover-blue py-2 px-4"
                textStyles="text-[16px] font-medium text-white"
                handleClick={() => predictFunction("named_entity_recognition")}
                isDisabled={!text}
              />
              <textarea
                className="w-full bg-[#F5F9FF] h-40 border rounded-sm flex items-start p-2"
                value={output}
                placeholder="Output"
              ></textarea>
            </div>
          )}
          {currentTab == "prompt-driven" && (
            <div className="flex flex-col mt-6 ml-4 gap-4 pb-2 items-start">
              <textarea
                className="w-full border border-[#E8E7E7] p-2"
                value={instruction}
                onChange={(e: any) => setinstruction(e.target.value)}
                placeholder="Enter Intruction here"
              ></textarea>
              <CustomButton
                title="Compute"
                containerStyles="bg-dark-blue rounded-[6px] gap-2 hover-blue py-2 px-4"
                textStyles="text-[16px] font-medium text-white"
                handleClick={() => predictFunction("custom")}
                isDisabled={!instruction}
              />
              <textarea
                className="w-full bg-[#F5F9FF] h-40 border rounded-sm flex items-start p-2"
                value={output}
                placeholder="Output"
              ></textarea>
            </div>
          )}
        </div>
      </div>
      <CustomButton
        title="Deployment History"
        containerStyles="bg-light-grey rounded-[8px] py-[8px] px-6 gap-2 ml-6 mb-4"
        textStyles="text-[15px] text-[#C0C0C0] font-medium"
        rightIcon="/history.svg"
      />
      {showModal && (
        <InferenceModal handleClose={handleClose} filteredModel={model} />
      )}{" "}
    </div>
  );
}

export default LlamaPredict;
