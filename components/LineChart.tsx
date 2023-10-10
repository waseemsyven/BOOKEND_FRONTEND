"use client";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import NoDataContainer from "./NoDataContainer";

function LineChart({ type, data }: any) {
  let colors: any = {
    "cpu/utilization": "rgba(39,145,255, 0.8)",
    "memory/bytes_used": "rgba(10,67,215, 0.8)",
  };
  let bgcolors: any = {
    "cpu/utilization": "rgba(39,145,255, 0.1)",
    "memory/bytes_used": "rgba(10,67,215, 0.1)",
  };
  return (
    <>
      {data && (
        <Plot
          data={[
            {
              ...data,
              fill: "tozeroy",
              fillcolor: bgcolors[type],
              type: "scatter",
              name:'', 
              line: {
                color: colors[type],
              },
              hovertemplate:
              "Value: %{y}<br> " +
              "Time: %{x}<br>",
              
            },
          ]}
          config={{ displayModeBar: false, responsive: true }}
          layout={{
            width: 550,
            hovermode: "closest",
            height: 300,
        hoverlabel: { bgcolor: "#FFF", bordercolor: '#406FDD', align: "auto" },
            xaxis: {
              autorange: "reversed",
              showline: true,
              showgrid: false,
              zeroline: false,
              autotick: true,
              ticks: "outside",
              constrain:'range',
              nticks:3
            },
            yaxis: {
              tickformat: type == "cpu/utilization" ? ".0%" : undefined,
              autorange: type == "memory/bytes_used" ? false : false,
              ticks: "outside",
              tick0: 0,
              nticks: 4,
              range: type == "memory/bytes_used" ? [Math.min(...data.y) - 0.10, Math.max(...data.y) + 0.10] : [Math.min(...data.y), Math.max(...data.y)] ,
              rangemode:'tozero',
            },
            margin: { t: 20 , l:60, r:20},
          }}
        />
      )}

      {!data && <NoDataContainer />}
    </>
  );
}

export default LineChart;
