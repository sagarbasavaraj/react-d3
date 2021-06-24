import React, { useEffect, useState } from "react";
import { csv, arc, pie } from "d3";

const width = 600;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const outerRadius = height / 2 - 30;

const pieArc = arc().innerRadius(0).outerRadius(outerRadius).cornerRadius(10);
const colorPie = pie().value(1).padAngle(0.01);

const PieChart = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <div>Loading....</div>;
  }
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data).map((d, i) => {
          return <path key={i} fill={d.data["RGB hex value"]} d={pieArc(d)} />;
        })}
      </g>
    </svg>
  );
};

export default PieChart;
