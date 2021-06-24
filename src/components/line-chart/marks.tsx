import React from "react";
import { line, curveNatural } from "d3";

const Marks = ({
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  circleRadius = 10,
  tooltipFormat,
}) => {
  return (
    <g className="marks">
      <path
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveNatural)(data)}
        fill="none"
      />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        >
          <title>{tooltipFormat(xValue(d))}</title>
        </circle>
      ))}
    </g>
  );
};
export default Marks;
