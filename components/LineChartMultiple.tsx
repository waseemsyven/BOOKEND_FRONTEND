"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
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
            hovertemplate:
              "Value: %{y}<br> " +
              "Time: %{x}<br>",
            fill: "tozeroy",
            type: "scatter",
            name: "Received",
            fillcolor: "rgba(17,26,232, 0.1)",
            line: {
              color: "rgba(17,26,232, 0.8)",
            },
            
            connectgaps: true,
          },
          {
            ...data[1],
            fill: "tozeroy",
            type: "scatter",
            name: "Sent",
            fillcolor: "rgba(237,81,194, 0.1)",
            line: {
              color: "rgba(237,81,194, 0.8)",
            },
            connectgaps: true,
          },
        ]}
        config={{ displayModeBar: false, responsive: true }}
        layout={{
          hoverlabel: { bgcolor: "#FFF", bordercolor: '#406FDD', align: "auto" },
          legend: {orientation: 'h', y: 1.1, x: 0.6},
          autosize: false,
          width: 500,
          height: 300,
          xaxis: {
            autorange: "reversed",
            linewidth: 1,
            showline: false,
            showgrid: false,
            nticks:4,
            ticks: "outside",
          },
          yaxis: {
            autorange: true,
            showline: false,
            showgrid: true,
            ticks: "outside",
            nticks:4,
          },
          margin: { t: 15 , l:60, r:30},
        }}
      />
    </>
  );
}

export default LineChartMultiple;
