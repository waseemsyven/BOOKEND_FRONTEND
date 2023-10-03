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
            className="rounded-[4px] border border-[#C0C0C0] flex py-1 px-2 gap-2 cursor-pointer"
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
            className="rounded-[4px] border border-[#C0C0C0] flex py-1 px-2 gap-2 bg-[#406FDD] cursor-pointer"
            onClick={() => setcurrentTab("py")}
          >
            <Image
              src="/python_icon.svg"
              alt="logo_bookend"
              width={16}
              height={16}
              className="object-contain"
            />
            <h2 className="text-xs font-medium text-white">Python</h2>
          </div>
        </div>
        {currentTab == "js" ? (
          <div className="bg-fill my-6 border text-xs font-normal text-left overflow-x-scroll max-h-[440px] min-h-[340px] overflow-y-scroll ">
            <pre>
              <code>
                {`
 curl -X POST 
 -H "Authorization: Basic xxxxtokenxxxx" 
 -H "Content-Type: application/json" 
 -d '{"text":"YOUR_INPUT_TEXT","question":null,"context":null,"instruction":null}' 
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
"text": "YOUR_INPUT_TEXT",
"question": None,
"context": None,
"instruction": None,
}
params = {
"model_id": "${filteredModel.model_id}",
"task": "summarization",
}
response = requests.post(url, headers=headers, json=data, params=params)
if response.status_code == 200:
print("Request succeeded.")
print("Response content:")
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
