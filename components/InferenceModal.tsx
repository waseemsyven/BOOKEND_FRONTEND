import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import { createDomainProps } from "@/types";

function InferenceModal({ handleClose }: createDomainProps) {
  const [currentTab, setcurrentTab] = useState("js");
  return (
    <div className="modal-overlay">
      <div className="modal w-[1060px] h-[608px] rounded-[10px] shadow p-6">
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
          <div className="bg-fill my-6 border text-xs font-normal text-left pl-4 overflow-x-scroll p-4 max-h-[440px] overflow-y-scroll">
            <h2 className="text-base font-medium">API Tokens</h2>
            <pre>
              <code>
                {`
  async function query(data) {
    const response = await fetch(
      "https://control-plane-gateway-44gp1iu3.uc.gateway.dev/syven-pdp/models/predict",
      {
        headers: { Authorization: "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
        method: "POST",
        body: { 
          model_id
          task,
          text,
          question: "None",
          context: "None",
          instruction: "None",
        }
      }
    );
    const result = await response.json();
    return result;
  }
  
  query({"inputs": "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct."}).then((response) => {
      console.log(JSON.stringify(response));
  });
        `}
              </code>
            </pre>
          </div>
        ) : (
          <div className="bg-fill my-6 border text-xs font-normal text-left pl-4 overflow-x-scroll p-4 max-h-[440px] overflow-y-scroll">
            <h2 className="text-base font-medium">API Tokens</h2>
            <pre>
              <code>
                {`
  import requests

  API_URL = "https://control-plane-qomhxh6ofa-uc.a.run.app/syven-pdp/models/predict"
  headers = {"Authorization": "Basic xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
  
  def predict(model_id, task, text=None, question=None, context=None, instruction=None,
  url=API_URL, domain=DOMAIN, path="/models/predict"):
  try:
  __predict_input_validation(task, text, question, context, instruction)
  except Exception as e:
  return str(e)

  headers = AUTH_HEADER
  params = {
  "model_id": model_id,
  "task": task.lower(),
  "text": text,
  "question": question,
  "context": context,
  "instruction": instruction
  }
  r = requests.request('GET', url+domain+path, headers=headers, params=params)
  return r.text
  output = query({
  "inputs": "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.",
   })
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
