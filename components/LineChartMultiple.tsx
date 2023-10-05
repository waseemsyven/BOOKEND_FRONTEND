"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
// import Plot from "react-plotly.js";
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

function LineChartMultiple({ type, data }: any) {
  return (
    <>
      <Plot
        data={[
          {
            ...data[0],
            fill: "tozeroy",
            type: "scatter",
            name: "Received",
            fillcolor: "rgba(17,26,232, 0.2)",
            line: {
              color: "rgba(17,26,232, 0.2)",
            },
            connectgaps: true,
          },
          {
            ...data[1],
            fill: "tozeroy",
            type: "scatter",
            name: "Sent",
            fillcolor: "rgba(237,81,194, 0.2)",
            line: {
              color: "rgba(237,81,194, 0.2)",
            },
            connectgaps: true,
          },
        ]}
        config={{ displayModeBar: false }}
        layout={{
          autosize: false,
          width: 500,
          height: 300,
          title: "demo",
          xaxis: {
            autorange: "reversed",
            linewidth: 2,
            showline: false,
            showgrid: false,
          },
          yaxis: {
            autorange: true,
            showline: false,
            showgrid: false,
          },
          margin: { t: 0 },
        }}
      />
    </>
  );
}

export default LineChartMultiple;
