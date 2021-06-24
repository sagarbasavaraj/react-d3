import React from "react";
import { scaleBand, scaleLinear, format, max } from "d3";
import useData from "../../hooks/use-data";
import AxisBottom from "./axis-bottom";
import AxisLeft from "./axis-left";
import Bars from "./bars";

const width = 800;
const height = 500;
const margin = { top: 20, right: 20, bottom: 60, left: 200 };

const parser = (d) => {
  d.Population = +d["2020"] * 1000;
  return d;
};
const xValue = (d) => d.Population;
const yValue = (d) => d.Country;
const siFormat = format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
const resolveData = (data) => data.slice(0, 10);
const xAxisLabelOffset = 50;

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const BarChart = () => {
  const [data] = useData(csvUrl, parser, resolveData);

  if (!data) {
    return <div>Loading....</div>;
  }
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const maxValue = max(data, (d: any) => d.Population);

  const xScale = scaleLinear()
    .domain([0, +maxValue])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          Population
        </text>
        <Bars
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

export default BarChart;
