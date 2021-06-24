import React from "react";
import { useDrag } from "react-dnd";

function Handle({ style, val, onSliderMove, type }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      canDrag: (monitor) => {
        // const initialSOffset = monitor.getInitialSourceClientOffset();
        // const currentSOffset = monitor.getSourceClientOffset();
        // const intitailCOffest = monitor.getInitialClientOffset();
        const currentCOffset = monitor.getClientOffset();
        console.log(currentCOffset);
        return true;
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end(props, monitor) {
        if (monitor.didDrop()) {
          const { value } = monitor.getDropResult() as {
            value: number;
            pointIndex: number;
          };
          onSliderMove(value);
        }
      },
    }),
    [val]
  );
  return (
    <div
      ref={drag}
      className="slider-handle"
      style={{ ...style, opacity }}
    ></div>
  );
}

export default Handle;
