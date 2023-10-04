"use client";

// import Plot from "react-plotly.js";
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import NoDataContainer from "./NoDataContainer";

function BarChart({ type, data }: any) {
  console.log("barchart caleed");
  let color = "#92B2FC";
  if (type == "error_count") {
    color = "#D71E28";
  }
  if (type == "prediction_count") color = "#6490F7";

  return (
    <>
      {data && (
        <Plot
          data={[
            {
              ...data,
              type: "bar",
              marker: { color: color },
            },
          ]}
          config={{ displayModeBar: false }}
          layout={{
            width: 500,
            height: 300,
            xaxis: {
              autorange: "reversed",
              showline: false,
              showgrid: false,
            },
            yaxis: {
              autorange: true,
              showline: false,
              showgrid: false,
            },
          }}
        />
      )}

      {!data && <NoDataContainer />}
    </>
  );
}

export default BarChart;
