import React from "react";
import { useDrop } from "react-dnd";

function SlidetDot({ item, accept, onClick, width }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop(props, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      return { value: item };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });
  const isActive = isOver && canDrop;
  console.log(isActive);
  return (
    <span
      key={item}
      className="step"
      onClick={() => onClick(item)}
      data-curval={item}
      style={{
        width: `${width}px`,
      }}
      ref={drop}
    >
      <span
        className="dot"
        style={
          isActive
            ? {
                backgroundColor: "green",
                width: "50px",
                height: "50px",
                opacity: 0.5,
              }
            : {}
        }
      ></span>
    </span>
  );
}

export default SlidetDot;
