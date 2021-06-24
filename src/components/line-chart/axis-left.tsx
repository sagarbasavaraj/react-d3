import React from "react";

const AxisLeft = ({ yScale, innerWidth, tickOffset = 10 }) => {
  return yScale.ticks().map((tick) => (
    <g className="tick" key={tick} transform={`translate(0, ${yScale(tick)})`}>
      <line x2={innerWidth} />
      <text style={{ textAnchor: "end" }} x={-tickOffset} dy=".32em">
        {tick}
      </text>
    </g>
  ));
};

export default AxisLeft;
