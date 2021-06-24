import React from "react";

const Bars = ({data, yScale, xScale, yValue, xValue, tooltipFormat}) => {
  return data.map((d) => (
    <rect
      key={yValue(d)}
      className="mark"
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  ));
};
export default Bars;
