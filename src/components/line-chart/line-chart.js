import React from "react";
import { scaleLinear, scaleTime, extent, timeFormat } from "d3";
import useData from "../../hooks/use-data";
import AxisBottom from "./axis-bottom";
import AxisLeft from "./axis-left";
import Marks from "./marks";

const width = 800;
const height = 500;
const margin = { top: 20, right: 20, bottom: 60, left: 200 };

const parser = (d) => {
  d.timestamp = new Date(d.timestamp);
  d.temperature = +d.temperature;
  return d;
};
const xValue = (d) => d.timestamp;
const yValue = (d) => d.temperature;
const xAxisLabel = "Time";
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 50;
const yAxisLabel = "Temperature";
const xAxisTickFormat = timeFormat("%a");

const csvUrl =
  "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv";

const LineChart = () => {
  const [data] = useData(csvUrl, parser);

  if (!data) {
    return <div>Loading....</div>;
  }
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickOffset={10}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          circleRadius={3}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

export default LineChart;
