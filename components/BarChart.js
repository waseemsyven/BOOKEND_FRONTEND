import React from "react";

const BarChart = ({ data }) => {
  if (!data) return null;
  return (
    <div className="chart mt-8">
      {data &&
        data.map((item, index) => (
          <div className="flex flex-col">
            {" "}
            <div
              key={index}
              className="bar"
              style={{ height: `${item.score * 200}px` }}
            ></div>
            <div>output:{item.token_str}</div>
            <div>Score : {item.score.toFixed(5)} </div>
          </div>
        ))}
    </div>
  );
};

export default BarChart;
