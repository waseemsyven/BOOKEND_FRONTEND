import React, { useState } from "react";
import { ModelLogs, ModelOverview, QuestionAnswering, Summarization } from ".";
import ModelStateLoader from "./ModelStateLoader";

function ModelMetrics({ filteredModel }: any) {
  const [currentTab, setcurrentTab] = useState("overview");
  const [selectedTime, setSelectedTime] = useState<any>(60);

  return (
    <>
      <div className="flex justify-between items-center my-4 px-6">
        {filteredModel && filteredModel.model_name ? (
          <div className="flex justify-start items-center gap-6">
            <div
              className={`text-black  cursor-pointer ${
                currentTab == "overview"
                  ? "font-semibold text-lg"
                  : "font-medium text-lg"
              }`}
              onClick={() => setcurrentTab("overview")}
            >
              Overview
            </div>
            <div
              className={`text-black cursor-pointer ${
                currentTab == "history"
                  ? "font-semibold text-lg"
                  : "font-medium text-lg"
              }`}
              onClick={() => setcurrentTab("history")}
            >
              History
            </div>
          </div>
        ) : (
          <div className="h-12 w-[300px] bg-gray-200 rounded animate-pulse"></div>
        )}
        {filteredModel &&
        filteredModel.model_name &&
        currentTab === "overview" ? (
          <>
            <select
              defaultValue="10"
              onChange={(val) => setSelectedTime(val.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={10}>Last 10 Mins</option>
              <option value={30}>Last 30 Mins</option>
              <option value={60}>Last 1 Hour</option>
              <option value={90}>Last 90 Mins</option>
              <option value={120}>Last 2 Hours</option>
            </select>
          </>
        ) : currentTab === "history" ? (
          ""
        ) : (
          <div className="h-12 w-[100px] bg-gray-200 rounded animate-pulse"></div>
        )}
      </div>
      {currentTab === "overview" && (
        <>
          {filteredModel && filteredModel.model_name ? (
            <>
              {filteredModel.status != "DEPLOYED" && (
                <ModelStateLoader status={filteredModel.status} />
              )}

              {filteredModel.status == "DEPLOYED" && (
                <ModelOverview
                  filteredModel={filteredModel}
                  timeDuration={selectedTime}
                />
              )}
              {filteredModel.task === "summarization" ? (
                <Summarization filteredModel={filteredModel} />
              ) : (
                <QuestionAnswering filteredModel={filteredModel} />
              )}
            </>
          ) : (
            <div className="flex flex-col gap-4">
              {" "}
              <div className="h-80 w-full bg-gray-200 rounded animate-pulse mx-6"></div>
              <div className="h-80 w-full bg-gray-200 rounded animate-pulse mx-6"></div>
            </div>
          )}
        </>
      )}

      {currentTab === "history" && (
        <>
          {filteredModel && filteredModel.model_name ? (
            <div className="flex justify-start items-start gap-12 mx-6 bg-white rounded-sm shadow p-4">
              <ModelLogs filteredModel={filteredModel} />
            </div>
          ) : (
            <div className="h-80 w-full bg-gray-200 rounded animate-pulse mx-6"></div>
          )}
        </>
      )}
    </>
  );
}

export default ModelMetrics;
