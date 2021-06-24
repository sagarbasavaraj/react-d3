import React from "react";

const Marks = ({
  data,
  yScale,
  xScale,
  yValue,
  xValue,
  circleRadius = 10,
  colorScale,
  colorValue
}) => {
  return data.map((d, i) => (
    <circle
      key={i}
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
      fill={colorScale(colorValue(d))}
    >
    </circle>
  ));
};
export default Marks;
