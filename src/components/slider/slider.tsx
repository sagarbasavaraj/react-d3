import React, { useState, useRef, useEffect } from "react";
import SlidetDot from "./slider-dot";
import Handle from "./handle";
import "./slider.css";

type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  type: string;
};

const getSteps = (
  points: number[],
  onClick: (value: number) => void,
  pwidth,
  type
) => {
  const steps: JSX.Element[] = [];
  //const left =  `${(Math.abs(i - min) / range) * 100}%`;
  const spanWidth = pwidth / points.length;
  //const range = max - min;

  points.map((step) => {
    return steps.push(
      <SlidetDot
        key={step}
        item={step}
        onClick={onClick}
        accept={type}
        width={spanWidth}
      />
    );
  });

  return steps;
};

type HandelProps = {
  left: string;
};

const Slider = ({
  min,
  max,
  step,
  value,
  onChange,
  type,
}: SliderProps): JSX.Element => {
  const [handleStyle, setHandleStyle] = useState<HandelProps>(
    {} as HandelProps
  );
  const [points, setPoints] = useState<number[]>([]);
  const [pwidth, setPwidth] = useState(0);
  const pr = useRef(null);

  const onClick: (value: number) => void = (item) => {
    onChange(item);
  };

  useEffect(() => {
    const points: number[] = [];
    for (let i: number = min; i <= max; i += step) {
      points.push(i);
    }
    setPoints(points);
  }, [max, min, step]);

  useEffect(() => {
    const pwidth = pr.current && pr.current.clientWidth;
    setPwidth(pwidth);
  }, []);

  useEffect(() => {
    if (typeof value === "number" && pwidth && value >= min && value <= max) {
      const pointIndex = points.indexOf(value) + 1;
      const spanWidth = pwidth / points.length;
      const widthOffset = spanWidth / 2;
      const x = spanWidth * pointIndex - widthOffset - 8;
      setHandleStyle({ left: `${x}px` });
    }
  }, [pwidth, value, max, min, points]);

  return (
    <div className="slider-example">
      <div className="slider" ref={pr}>
        <div className="slider-rail"></div>
        <div className="slider-steps">
          {getSteps(points, onClick, pwidth, type)}
        </div>
        <Handle
          style={handleStyle}
          val={value}
          onSliderMove={onChange}
          type={type}
        />
      </div>
    </div>
  );
};

export default Slider;
