"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import LineChartMultiple from "./LineChartMultiple";
// const LineChart = dynamic(import("./LineChart"), {
//   ssr: false,
// });
// const BarChart = dynamic(import("./BarChart"), {
//   ssr: false,
// });
// const LineChartMultiple = dynamic(import("./LineChartMultiple"), {
//   ssr: false,
// });

interface Graph {
  [key: string]: any;
}

function ModelOverview({ filteredModel, timeDuration }: any) {
  const { data: session, status } = useSession();
  const user: any = session?.user;

  const [graphData, setGraphData] = useState<any>([]);

  const groupBy = (array: any, key: any) => {
    // Return the end result
    return array.reduce((result: any, currentValue: any) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const getTimeDuration = () => {
    var d = new Date();
    let start = d.setMinutes(d.getMinutes() - timeDuration);
    return {
      epoch_start: Math.round(start / 1000) + "",
      epoch_end: Math.round(Date.now() / 1000) + "",
    };
  };

  const getTime = (start_time: any) => {
    let date = new Date(start_time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formatTime = hours + ":" + minutes.substr(-2);
    return formatTime;
  };

  const formatData = (data: any) => {
    let finalGraphObj = {} as Graph;
    Object.keys(data).forEach((key) => {
      let newKey = key.replace(
        "aiplatform.googleapis.com/prediction/online/",
        ""
      );
      if (["replicas", "target_replicas"].indexOf(newKey) != -1) {
        finalGraphObj[newKey] = data[key]
          .map((r: any) => {
            return r.value;
          })
          .pop();
      } else if (["cpu/utilization"].indexOf(newKey) != -1) {
        finalGraphObj[newKey] = {
          y: data[key].map((r: any) => {
            return r.value * 100;
          }),
          x: data[key].map((r: any) => {
            return getTime(r.start_time);
          }),
        };
      } else
        finalGraphObj[newKey] = {
          y: data[key].map((r: any) => {
            return r.value;
          }),
          x: data[key].map((r: any) => {
            return getTime(r.start_time);
          }),
        };
    });
    return finalGraphObj;
  };

  const getMetrics = async () => {
    let timeDuration = getTimeDuration();
    let request = {
      metric_filters:
        "aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle,aiplatform.googleapis.com/prediction/online/accelerator/memory/bytes_used,aiplatform.googleapis.com/prediction/online/cpu/utilization,aiplatform.googleapis.com/prediction/online/error_count,aiplatform.googleapis.com/prediction/online/memory/bytes_used,aiplatform.googleapis.com/prediction/online/network/received_bytes_count,aiplatform.googleapis.com/prediction/online/network/sent_bytes_count,aiplatform.googleapis.com/prediction/online/prediction_count,aiplatform.googleapis.com/prediction/online/private/response_count,aiplatform.googleapis.com/prediction/online/replicas,aiplatform.googleapis.com/prediction/online/response_count,aiplatform.googleapis.com/prediction/online/target_replicas",
      endpoint_filters: filteredModel.endpoint_id,
    };
    let requestObject = Object.assign(request, timeDuration);
    try {
      const queryParams = new URLSearchParams(requestObject);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/metrics/get-metrics?${queryParams}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let grouped = groupBy(data, "metric");
      let graphData = formatData(grouped);
      setGraphData(graphData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMetrics();
  }, []);

  return (
    <div className="grid grid-cols-3 mx-6 my-4 gap-4">
      {Object.keys(graphData).length == 0 &&
        Array.from(Array(8).keys()).map((key) => {
          return (
            <div
              role="status"
              key={key}
              className="bg-white p-4 border border-gray-200 rounded shadow animate-pulse md:p-6"
            >
              <Image
                src="/loader.gif"
                alt="Replica Count"
                width={200}
                height={200}
                className="object-contain ml-2 mx-auto"
                style={{ margin: "auto" }}
              />
            </div>
          );
        })}

      {Object.keys(graphData).length > 0 &&
        [
          { name: "prediction_count", label: "Prediction Count" },
          { name: "response_count", label: "Response Count" },
          { name: "error_count", label: "Error Count" },
        ].map((graph, key) => {
          return (
            <div
              key={key}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {graph.label}
              </h5>
              <BarChart type={name} data={graphData[graph.name]} />
            </div>
          );
        })}

      {Object.keys(graphData).length > 0 &&
        [
          { name: "accelerator/duty_cycle", label: "Accelerator Duty Cycle" },
          {
            name: "accelerator/memory/bytes_used",
            label: "Accelerator Memory Usage",
          },
          { name: "cpu/utilization", label: "CPU Utilization" },
          { name: "memory/bytes_used", label: "Memory Utilization" },
        ].map((graph, key) => {
          return (
            <div
              key={key}
              className="p-6 pb-0 bg-white border border-gray-200 rounded-lg shadow "
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {graph.label}
              </h5>
              <LineChart type={graph.name} data={graphData[graph.name]} />
            </div>
          );
        })}

      {Object.keys(graphData).length > 0 && (
        <div className="p-6 pb-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Network Stats
          </h5>
          <LineChartMultiple
            type={"cpu"}
            data={[
              graphData["network/received_bytes_count"],
              graphData["network/sent_bytes_count"],
            ]}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow flex justify-between items-center p-5 relative">
        <ul role="list" className="w-full divide-y divide-gray-100">
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image
                src="/replica_count.svg"
                alt="Replica Count"
                width={17}
                height={17}
                className="object-contain ml-2 lg:w-6 lg:h-6"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-md font-semibold leading-6 text-gray-900">
                  Replica Count
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-md leading-6 text-gray-900">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {graphData["replicas"]}
                </span>
              </p>
            </div>
          </li>

          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image
                src="/replica_target.svg"
                alt="Replica Count"
                width={17}
                height={17}
                className="object-contain ml-2 lg:w-6 lg:h-6"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-md font-semibold leading-6 text-gray-900">
                  Target Replicas
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-md leading-6 text-gray-900">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {graphData["target_replicas"]}
                </span>
              </p>
            </div>
          </li>

          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image
                src="/replica_target.svg"
                alt="Replica Count"
                width={17}
                height={17}
                className="object-contain ml-2 lg:w-6 lg:h-6"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-md font-semibold leading-6 text-gray-900">
                  Private Response Count
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-md leading-6 text-gray-900">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  NA
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModelOverview;
