"use client";

// import Plot from "react-plotly.js";
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import NoDataContainer from "./NoDataContainer";

function LineChart({ type, data }: any) {
  let colors: any = {
    "cpu/utilization": "rgba(39,145,255, 0.2)",
    "memory/bytes_used": "rgba(10,67,215, 0.2)",
  };
  return (
    <>
      {data && (
        <Plot
          data={[
            {
              ...data,
              fill: "tozeroy",
              fillcolor: colors[type],
              type: "scatter",
              line: {
                color: colors[type],
              },
            },
          ]}
          config={{ displayModeBar: false }}
          layout={{
            width: 550,
            hovermode: "closest",
            height: 300,
            xaxis: {
              autorange: "reversed",
              showline: true,
              showgrid: false,
              zeroline: false,
              autotick: true,
            },
            yaxis: {
              tickformat: type == "cpu/utilization" ? ".0%" : undefined,
              autorange: type == "memory/bytes_used" ? true : true,
              showline: false,
              showgrid: false,
              zeroline: false,
              autotick: true,
            },
            margin: { t: 0 },
          }}
        />
      )}

      {!data && <NoDataContainer />}
    </>
  );
}

export default LineChart;
