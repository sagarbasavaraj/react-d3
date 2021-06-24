import React, { useState } from "react";
import { scaleLinear, extent, scaleOrdinal } from "d3";
import useData from "../../hooks/use-data";
import AxisBottom from "./axis-bottom";
import AxisLeft from "./axis-left";
import Marks from "./marks";
import { Dropdown } from "./dropdown";
import { ColorLegend } from "./color-legend";
import "./scalar-chart.css";

const width = 900;
const height = 500;
const margin = { top: 20, right: 190, bottom: 60, left: 200 };

const parser = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;
const initalXAttribute = "petal_length";
const initalYAttribute = "sepal_width";

const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv";

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

const colorLegendLabel = "Species";
const circleRadius = 7;

const ScalarChart = () => {
  const [data] = useData(csvUrl, parser);
  const [xAttribute, setXAttribute] = useState(initalXAttribute);
  const [yAttribute, setYAttribute] = useState(initalYAttribute);

  const xValue = (d) => d[xAttribute];
  const yValue = (d) => d[yAttribute];
  const colorValue = (d) => d.species;

  if (!data) {
    return <div>Loading....</div>;
  }
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  const onXSelectChange = (value) => {
    setXAttribute(value);
  };

  const onYSelectChange = (value) => {
    setYAttribute(value);
  };

  return (
    <>
      <div className="dropdown-container">
        <label for="x-select">X: </label>
        <Dropdown
          id="x-select"
          options={attributes}
          selectedValue={xAttribute}
          onSelectedValueChange={onXSelectChange}
        />

        <label for="y-select">Y: </label>
        <Dropdown
          id="y-select"
          options={attributes}
          selectedValue={yAttribute}
          onSelectedValueChange={onYSelectChange}
        />
      </div>

      <svg width={width} height={height} viewBox={`0, 0, ${width}, ${height}`}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffset={10}
          />
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {getLabel(xAttribute)}
          </text>
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}
          >
            {getLabel(yAttribute)}
          </text>
          <g transform={`translate(${innerWidth + 60}, 60)`}>
            <text x={35} y={-25} className="axis-label" textAnchor="middle">
              {colorLegendLabel}
            </text>
            <ColorLegend
              tickSpacing={22}
              tickTextOffset={12}
              tickSize={circleRadius}
              colorScale={colorScale}
            />
          </g>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            circleRadius={circleRadius}
            colorScale={colorScale}
            colorValue={colorValue}
          />
        </g>
      </svg>
    </>
  );
};

export default ScalarChart;
