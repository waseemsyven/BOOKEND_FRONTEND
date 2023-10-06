"use client";
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});
import dynamic from "next/dynamic";

function BarChart({ type, data }: any) {
  let color = "#92B2FC";
  if (type == "error_count") {
    color = "#D71E28";
  }
  if (type == "prediction_count") color = "#6490F7";
  return (
    <>
      <Plot
        data={[
          {
            ...data,
            type: "bar",
            marker: { color: color },
          },
        ]}
        config={{ displayModeBar: false, responsive: true }}
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
            dtick: 1,
            showgrid: false,
            ticks: "outside",
          },
        }}
      />
    </>
  );
}

export default BarChart;
