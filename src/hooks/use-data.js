import { useState, useEffect } from "react";
import { csv } from "d3";

function useData(url, parser, resolveData) {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(url, parser).then((data) => {
      setData(typeof resolveData === "function" ? resolveData(data) : data);
    });
  }, [url, parser, resolveData]);
  return [data];
}
export default useData;
