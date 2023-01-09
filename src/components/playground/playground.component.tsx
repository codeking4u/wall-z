import React, { useEffect, useRef, useState } from "react";
import Canvas from "../canvas/canvas.component";

const PlayGround = () => {
  const pgRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    setWidth(pgRef.current?.offsetWidth || 1000);
    setHeight(pgRef.current?.offsetHeight || 800);
  }, []);

  return (
    <div className="playground" ref={pgRef}>
      <Canvas width={width} height={height} />
    </div>
  );
};

export default PlayGround;
