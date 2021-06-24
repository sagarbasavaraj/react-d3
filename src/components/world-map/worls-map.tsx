import React from "react";
import useData from "./use-data";
import {Marks} from './marks';

const width = 960;
const height = 500;

const WorldMap = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
};

export default WorldMap;
