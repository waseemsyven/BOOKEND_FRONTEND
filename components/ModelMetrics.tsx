import React, { useEffect, useState } from "react";
import { ModelLogs, ModelOverview, QuestionAnswering, Summarization } from ".";
import ModelStateLoader from "./ModelStateLoader";
import { useSession } from "next-auth/react";

function ModelMetrics({ filteredModel }: any) {
  const [currentTab, setcurrentTab] = useState("overview");
  const [selectedTime, setSelectedTime] = useState<any>(60);
  const { data: session } = useSession();
  const user: any = session?.user;

  const model_name = filteredModel && filteredModel.model_name;

  const [modelLogs, setmodelLogs] = useState<any>();

  const getModelLogs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/logs/model?model_name=${model_name}&start_time=2023-09-09T14:30:00Z`,
        {
          method: "GET",
          headers: {
            Authorization: `basic ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setmodelLogs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getModelLogs();
  }, [session, filteredModel]);

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
              <ModelLogs filteredModel={filteredModel} modelLogs={modelLogs} />
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
