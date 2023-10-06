"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import LineChartMultiple from "./LineChartMultiple";
import {
  getTimeDuration,
  formatData,
  getChartTypes,
} from "./../utils/chartFunctions";

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef(() => {});
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function func() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(func, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function ModelOverview({ filteredModel, timeDuration }: any) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });
  const user: any = session?.user;
  const router = useRouter();
  const [graphData, setGraphData] = useState<any>([]);
  const [interval, setInterval] = useState(0);

  const getMetrics = async (timeDuration: number) => {
    let timeDurationForAPI = getTimeDuration(timeDuration, false);
    let request = {
      metric_filters: getChartTypes(false),
      endpoint_filters: filteredModel.endpoint_id.toString(),
    };
    let requestObject = Object.assign(request, timeDurationForAPI) as any;
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
      let graphData = formatData(data);
      setGraphData(graphData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useInterval(() => {
    getMetrics(timeDuration);
  }, 1000 * 30);

  useEffect(() => {
    getMetrics(timeDuration);
  }, [timeDuration]);

  return (
    <>
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
                  width={50}
                  height={50}
                  className="object-contain ml-2"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-2xl inline-flex items-center font-normal leading-6 text-gray-900">
                    Replica Count
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-md leading-6 text-gray-900">
                  <span className="inline-flex items-center rounded-md px-2 py-1 text-3xl font-medium text-gray-600">
                    {graphData["replicas"]}
                  </span>
                  <span>hh:mm:ss</span>
                </p>
              </div>
            </li>

            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <Image
                  src="/replica_target.svg"
                  alt="Replica Count"
                  width={50}
                  height={50}
                  className="object-contain ml-2"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-2xl font-normal leading-6 text-gray-900">
                    Target Replicas
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-md leading-6 text-gray-900">
                  <span className="inline-flex items-center rounded-md px-2 py-1 text-3xl font-medium text-gray-600">
                    {graphData["target_replicas"]}
                  </span>
                </p>
              </div>
            </li>

            {/* <li className="flex justify-between gap-x-6 py-5">
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
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ModelOverview;
