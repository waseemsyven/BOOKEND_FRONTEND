"use client";

import { useEffect } from 'react';
import Plot from 'react-plotly.js';

function LineChartMultiple({ type, data }: any) {
  useEffect(() => {
    console.log(data)
  })
  return (
    <>
      <Plot
        data={[
          {
            ...data[0],
            fill: 'tozeroy',
            type: 'scatter',
            name: 'Received',
            fillcolor: 'rgba(17,26,232, 0.2)',
            line: {
              color: 'rgba(17,26,232, 0.2)'
            },
            connectgaps: true
          },
          {
            ...data[1],
            fill: 'tozeroy',
            type: 'scatter',
            name: 'Sent',
            fillcolor: 'rgba(237,81,194, 0.2)',
            line: {
              color: 'rgba(237,81,194, 0.2)'
            },
            connectgaps: true
          }
        ]}
        config={{ 'displayModeBar': false, responsive: true }}
        layout={{
          autosize: false, width: 500, height: 300, title: 'demo', xaxis: {
            autorange: 'reversed',
            linewidth: 2,
            showline: false,
            showgrid: false,
          },
          yaxis: {
            autorange: true,
            showline: false,
            showgrid: false,
            ticks: 'outside',
              tick0:0,
          }, margin: { t: 0 }
        }}
      />

    </>
  )
}

export default LineChartMultiple;