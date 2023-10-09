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
  if (type == "prediction_count") color = "rgba(100, 144, 247,1)";
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
          hoverlabel: { bgcolor: "#FFF", bordercolor: '#406FDD', align: "auto" },
          width: 500,
          height: 300,
          xaxis: {
            autorange: "reversed",
            showline: false,
            showgrid: false,
            nticks:4
          },
          yaxis: {
            autorange: false,
            showline: false,
            dtick: 1,
            tick0: 0,
            range:[0, Math.max(...data.y) | 2],
            rangemode:'tozero',
            ticks: "outside",
            nticks:4,
            showgrid: true,
          },
          margin: { t: 20 , l:20, r:10},
        }}
      />
    </>
  );
}

export default BarChart;
