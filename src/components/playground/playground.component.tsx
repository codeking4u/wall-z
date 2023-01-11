import React, { useEffect, useRef, useContext } from "react";
import Canvas from "../canvas/canvas.component";

import { CanvasContext } from "../../context/canvas.context";

const PlayGround = () => {
  const pgRef = useRef<HTMLDivElement | null>(null);

  const { width, setWidth, height, setHeight } = useContext(CanvasContext);

  useEffect(() => {
    setWidth(pgRef.current?.offsetWidth || 700);
    setHeight(pgRef.current?.offsetHeight || 500);
  }, []);

  return (
    <div className="playground" ref={pgRef}>
      <Canvas />
    </div>
  );
};

export default PlayGround;
