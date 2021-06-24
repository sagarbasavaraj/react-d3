import React from "react";

const AxisBottom = ({ xScale, innerHeight, tickOffset}) => {
  return xScale.ticks().map((tick) => (
    <g className="tick" key={tick} transform={`translate(${xScale(tick)}, 0)`}>
      <line y2={innerHeight} stroke="black" />
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + tickOffset}>
        {tick}
      </text>
    </g>
  ));
};

export default AxisBottom;
