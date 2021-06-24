import React from "react";
import "./App.css";
import { arc } from "d3";

const width = 600;
const height = 300;
const strokeWidth = 20;
const centerX = width / 2;
const centerY = height / 2;
const centerXOffset = 50;
const centerYOffset = 50;

const mouthArc = arc();
const mouthWidth = 10;
const mouthRadius = 70;

function Face() {
  const arc = mouthArc({
    innerRadius: mouthRadius,
    outerRadius: mouthRadius + mouthWidth,
    startAngle: (Math.PI * 5) / 2,
    endAngle: (Math.PI * 3) / 2,
  });
  return (
    <div className="App">
      <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          <circle
            r={centerY - strokeWidth / 2}
            fill="yellow"
            stroke="black"
            strokeWidth={strokeWidth}
          />
          <circle cx={-centerXOffset} cy={-centerYOffset} r={20} fill="black" />
          <circle cx={centerXOffset} cy={-centerYOffset} r={20} fill="black" />
          <g transform={`translate(0, ${centerYOffset + 30})`}>
            <path d={arc} />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default Face;
