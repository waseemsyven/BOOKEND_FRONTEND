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
  console.log(type, color);
  return (
    <>
      <Plot
        data={[
          {
            ...data,
            hovertemplate: "Value: %{y}<br> " + "Time: %{x}<br>",
            name: "",
            type: "bar",
            marker: { color: color },
          },
        ]}
        config={{ displayModeBar: false, responsive: true }}
        layout={{
          hoverlabel: { bgcolor: "#FFF", bordercolor: color, align: "auto" },
          width: 544,
          height: 300,
          xaxis: {
            autorange: "reversed",
            showline: false,
            showgrid: false,
            ticks: "outside",
            nticks: 4,
          },
          yaxis: {
            autorange: true,
            showline: false,
            dtick: Math.max(...data.y) > 1 ? undefined : 1,
            tick0: 0,
            range: [0, Math.max(...data.y) | 2],
            rangemode: "tozero",
            ticks: "outside",
            nticks: 4,
            showgrid: true,
          },
          margin: { t: 24, l: 48, r: 32 },
        }}
      />
      <style jsx>{`
        .ygrid crisp {
          stroke: #red !important;
        }
        p {
          color: blue;
        }
      `}</style>
    </>
  );
}

export default BarChart;
