import React from "react";

const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tick) => (
    <g className="tick">
      <text
        style={{ textAnchor: "end" }}
        x={-4}
        dy=".32em"
        y={yScale(tick) + yScale.bandwidth() / 2}
      >
        {tick}
      </text>
    </g>
  ));
};

export default AxisLeft;
