import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

function InferenceModal({ handleClose, filteredModel }: any) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [currentTab, setcurrentTab] = useState("js");
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/models/predict`;
  return (
    <div className="modal-overlay">
      <div className="modal w-[1060px] rounded-[10px] shadow p-6">
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <h2 className="text-xl font-medium text-text-secondary">
          Inference End-Point
        </h2>
        <div className="flex justify-start items-center mt-4 gap-2">
          <div
            className={`rounded-[4px] border border-[#C0C0C0] flex gap-2 p-2 cursor-pointer ${
              currentTab == "js" && "bg-dark-blue text-white"
            }`}
            onClick={() => setcurrentTab("js")}
          >
            <Image
              src="/js_icon.svg"
              alt="logo_bookend"
              width={16}
              height={16}
              className="object-contain"
            />
            <h2 className="text-xs font-medium">JavaScript</h2>
          </div>
          <div
            className={`rounded-[4px] border border-[#C0C0C0] flex p-2 gap-2 cursor-pointer  ${
              currentTab == "py" && "bg-dark-blue text-white"
            }`}
            onClick={() => setcurrentTab("py")}
          >
            <Image
              src="/python_icon.svg"
              alt="logo_bookend"
              width={16}
              height={16}
              className="object-contain"
            />
            <h2 className="text-xs font-medium">Python</h2>
          </div>
        </div>
        {currentTab == "js" ? (
          <div className="bg-fill my-6 border text-xs font-normal text-left overflow-x-scroll max-h-[440px] min-h-[340px] overflow-y-scrol px-2">
            <pre>
              <code>
                {`
 curl -X POST 
 -H "Authorization: Basic xxxxtokenxxxx" 
 -H "Content-Type: application/json" 
 -d '{"text":"YOUR_INPUT_TEXT","question":"YOUR QUESTION","context":"YOUR CONTEXT,"instruction":"YOUR INSTRUCTION"}' 
 "https://control-plane-qomhxh6ofa-uc.a.run.app/syven-pdp/models/predict?model_id=${filteredModel.model_id}&task=summarization"
              `}
              </code>
            </pre>
          </div>
        ) : (
          <div className="bg-fill my-6 border text-xs font-normal text-left pl-4 overflow-x-scroll p-4 max-h-[340px] overflow-y-scroll">
            {/* <h2 className="text-base font-medium">API Tokens</h2> */}
            <pre>
              <code>
                {`
import requests
url = "https://control-plane-qomhxh6ofa-uc.a.run.app/syven-pdp/models/predict"
headers = {
"Authorization": "Basic xxxxtokenxxxx",
"Content-Type": "application/json",
}
data = {
"text": "YOUR INPUT TEXT",
"question": "YOUR QUESTION",
"context": "YOUR CONTEXT HERE",
"instruction": "YOUR INSTRUCTION HERE",
}
params = {
"model_id": "${filteredModel.model_id}",
"task": "summarization",
}
response = requests.post(url, headers=headers, json=data, params=params)
if response.status_code == 200:
    print("Request succeeded.")
    print(response.text)
else:
    print("Request failed with status code:", response.status_code)
    print("Response content:")
    print(response.text)
        `}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default InferenceModal;
